import "./index.css"
import FormValidation from "../scripts/components/FormValidator.js"
import Card from "../scripts/components/Card.js"
import Section from "../scripts/components/Section.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import PopupWithForm from "../scripts/components/PopupWithForm.js"
import PopupWithDelete from "../scripts/components/PopupWithDelete.js"
import UserInfo from "../scripts/components/UserInfo.js"
import Api from "../scripts/components/Api.js"
import {
  selectors, 
  editButton, 
  editAvatarButton,
  addButton, 
  travelerNameEdit,
  travelerProfessionEdit,
  elementsTable,
  emptyTitle
} from "../scripts/utils/constants.js"

let myId = null

const handleCardClick = (link, name) => {
  popupPicContainer.open(link, name)
}

const showEmptyTableTitle = () => {
  emptyTitle.classList.add("elements__empty_active")
}

const removeEmptyTableTitle = () => {
  emptyTitle.classList.remove("elements__empty_active")
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "43e71961-3715-4de8-9b86-f45dfa570664",
    "Content-Type": "application/json"
  }
})

const createCard = (cardData) => {
  return new Card({likes: [], ...cardData},
    myId,
    "#elements__template",
    handleCardClick,
    {
      handleTrashButton: (card, cardId) => {
        popupDeleteCard.open(card, cardId)
      }
    },
    api.handleAddLike.bind(api),
    api.handleRemoveLike.bind(api))
}

const validateName = new FormValidation(selectors, ".popup__forms_content_name")

const validateCard = new FormValidation(selectors, ".popup__forms_content_card")

const validateAvatar = new FormValidation(selectors, ".popup__forms_content_avatar")

const validateDelete = new FormValidation(selectors, ".popup__forms_content_delete-card")

const traveler = new UserInfo ({
  userNameSelector: ".profile__name",
  aboutSelector: ".profile__profession",
  avatarSelector: ".profile__picture"
})

const popupName = new PopupWithForm (
  ".popup_content_name",
  validateName.buttonElement, {
  handleFormSubmit:  ({name, about}) => {
      api.redactProfile({name, about})
        .then(({name, about}) => {
          traveler.setUserInfo({name, about})
          popupName.close()
      })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => popupName.buttonSetInitText())
    }
  }
)

const popupCard = new PopupWithForm (
  ".popup_content_card",
  validateCard.buttonElement, {
  handleFormSubmit:  (cardData) => {
    api.addCard(cardData).then((data) => {
        const cardItem = createCard(data)
        cardList.addItem(cardItem.generateCard())
        popupCard.close()
    })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => popupCard.buttonSetInitText())
    removeEmptyTableTitle()
    validateCard.restartValidation()
    }
  }
)

const popupAvatar = new PopupWithForm (
  ".popup_content_avatar",
  validateAvatar.buttonElement, {
  handleFormSubmit:  ({avatar}) => {
      api.redactAvatar({avatar})
        .then(({avatar}) => {
          traveler.setUserInfo({avatar})
          popupAvatar.close()
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => popupAvatar.buttonSetInitText())
      validateAvatar.restartValidation()
    }
  }
)

const popupDeleteCard = new PopupWithDelete (
  ".popup_content_delete-card",
  validateDelete.buttonElement, {
  handleFormSubmit: (card, cardId) => {
    api.deleteCard(cardId).then(() => {
      card.remove()
      if (document.querySelectorAll(".elements__title").length === 0) showEmptyTableTitle()
      popupDeleteCard.close()
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => popupDeleteCard.buttonSetInitText())
  }
})

const popupPicContainer = new PopupWithImage (".popup_content_picture")

const cardList = new Section ({
  renderer: (cardItem) =>{
    cardList.addItem(cardItem.generateCard())
  }
}, elementsTable)

const handleEditButton = () => { 
  travelerNameEdit.value = traveler.getUserInfo().name
  travelerProfessionEdit.value = traveler.getUserInfo().about
  validateName.restartValidation()
  popupName.open()
}

editButton.addEventListener("click", handleEditButton)

addButton.addEventListener("click", () => {
  validateCard.restartValidation()
  popupCard.open()
})

editAvatarButton.addEventListener("click", () => {
  validateAvatar.restartValidation()
  popupAvatar.open()
})

Promise.all([api.getUserInfo(), api.getCards()])
    .then((res) => {
      traveler.setUserInfo(res[0])
      myId = res[0]._id

      cardList.renderItems(res[1].map(card => createCard(card)).reverse())
      if (document.querySelectorAll(".elements__title").length === 0) showEmptyTableTitle()
    })
    .catch(err => console.log(`Ошибка: ${err}`))

popupCard.setEventListeners()

popupName.setEventListeners()

popupPicContainer.setEventListeners()

popupDeleteCard.setEventListeners()

popupAvatar.setEventListeners()

validateName.enableValidation()

validateCard.enableValidation()

validateAvatar.enableValidation()