import "./index.css"
import FormValidation from "../scripts/components/FormValidator.js"
import Card from "../scripts/components/Card.js"
import Section from "../scripts/components/Section.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import PopupWithForm from "../scripts/components/PopupWithForm.js"
import UserInfo from "../scripts/components/UserInfo.js"
import {initialCards, 
  selectors, 
  editButton, 
  addButton, 
  travelerNameEdit,
  travelerProfessionEdit,
  elementsTable,
  emptyTitle
} from "../scripts/utils/constants.js"

const handleCardClick = (link, name) => {
  popupPicContainer.open(link, name)
}

const showEmptyTableTitle = () => {
  emptyTitle.classList.add("elements__empty_active")
}

const removeEmptyTableTitle = () => {
  emptyTitle.classList.remove("elements__empty_active")
}

const traveler = new UserInfo ({userNameSelector: ".profile__name", aboutSelector: ".profile__profession"})

const popupName = new PopupWithForm (".popup_content_name", {
  handleFormSubmit:  (userData) => {
      traveler.setUserInfo(userData)
      popupName.close()
    }
  }
)

const popupCard = new PopupWithForm (".popup_content_card", {
  handleFormSubmit:  (cardData) => {
    const cardItem = new Card(cardData,
      "#elements__template", 
      handleCardClick,
      showEmptyTableTitle)
    cardList.addItem(cardItem.generateCard())
    removeEmptyTableTitle()
    validateCard.restartValidation()
    popupCard.close()
    }
  }
)

const popupPicContainer = new PopupWithImage (".popup_content_picture")

const validateName = new FormValidation(selectors, ".popup__forms_content_name")

const validateCard = new FormValidation(selectors, ".popup__forms_content_card")

const cardList = new Section ({
  items: initialCards, 
  renderer: (cardData) =>{
    const cardItem = new Card(cardData, 
      "#elements__template", 
      handleCardClick,
      showEmptyTableTitle)
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

cardList.renderItems()

if (document.querySelectorAll(".elements__title").length === 0) {
  showEmptyTableTitle()
}

popupCard.setEventListeners()

popupName.setEventListeners()

popupPicContainer.setEventListeners()

validateName.enableValidation()

validateCard.enableValidation()