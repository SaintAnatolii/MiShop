export const openModal = (modal) => {
    const layout = document.createElement('div');
    layout.classList.add('modal-backdrop');
    layout.classList.add('fade');
    document.body.append(layout);

    modal.style.display = 'block';
    setTimeout(()=>{
        layout.classList.add('show')
        modal.classList.add('show')
    }, 100)
}

export const closeModal = (modal) => {
    const layout = document.querySelector('.modal-backdrop')
    // ! коротка запись вот такого синтаксиса
    // if (layout) {
    //     layout && layout.classList.remove('show')
    // }
    layout && layout.classList.remove('show')

    modal.classList.remove('show')
    setTimeout(()=>{
        modal.style.display = 'none';
        // ! тут тоже самое
        layout && layout.remove()
    }, 500)
    
}