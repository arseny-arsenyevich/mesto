class FormValidation {
_showInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`)
    inputElement.classList.add(obj.inputErrorClass)
    errorElement.classList.add(obj.errorClass)
    errorElement.textContent = inputElement.validationMessage
  }
  
  _hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`)
    inputElement.classList.remove(obj.inputErrorClass)
    errorElement.classList.remove(obj.errorClass)
    errorElement.textContent = ""
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  
  _toggleButtonState(inputList, buttonElement, obj) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(obj.inactiveButtonClass)
    } else {
      buttonElement.classList.remove(obj.inactiveButtonClass)
    }
  }
  
  _checkInputValidity = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, obj)
    } else {
      hideInputError(formElement, inputElement, obj)
    }
  }
  
  _setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector))
    const buttonElement = formElement.querySelector(obj.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, obj)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, obj)
        toggleButtonState(inputList, buttonElement, obj)
      })
    })
  }
  
  _enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector))
    formList.forEach((formElement) => {
      setEventListeners(formElement, obj)
    })
  }
}
  // enableValidation({
  //   formSelector: ".popup__forms",
  //   inputSelector: ".popup__form",
  //   submitButtonSelector: ".popup__save-button",
  //   inactiveButtonClass: "popup__save-button_inactive",
  //   inputErrorClass: "popup__form_invalid",
  //   errorClass: "popup__error_active"
  // })

  const selectors = {
    formSelector: ".popup__forms",
    inputSelector: ".popup__form",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_inactive",
    inputErrorClass: "popup__form_invalid",
    errorClass: "popup__error_active"
  }