export default class Api {
    constructor ({baseUrl, headers}) {
        this._url = baseUrl
        this._headers = headers
    }  

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
        .catch(err => console.log(`Ошибка: ${err}`))
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
        .catch(err => console.log(`Ошибка: ${err}`))
    }   
    
    redactProfile({name, about}, buttonElement) {
        const buttonInitText = buttonElement.textContent
        buttonElement.textContent = "Сохранение..."
        fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })
            }).then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => buttonElement.textContent = buttonInitText)
    }

    redactAvatar({avatar}, buttonElement) {
        const buttonInitText = buttonElement.textContent
        buttonElement.textContent = "Сохранение..."
        fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatar}`,
            })
            }).then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => buttonElement.textContent = buttonInitText)
    }

    addCard({name, link}, buttonElement) {
        const buttonInitText = buttonElement.textContent
        buttonElement.textContent = "Сохранение..."
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
            }).then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => buttonElement.textContent = buttonInitText)
    }

    deleteCard(cardId, buttonElement) {
        const buttonInitText = buttonElement.textContent
        buttonElement.textContent = "Сохранение..."
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
            }).then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => buttonElement.textContent = buttonInitText)
    }

    handleAddLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
            }).then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    handleRemoveLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
            }).then(res => res.ok ? res.json() : Promise.reject(`${res.status}`))
            .catch(err => console.log(`Ошибка: ${err}`))
    }
}