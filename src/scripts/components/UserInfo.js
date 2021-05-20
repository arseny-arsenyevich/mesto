export default class UserInfo {
    constructor ({userNameSelector, aboutSelector}) {
        this._userName = document.querySelector(userNameSelector)
        this._about = document.querySelector(aboutSelector)
    }

    getUserInfo () {
        return this._userData = {name: this._userName.textContent, about: this._about.textContent}
    }

    setUserInfo ({name, about}) {
        this._userName.textContent = name
        this._about.textContent = about
    }
}