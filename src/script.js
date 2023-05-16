const BASE_URL = 'http://localhost:3000';
const productsList = document.querySelector('.productsList')
const productsContainer = document.querySelector('.products')
const productcontainer = document.querySelector('.productContainer')
const basketProductsContainer = document.querySelector('.basketProductsList')
const basketProductItem = document.querySelector('.basketProductContainer')
const productIDK = document.querySelector('.productIDK')
const basketProductIDK = document.querySelector('.basketProductIDK')
const basketSup = document.querySelector('.sup1')
const basketLink = document.querySelector('.basketLink');

productIDK.style.display = 'none'
basketProductIDK.style.display = 'none'

const basketItems = JSON.parse(localStorage.getItem('basketIDs')) || [];

basketSup.textContent = basketItems.length


async function getAllProducts(){

    const res = await fetch(`${BASE_URL}/products`)
    const products = await res.json()

    for(let i = 0; i < products.length; i++){
        const productItem = document.createElement('li');
        productItem.classList.add('productItem');

        const productImg = document.createElement('img')
        productImg.classList.add('productImg');
        productImg.src = products[i].image;

        const productTitle = document.createElement('h3')
        productTitle.classList.add('productTitle')
        productTitle.textContent = products[i].name

        productItem.append(productImg, productTitle);
        productsList.append(productItem)

        productItem.addEventListener('click', e => {
            e.preventDefault()

            productsContainer.style.display = 'none';
            productIDK.style.display = 'flex'

            const img = document.querySelector('.img')
            img.src = products[i].image

            const productName = document.querySelector('.productName')
            productName.textContent = products[i].name;

            const productDescr = document.querySelector('.productDescr')
            productDescr.textContent = products[i].description;

            const productPrice = document.querySelector('.productPrice')
            productPrice.textContent = products[i].price + ' $';

            const basketImg = document.querySelector('.shoppingCartLink')            

            basketImg.addEventListener('click', e => {
                e.preventDefault();

                basketItems.push(products[i].id)
                localStorage.setItem('basketIDs', JSON.stringify(basketItems))

                basketSup.textContent = basketItems.length
            }) 
        })

    }

}


basketLink.addEventListener('click', async e => {
    e.preventDefault();

    productsContainer.style.display = 'none'
    productcontainer.style.display = 'none'

    for(let i = 0; i < basketItems.length; i++){
        try {

            const res = await fetch(`${BASE_URL}/products?id=${basketItems[i]}`)
            const basketProduct = await res.json();

            const productItem = document.createElement('li');
            productItem.classList.add('basketProductItem');

            const productImg = document.createElement('img')
            productImg.classList.add('basketProductImg');
            productImg.src = basketProduct[0].image;

            const productTitle = document.createElement('h3')
            productTitle.classList.add('basketProductTitle')
            productTitle.textContent = basketProduct[0].name

            productItem.append(productImg, productTitle);
            
            const basketProductsList = document.querySelector('.basketProductsList')

            basketProductsList.append(productItem)

            productItem.addEventListener('click', e => {
                e.preventDefault()
    
                productsContainer.style.display = 'none';
                basketProductsContainer.style.display = 'none';
                basketProductIDK.style.display = 'flex'
    
                const img = document.querySelector('.basketImg')
                img.src = basketProduct[0].image
    
                const productName = document.querySelector('.basketProductName')
                productName.textContent = basketProduct[0].name;
    
                const productDescr = document.querySelector('.basketProductDescr')
                productDescr.textContent = basketProduct[0].description;
    
                const productPrice = document.querySelector('.basketProductPrice')
                productPrice.textContent = basketProduct[0].price + ' $';
    
                const trashBin = document.querySelector('.trashBin')            
    
                trashBin.addEventListener('click', e => {
                    e.preventDefault();
    
                    basketItems.splice(i, 1)
                    localStorage.setItem('basketIDs', JSON.stringify(basketItems))
    
                    basketSup.textContent = basketItems.length
                }) 
            })

        } catch (error) {
            console.log(error);
        }
    }
})


window.addEventListener('load', e => {
    getAllProducts();
})