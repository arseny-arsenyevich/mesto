import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor (popupSelector, buttonElement, {handleFormSubmit}) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
        this.buttonElement = buttonElement
        this.buttonInitText = this.buttonElement.textContent
    }

    _getInputValues () {
        this._inputValues = {}
        Array.from(this._popup.querySelectorAll(".popup__form")).forEach((input) => {
            this._inputValues[input.name] = input.value
        })
        return this._inputValues
    }

    close() {
        this._popup.querySelector(".popup__forms").reset()
        super.close()
    }

    buttonSetInitText() {
        this.buttonElement.textContent = this.buttonInitText
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener("submit", (evt) =>{
            this.buttonElement.textContent = "Сохранение..."
            evt.preventDefault()
            this._handleFormSubmit(this._getInputValues())
        })
    }
}