import { getData, sendData, deleteData } from '../api.js'

export const addProduct = () => {

    const productTitle = document.querySelector('#product-title');
    const productName = document.querySelector('#product-name');
    const productPrice = document.querySelector('#product-price');
    const productImage = document.querySelector('#product-image');
    const productCategory = document.querySelector('#product-category')
    const goodsTable = document.querySelector('#goods-table')
    const btn = document.querySelector('#product-add');

    const productData =  {
        category: '',
        categoryName: '',
        preview: '',
        name: '',
        price: 0
    }


    const checkValue = () => {
        if (
            productTitle.value === '' || 
            productName.value === '' ||
            +productPrice.value === 0 ||
            productImage.value === '' ||
            productCategory.value === 'default' 
            ) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
    }

    productCategory.addEventListener('change', () => {
        productData.category = productCategory.value;
        // ! отображались товары только выбранной категории
        const url = productCategory.value !== 'default' ? `/products?category=${productCategory.value}` : `/products`

        getData(url)
        .then((data)=>{render(data)})

        checkValue()
    })

    productTitle.addEventListener('input', ()=>{
        productData.categoryName = productTitle.value;
        checkValue();
    })

    productName.addEventListener('input', ()=>{
        productData.name = productName.value;
        checkValue();
    })

    productPrice.addEventListener('input', ()=>{
        productData.price = +productPrice.value;
        checkValue();
    })

    productImage.addEventListener('input', ()=>{

        const file = productImage.files[0]

        if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg') {
            const reader = new FileReader()
            reader.onload = ()=> {
                productData.preview = reader.result;
            }
            reader.onerror = ()=> {
                productData.preview = '';
                productImage.value = '';
            }
            reader.readAsDataURL(file)
        } else {
            productImage.value = '';
        }

        console.log(file);
        // ! вернет путь файла на компьютере
        // console.log(productImage.value);
        // ! вернет массив объектов олицетворящих собой файл
        // console.log(productImage.files);
        checkValue();
    })

    const render = (data) => {

        goodsTable.textContent = ''
        data.forEach((good, index) => {
            const {id,categoryName,name,price} = good

            goodsTable.insertAdjacentHTML('beforeend', `
                <tr>
                    <th scope="row">${index+1}</th>
                    <td>${categoryName}</td>
                    <td>${name}</td>
                    <td>${price} ₽</td>
                    <td class="text-end">
                        <button type="button" class="btn btn-outline-danger btn-sm" data-product=${id}>
                            удалить
                        </button>
                    </td>
                </tr>
            `)
        })

    }

    const updateTable = () => {
        getData('/products').then((products)=> {render(products)})
    }

    btn.addEventListener('click', ()=> {
        sendData('/products', productData)
        .then((data)=> {
            console.log(data);
            updateTable();
        })
    })

    goodsTable.addEventListener('click', (e)=> {
    
        const target = e.target;

        if (target.classList.contains('btn')) {
            const id = target.dataset.product

            deleteData(`/products/${id}`)
            .then((data)=> {
                console.log(data);
                updateTable();
            })
        }
    })

    updateTable();
    checkValue()
}