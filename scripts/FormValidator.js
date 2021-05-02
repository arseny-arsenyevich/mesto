const showInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`)
    inputElement.classList.add(obj.inputErrorClass)
    errorElement.classList.add(obj.errorClass)
    errorElement.textContent = inputElement.validationMessage
  }
  
  const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`)
    inputElement.classList.remove(obj.inputErrorClass)
    errorElement.classList.remove(obj.errorClass)
    errorElement.textContent = ""
  }
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  
  function toggleButtonState(inputList, buttonElement, obj) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(obj.inactiveButtonClass)
    } else {
      buttonElement.classList.remove(obj.inactiveButtonClass)
    }
  }
  
  const checkInputValidity = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, obj)
    } else {
      hideInputError(formElement, inputElement, obj)
    }
  }
  
  const setEventListeners = (formElement, obj) => {
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
  
  const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector))
    formList.forEach((formElement) => {
      setEventListeners(formElement, obj)
    })
  }

  enableValidation({
    formSelector: ".popup__forms",
    inputSelector: ".popup__form",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_inactive",
    inputErrorClass: "popup__form_invalid",
    errorClass: "popup__error_active"
  })