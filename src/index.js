import "./pages/index.css"
import FormValidation from "./scripts/components/FormValidator.js"
import Card from "./scripts/components/Card.js"
import Section from "./scripts/components/Section.js"
import PopupWithImage from "./scripts/components/PopupWithImage.js"
import PopupWithForm from "./scripts/components/PopupWithForm.js"
import UserInfo from "./scripts/components/UserInfo.js"
import {initialCards, 
  selectors, 
  editButton, 
  addButton, 
  travelerNameEdit,
  travelerProfessionEdit,
  elementsTable,
  emptyTitle
} from "./scripts/utils/constants.js"



export {emptyTable}

const handleCardClick = (link, name) => {
  popupPicContainer.open(link, name)
}

const emptyTable = () => {
  emptyTitle.classList.add("elements__empty_active")
}

const filledTable = () => {
  emptyTitle.classList.remove("elements__empty_active")
}

const traveler = new UserInfo ({userNameSelector: ".profile__name", aboutSelector: ".profile__profession"})

const popupName = new PopupWithForm (".popup_content_name", {
  handleFormSubmit:  (userData) => {
      traveler.setUserInfo(userData)
    }
  }
)

const popupCard = new PopupWithForm (".popup_content_card", {
  handleFormSubmit:  ({link, name}) => {
    const cardItem = new Card(link, 
      name, 
      "#elements__template", 
      handleCardClick) 
    cardList.addItem(cardItem.generateCard())
    filledTable()
    validateCard.setInActiveButton(document.querySelector(".popup__save-button_content_card"))
    }
  }
)

const popupPicContainer = new PopupWithImage (".popup_content_picture")

const validateName = new FormValidation(selectors, ".popup__forms_content_name")

const validateCard = new FormValidation(selectors, ".popup__forms_content_card")

const cardList = new Section ({
  items: initialCards, 
  renderer: ({link, name}) =>{
    const cardItem = new Card(link, 
      name, 
      "#elements__template", 
      handleCardClick)
    cardList.addItem(cardItem.generateCard())
  }
}, elementsTable)

const handleEditButton = () => { 
  travelerNameEdit.value = traveler.getUserInfo().name
  travelerProfessionEdit.value = traveler.getUserInfo().about
  validateName.setActiveButton(document.querySelector(".popup__save-button_content_name"))
  popupName.open()
}

editButton.addEventListener("click", handleEditButton)

addButton.addEventListener("click", () => popupCard.open())

cardList.renderItems()

if (document.querySelectorAll(".elements__title").length === 0) {
  emptyTable()
}

popupCard.setEventListeners()

popupName.setEventListeners()

popupPicContainer.setEventListeners()

validateName.enableValidation()

validateCard.enableValidation()