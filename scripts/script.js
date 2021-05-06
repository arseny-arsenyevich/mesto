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

escapePressed = (evt) => {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_opened")
    closePopup(popupActive)
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened")
  document.removeEventListener("keydown", escapePressed)
}

function openPopup(popup) {
  popup.classList.add("popup_opened")
  document.addEventListener("keydown", escapePressed)
}



const emptyTable = () => {
        emptyTitle.classList.add("elements__empty_active")
}

const filledTable = () => {
        emptyTitle.classList.remove("elements__empty_active")
}

class Card {
        constructor(link, name, template) {
          this._link = link
          this._name = name
          this._template = template
        }

        _getTemplate() {
          const template = document.querySelector(this._template).content
          const cardEmpty = template.querySelector(".elements__card").cloneNode(true)
          cardEmpty.querySelector(".elements__title").textContent = this._name

          return cardEmpty
        }

        _getPicture() {
          const cardPicture = this._element.querySelector(".elements__picture")
          cardPicture.src = this._link
          cardPicture.alt = this._name

          return cardPicture
        }

        _handleLikeButton() {
          const likeButton = this._element.querySelector(".elements__like-button")
          likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("elements__like-button_active")
          })
        }

        _handleTrashButton() {
          const trashButton = this._element.querySelector(".elements__trash")
          trashButton.addEventListener("click", () => {
            this._element.remove()
            if (document.querySelectorAll(".elements__title").length === 0) {
                emptyTable()
            }
          })
        }

        _setEventListener() {
          this._picture.addEventListener("click", (evt) => {
            popupPicture.src = this._link
            popupPictureTitle.textContent = this._name
            popupPicture.alt = this._name
            openPopup(popupPicContainer)
          }) 
        }

        generateCard() {
          this._element = this._getTemplate()
          this._picture = this._getPicture()
          this._handleLikeButton()
          this._handleTrashButton()

          return this._element
        }
}

const fillPage = () => {
    initialCards.forEach((item) => {
        const cardElement = new Card(item.link, item.name, "#elements__template")
        elementsTable.prepend(cardElement.generateCard())
    })
}

function handleFormName (evt) {
    evt.preventDefault()
    travelerName.textContent = travelerNameEdit.value
    travelerProfession.textContent = travelerProfessionEdit.value
    closePopup(popupName)
}

editButton.addEventListener("click", () => { 
  travelerNameEdit.value = travelerName.textContent
  travelerProfessionEdit.value = travelerProfession.textContent
  openPopup(popupName)
})

addButton.addEventListener("click", () => {
  openPopup(popupCard)
})

formEditElementName.addEventListener("submit", handleFormName)

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault()
  const cardElement = new Card(cardLink.value, cardPlace.value, "#elements__template") 
  elementsTable.prepend(cardElement.generateCard())
  formAddCard.reset()
  filledTable()
  closePopup(popupCard)
})

popups.forEach((popup) => {popup.addEventListener("click", (evt) =>{
    if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__exit")) {
        closePopup(evt.target.closest(".popup"))
    }
})})

travelerNameEdit.value = travelerName.textContent

travelerProfessionEdit.value = travelerProfession.textContent

fillPage()

