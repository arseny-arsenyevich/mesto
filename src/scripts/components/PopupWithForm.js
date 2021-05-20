import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor (popupSelector, {handleFormSubmit}) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
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

    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener("submit", (evt) =>{
            evt.preventDefault()
            this._handleFormSubmit(this._getInputValues())
            this.close()
        })
    }
}