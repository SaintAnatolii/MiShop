const server_url = 'http://localhost:3000'

export const getData = (url) => {
    return fetch(server_url + url).then((response) => {
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}`)
        } else {
            return response.json()
        }
    })
}


export const sendData = (url, data) => {
    return fetch(server_url + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}`)
        } else {
            return response.json()
        }
    })

};



export const deleteData = (url) => {
    return fetch(server_url + url, {
        method: 'DELETE'
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}`)
        } else {
            return response.json()
        }
    })

};

// ! заменяет весь объект целиком
export const putData = (url, data) => {
    return fetch(server_url + url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}`)
        } else {
            return response.json()
        }
    })
}

// ! заменяет свойство объекта по его id
export const patchData = (url, data) => {
    return fetch(server_url + url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}`)
        } else {
            return response.json()
        }
    })
}