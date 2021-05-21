import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
    open(link, name) {
        this._popupPicture = this._popup.querySelector(".popup__picture")
        this._popupPictureTitle = this._popup.querySelector(".popup__picture-title")
        this._popupPicture.src = link
        this._popupPicture.alt = name
        this._popupPictureTitle.textContent = name
        super.open()
    }
}