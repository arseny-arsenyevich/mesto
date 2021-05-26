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
  avatarPicture,
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

const traveler = new UserInfo ({userNameSelector: ".profile__name",
                                aboutSelector: ".profile__profession",
                                avatarSelector: ".profile__picture"})

const popupName = new PopupWithForm (".popup_content_name", {
  handleFormSubmit:  ({name, about}) => {
      traveler.setUserInfo({name, about})
      api.redactProfile({name, about}, validateName.buttonElement)
      popupName.close()
    }
  }
)

const popupCard = new PopupWithForm (".popup_content_card", {
  handleFormSubmit:  (cardData) => {
    api.addCard(cardData, validateCard.buttonElement).then((data) => {
      const cardItem = new Card({likes: [], ...data},
        myId,
        "#elements__template",
        handleCardClick,
        {
          handleTrashButton: (card, cardId) => {
            popupDeleteCard.open(card, cardId)
          }
        },
        api.handleAddLike.bind(api),
        api.handleRemoveLike.bind(api),
        showEmptyTableTitle)
        cardList.prependItem(cardItem.generateCard())
        popupCard.close()
    })
    removeEmptyTableTitle()
    validateCard.restartValidation()
    }
  }
)

const popupAvatar = new PopupWithForm (".popup_content_avatar", {
  handleFormSubmit:  ({avatar}) => {
      traveler.setUserInfo({avatar})
      api.redactAvatar({avatar}, validateAvatar.buttonElement)
      validateAvatar.restartValidation()
      popupAvatar.close()
    }
  }
)

const popupDeleteCard = new PopupWithDelete (".popup_content_delete-card", {
  handleFormSubmit: (card, cardId) => {
    card.remove()
    api.deleteCard(cardId, validateDelete.buttonElement)
    popupDeleteCard.close()
  }
})

const popupPicContainer = new PopupWithImage (".popup_content_picture")

const validateName = new FormValidation(selectors, ".popup__forms_content_name")

const validateCard = new FormValidation(selectors, ".popup__forms_content_card")

const validateAvatar = new FormValidation(selectors, ".popup__forms_content_avatar")

const validateDelete = new FormValidation(selectors, ".popup__forms_content_delete-card")

const cardList = new Section ({
  renderer: (cardData) =>{
    const cardItem = new Card(cardData,
      myId, 
      "#elements__template",
      handleCardClick,
      {
        handleTrashButton: (card, cardId) => {
          popupDeleteCard.open(card, cardId)
        }
      },
      api.handleAddLike.bind(api),
      api.handleRemoveLike.bind(api),
      showEmptyTableTitle)
    cardList.appendItem(cardItem.generateCard())
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

editAvatarButton.addEventListener("click", popupAvatar.open.bind(popupAvatar))

api.getUserInfo().then(({name, about, avatar, _id}) => {
  traveler.setUserInfo({name, about, avatar})
  myId = _id
})

api.getCards().then((cards) => {
  cardList.renderItems(cards)
  if (document.querySelectorAll(".elements__title").length === 0) {
    showEmptyTableTitle()
  }
})

popupCard.setEventListeners()

popupName.setEventListeners()

popupPicContainer.setEventListeners()

popupDeleteCard.setEventListeners()

popupAvatar.setEventListeners()

validateName.enableValidation()

validateCard.enableValidation()

validateAvatar.enableValidation()