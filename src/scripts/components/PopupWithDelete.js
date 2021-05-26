import Popup from "./Popup.js"

export default class PopupWithDelete extends Popup {
    constructor (popupSelector, {handleFormSubmit}) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
    }

    open (card, cardId) {
        this._card = card
        this._cardId = cardId
        super.open()
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener("submit", (evt) =>{
            evt.preventDefault()
            this._handleFormSubmit(this._card, this._cardId)
        })
    }
}