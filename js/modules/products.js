import { getData, sendData } from './api.js'

export const productsFunc = () => {
    console.log('products done');

    const productsContainer = document.querySelector('#products-container');
    const productSearch = document.querySelector('.product-search');

    const render = (data) => {
        productsContainer.innerHTML = ''
        data.forEach((product) => {
            const { id, category, categoryName, preview, name, price } = product;
            const cardGood = document.createElement('div');
            cardGood.className = 'col col-12 col-sm-6 col-lg-4 col-xl-3 mb-3 card-good'
            cardGood.goodinfo = { id, category, categoryName, preview, name, price }

            const content = `
                <a href="#" class="card-link">
                    <div class="card">
                        <img src="${preview}" class="card-img-top" alt="phone-1">
                        <div class="card-body">
                            <span class="mb-2 d-block text-secondary">${categoryName}</span>
                            <h6 class="card-title mb-3">${name}</h6>

                            <div class="row">
                                <div class="col d-flex align-itemns-center justify-content-between">
                                    <h4>${price} ₽</h4>
                                    <button type="button" class="btn btn-outline-dark add-to-cart" data-goodid=${id}>
                                        <img src="/images/icon/shopping-cart-big.svg" alt="login">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `
            cardGood.insertAdjacentHTML('beforeend', content)
            productsContainer.insertAdjacentElement('beforeend', cardGood);
        })
    }

    const init = () => {
        const cat_id = new URLSearchParams(window.location.search).get('categoryId');
        const url = cat_id ? `/products?category=${cat_id}` : '/products'

        getData(url)
        .then((data) => {
            render(data);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    init();

    productsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const btn = target.closest('.add-to-cart')
        if (btn) {
            const card = btn.closest('.card-good')
            const cardInfo = card.goodinfo
            const user = JSON.parse(localStorage.getItem('auth'))
            console.log(user)
            const cartItem = {
                "user_id": user.id,
                "good_id": cardInfo.id,
                "count": 1,
                "name": cardInfo.name,
                "price": cardInfo.price
            }

            console.log(cartItem)
            sendData('/cart', cartItem)
        }
        
    })


    productSearch.addEventListener('input', () => {

        function ucFirst(str) {
            if (!str) return str;
            
            return str[0].toUpperCase() + str.slice(1);
        }

        const searchValue = productSearch.value
        let newStr = ucFirst(searchValue)
        // ! Чтобы выполнять поиск в json-server 
        // ! GET запросом нужно отправить server_url/url?q=параметр
        getData(`/products?q=${newStr}`)
        .then((data) => {
            if (data.length == 0) {
                console.log('Пусто')
            } else {
                render(data)
            }
        })
    })
}