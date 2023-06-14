import { openModal, closeModal } from "./modal.js";
import { getData, putData, patchData } from './api.js'


export const cartFunc = () => {
    const cartModal = document.querySelector('#cart-modal'); 
    const cartCloseBtn = cartModal.querySelectorAll('.close-btn'); 
    const openCartBtn = document.querySelector('#open-cart-btn'); 
    const cartContainer = document.querySelector('#cart-container');
    const cartTotlalPrice = document.querySelector('#cart-totlal-price');
    
    
    const updateCart = () => {
        const user_id = JSON.parse(localStorage.getItem('auth')).id
        getData(`/cart?user_id=${user_id}`)
            .then((data) => {
                console.log(data)
                render(data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    openCartBtn.addEventListener('click', () => {
        updateCart()
        openModal(cartModal)
    })

    cartModal.addEventListener('click', (e) => {
        const target = e.target;
        if (target === cartModal || target === cartCloseBtn[0] || target === cartCloseBtn[1]) {
            closeModal(cartModal);
        }
    })

    const render = (data) => {

        let total_price = 0
        for (let item of data) {
            total_price += item.price * item.count
        }

        cartContainer.textContent = ''
        data.forEach((item) => {
            const { id, good_id, name, count, price } = item;

            const goodRow = document.createElement('div')
            goodRow.className = 'row border-bottom pb-3 pt-3 good-item'
            goodRow.goodinfo = item

            const content = `
                <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">
                    ${name}
                </div>
                <div
                    class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
                    <h4 class="me-3 d-flex align-itemns-center">${price*count} ₽</h4>
                    <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                        id="control-dec">
                        -
                    </button>
                    <h6 class="cart-item-count me-3 ms-3">${count}</h6>
                    <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                        id="control-inc">
                        +
                    </button>
                </div>
            `
            goodRow.insertAdjacentHTML('beforeend', content)
            cartContainer.insertAdjacentElement('beforeend', goodRow)
        })

        cartTotlalPrice.textContent = `${total_price} ₽`
    }

    cartContainer.addEventListener('click', (e)=> {
        const target = e.target;

        if ( target.closest('#control-inc')) {
            const good = e.target.closest('.good-item')

            const id = good.goodinfo.id
            const good_id = good.goodinfo.good_id
            const name = good.goodinfo.name
            const count = good.goodinfo.count
            const price = good.goodinfo.price

            // console.log(item)
            // ! обновить весь объект
            // const item = {
            //     id, good_id, name, count: count+1, price
            // }
            // putData(`/cart/${id}`, item)
            //     .then(()=>updateCart)
            // ! обновить свойство в записи по его id
            const item = {count: count + 1}

            patchData(`/cart/${id}`, item)
                .then(()=>updateCart)
            
        } else if (target.closest('#control-dec')) {
            const good = e.target.closest('.good-item')

            const id = good.goodinfo.id
            const good_id = good.goodinfo.good_id
            const name = good.goodinfo.name
            const count = good.goodinfo.count
            const price = good.goodinfo.price

            if (count > 0) {
                const item = {
                    id, good_id, name, count: count-1, price
                }
    
                putData(`/cart/${id}`, item)
                    .then(()=>updateCart)
            }
            
        }
    })

    
}