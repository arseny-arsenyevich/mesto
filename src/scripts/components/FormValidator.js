export default class FormValidation {
  constructor({inputSelector,
    submitButtonSelector,
    ...restSelectors}, form) {
    this._selectors = restSelectors
    this._formElement = document.querySelector(form)
    this._inputList = Array.from(this._formElement.querySelectorAll(inputSelector))
    this.buttonElement = this._formElement.querySelector(submitButtonSelector)
  }

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.id}`)
    inputElement.classList.add(this._selectors.inputErrorClass)
    errorElement.classList.add(this._selectors.errorClass)
    errorElement.textContent = inputElement.validationMessage
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.id}`)
    inputElement.classList.remove(this._selectors.inputErrorClass)
    errorElement.classList.remove(this._selectors.errorClass)
    errorElement.textContent = ""
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _setInActiveButton() {
    this.buttonElement.classList.add(this._selectors.inactiveButtonClass)
    this.buttonElement.disabled = true
  }

  _setActiveButton() {
    this.buttonElement.classList.remove(this._selectors.inactiveButtonClass)
    this.buttonElement.disabled = false
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._setInActiveButton()
    } else {
      this._setActiveButton()
    }
  }

  restartValidation() {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => this._hideInputError(inputElement))
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _setEventListeners() {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }
}

