export default class UserInfo {
    constructor ({userNameSelector, aboutSelector, avatarSelector}) {
        this._userName = document.querySelector(userNameSelector)
        this._about = document.querySelector(aboutSelector)
        this._avatar = document.querySelector(avatarSelector)
    }

    getUserInfo () {
        return this._userData = {name: this._userName.textContent,
                                about: this._about.textContent,
                                avatar: this._avatar.src}
    }

    setUserInfo ({name, about, avatar}) {
        if (name) this._userName.textContent = name
        if (about) this._about.textContent = about
        if (avatar) this._avatar.src = avatar
    }
}