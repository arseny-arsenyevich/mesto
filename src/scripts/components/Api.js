export default class Api {
    constructor ({baseUrl, headers}) {
        this._url = baseUrl
        this._headers = headers
    }  

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkResponse)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkResponse)
    }   
    
    redactProfile({name, about}) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })
            }).then(this._checkResponse)
    }

    redactAvatar({avatar}) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatar}`,
            })
            }).then(this._checkResponse)
    }

    addCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
            }).then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
            }).then(this._checkResponse)
    }

    handleAddLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
            }).then(this._checkResponse)
    }

    handleRemoveLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
            }).then(this._checkResponse)
    }
}