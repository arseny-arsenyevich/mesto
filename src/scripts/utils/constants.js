export const initialCards = [
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  }    
]

export const selectors = {
  inputSelector: ".popup__form",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__form_invalid",
  errorClass: "popup__error_active"
}

export const editButton = document.querySelector(".profile__edit-button")
export const addButton = document.querySelector(".profile__add-button")
export const travelerNameEdit = document.querySelector(".popup__form_input_name")
export const travelerProfessionEdit = document.querySelector(".popup__form_input_profession")
export const elementsTable = ".elements__table"
export const emptyTitle = document.querySelector(".elements__empty")
