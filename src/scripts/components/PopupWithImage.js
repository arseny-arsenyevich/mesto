import Popup from "./Popup.js"
import {popupPicture, popupPictureTitle} from "../utils/constants.js"

export default class PopupWithImage extends Popup {
    open(link, name) {
        popupPicture.src = link
        popupPictureTitle.textContent = name
        popupPicture.alt = name
        super.open()
    }
}