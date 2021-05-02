const editButton = document.querySelector(".profile__edit-button")
const addButton = document.querySelector(".profile__add-button")
const popups = Array.from(document.querySelectorAll(".popup"))
const popupName = document.querySelector(".popup_content_name")
const popupCard = document.querySelector(".popup_content_card")
const popupPicContainer = document.querySelector(".popup_content_picture")
const popupPicture = popupPicContainer.querySelector(".popup__picture")
const popupPictureTitle = popupPicContainer.querySelector(".popup__picture-title")
const travelerName = document.querySelector(".profile__name")
const travelerProfession = document.querySelector(".profile__profession")
const travelerNameEdit = document.querySelector(".popup__form_input_name")
const travelerProfessionEdit = document.querySelector(".popup__form_input_profession")
const cardPlace = document.querySelector(".popup__form_input_place")
const cardLink = document.querySelector(".popup__form_input_link")
const formEditElementName = document.querySelector(".popup__forms_content_name")
const formAddCard = document.querySelector(".popup__forms_content_card")
const elementsTable = document.querySelector(".elements__table")
const emptyTitle = document.querySelector(".elements__empty")

const initialCards = [
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

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

const emptyTable = () => {
        emptyTitle.classList.add("elements__empty_active")
}

const filledTable = () => {
        emptyTitle.classList.remove("elements__empty_active")
}

const addCard = (link,name) => {
        const template = document.querySelector("#elements__template").content
        const cardElement = template.querySelector(".elements__card").cloneNode(true)
        cardElement.querySelector(".elements__picture").src = link
        cardElement.querySelector(".elements__picture").alt = name
        cardElement.querySelector(".elements__title").textContent = name
        const cardPicture = cardElement.querySelector(".elements__picture")
        cardPicture.addEventListener("click", (evt) => {
          popupPicture.src = link
          popupPictureTitle.textContent = name
          openPopup(popupPicContainer)
        }) 
        return cardElement
}

elementsTable.addEventListener("click", (evt) =>{
  if (evt.target.classList.contains("elements__like-button")) {
      evt.target.classList.toggle("elements__like-button_active")
  }
  if (evt.target.classList.contains("elements__trash")) {
      const cardItem = evt.target.closest(".elements__card")
      cardItem.remove()
      if (document.querySelectorAll(".elements__title").length === 0) {
          emptyTable()
      }
  }
})

const fillPage = () => {
    initialCards.forEach((card) => {
        elementsTable.prepend(addCard(card.link, card.name))
    })
}

const saveName = () => {
    travelerNameEdit.value = travelerName.textContent
}

const saveProfession = () => {
    travelerProfessionEdit.value = travelerProfession.textContent
}

const editName = () => {
    travelerName.textContent = travelerNameEdit.value
}

const editProfession = () => {
    travelerProfession.textContent = travelerProfessionEdit.value
}

function handleFormName (evt) {
    evt.preventDefault();
    editProfession();
    editName();
    closePopup(popupName);
}

editButton.addEventListener("click", () => { 
  saveName()
  saveProfession()
  openPopup(popupName)
})

addButton.addEventListener("click", () => {
  openPopup(popupCard)
})

formEditElementName.addEventListener("submit", handleFormName)

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault()
  elementsTable.prepend(addCard(cardLink.value, cardPlace.value))
  cardLink.value = ""
  cardPlace.value = ""
  filledTable()
  closePopup(popupCard)
})

popups.forEach((popup) => {popup.addEventListener("click", (evt) =>{
    if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__exit")) {
        closePopup(evt.target.closest(".popup"))
    }
})})


document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      popups.forEach((popup) => {closePopup(popup)})
    }
})

//скрипты скатал из тренажера, надеюсь это не считается за плагиат))

const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`)
  inputElement.classList.add("popup__form_invalid")
  errorElement.classList.add("popup__error_active")
  errorElement.textContent = inputElement.validationMessage
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`)
  inputElement.classList.remove("popup__form_invalid")
  errorElement.classList.remove("popup__error_active")
  errorElement.textContent = ""
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  }); 
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_inactive")
  } else {
    buttonElement.classList.remove("popup__save-button_inactive")
  }
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement)
  } else {
    hideInputError(formElement, inputElement)
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__form"))
  const buttonElement = formElement.querySelector(".popup__save-button")
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, inputElement.validationMessage)
      toggleButtonState(inputList, buttonElement)
    });
  });
};


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__forms"))
  formList.forEach((formElement) => {
    setEventListeners(formElement)
  })
}

saveName()

saveProfession()

enableValidation()

fillPage()

