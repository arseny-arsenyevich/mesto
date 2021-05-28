import Popup from "./Popup.js"

export default class PopupWithDelete extends Popup {
    constructor (popupSelector, buttonElement, {handleFormSubmit}) {
        super(popupSelector)
        this.buttonElement = buttonElement
        this.buttonInitText = this.buttonElement.textContent
        this._handleFormSubmit = handleFormSubmit
    }

    open (card, cardId) {
        this._card = card
        this._cardId = cardId
        super.open()
    }

    buttonSetInitText() {
        this.buttonElement.textContent = this.buttonInitText
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener("submit", (evt) =>{
            this.buttonElement.textContent = "Сохранение..."
            evt.preventDefault()
            this._handleFormSubmit(this._card, this._cardId)
        })
    }
}