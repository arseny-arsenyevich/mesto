export default class FormValidation {
  constructor(selectors, form) {
    this._selectors = selectors
    this._form = form
  }

  _showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`)
    inputElement.classList.add(this._selectors.inputErrorClass)
    errorElement.classList.add(this._selectors.errorClass)
    errorElement.textContent = inputElement.validationMessage
  }
  
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`)
    inputElement.classList.remove(this._selectors.inputErrorClass)
    errorElement.classList.remove(this._selectors.errorClass)
    errorElement.textContent = ""
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._selectors.inactiveButtonClass)
      buttonElement.disabled = true
    } else {
      buttonElement.classList.remove(this._selectors.inactiveButtonClass)
      buttonElement.disabled = false
    }
  }
  
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement)
    } else {
      this._hideInputError(formElement, inputElement)
    }
  }

  _inputEvent = (formElement, inputElement, inputList, buttonElement) => {
    this._checkInputValidity(formElement, inputElement)
    this._toggleButtonState(inputList, buttonElement)
  }
  
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._selectors.inputSelector))
    const buttonElement = formElement.querySelector(this._selectors.submitButtonSelector)
    this._toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", this._inputEvent.bind(undefined, formElement, inputElement, inputList, buttonElement))
    })
  }
  
  enableValidation() {
    this._setEventListeners(document.querySelector(this._form))
  }
}

