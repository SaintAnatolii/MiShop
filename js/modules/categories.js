import { getData } from "./api.js";

export const categoriesFunction = () => {
    console.log('category done');

    const categoriesContainer = document.querySelector('#categories-container');
    const catalogSearch = document.querySelector('.catalog-search');

    const render = (data) => {
        categoriesContainer.innerHTML = ''
        data.forEach((item) => {
            const { id, name, preview } = item;

            categoriesContainer.insertAdjacentHTML('beforeend', `
                <div class="col col-12 col-md-6 col-lg-4 mb-3">
                    <a href="/catalog.html?categoryId=${id}" class="card-link">
                        <div class="card">
                            <img src="${preview}" class="card-img-top" alt="phones">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                            </div>
                        </div>
                    </a>
                </div>
            `)
        })
    }


    catalogSearch.addEventListener('input', () => {

        function ucFirst(str) {
            if (!str) return str;
            
            return str[0].toUpperCase() + str.slice(1);
        }

        const searchValue = catalogSearch.value
        let newStr = ucFirst(searchValue)
        // ! Чтобы выполнять поиск в json-server 
        // ! GET запросом нужно отправить server_url/url?q=параметр
        getData(`/categories?q=${newStr}`)
        .then((data) => {
            if (data.length == 0) {
                console.log('Пусто')
            } else {
                render(data)
            }
        })
    })

    getData('/categories')
    .then((data) => {
        render(data);
    })
    .catch((error) => {
        console.error(error);
    })
    
}