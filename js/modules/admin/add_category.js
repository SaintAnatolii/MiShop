import { getData, sendData, deleteData } from "../api.js";

export const addCategoty = () => {
    const categoryName = document.querySelector('#category-name');
    const categoryImage = document.querySelector('#category-image');
    const categoryAddBtn = document.querySelector('#category-add-btn');
    const categoryContainer = document.querySelector('#category-container')
    const productCategory = document.querySelector('#product-category')

    const categoryData = {
        name: '',
        preview: ''
    }


    const checkValue = () => {
        if (categoryName.value === '' || categoryImage.value === '') {
            categoryAddBtn.disabled = true;
        } else {
            categoryAddBtn.disabled = false;
        }
    }

    categoryName.addEventListener('input', ()=>{
        categoryData.name = categoryName.value;
        checkValue();
    })
    categoryImage.addEventListener('input', ()=>{

        const file = categoryImage.files[0]

        if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg') {
            const reader = new FileReader()
            reader.onload = ()=> {
                categoryData.preview = reader.result;
            }
            reader.onerror = ()=> {
                categoryData.preview = '';
                categoryImage.value = '';
            }
            reader.readAsDataURL(file)
        } else {
            categoryImage.value = '';
        }

        console.log(file);
        // ! вернет путь файла на компьютере
        // console.log(categoryImage.value);
        // ! вернет массив объектов олицетворящих собой файл
        // console.log(categoryImage.files);
        checkValue();
    })

    const render = (data) => {

        categoryContainer.textContent = ''
        productCategory.innerHTML = '<option value="default" selected>Выберите категорию</option>'
        data.forEach((category, index) => {
            const { id, name, preview } = category
            categoryContainer.insertAdjacentHTML('beforeend', `
                <tr>
                    <th scope="row">${index+1}</th>
                    <td>${name}</td>
                    <td class="text-end">
                        <button type="button" class="btn btn-outline-danger btn-sm" data-category="${id}">
                            удалить
                        </button>
                    </td>
                </tr>
            `)

            productCategory.insertAdjacentHTML('beforeend', `
                <option value="${id}">${name}</option>
            `)
        })

        

    }

    const updateTable = () => {
        getData('/categories').then((categories)=> {render(categories)})
    }

    categoryAddBtn.addEventListener("click", ()=> {
        sendData('/categories', categoryData)
        .then((data)=> {
            console.log(data);
            updateTable();
        })
    })

    categoryContainer.addEventListener('click', ()=>{

        if (target.classList.contains('btn')) {
            const id = target.dataset.category

            deleteData(`/categories/${id}`)
            .then((data)=> {
                console.log(data);
                updateTable();
            })
        }
    })

    updateTable();
    checkValue();
}