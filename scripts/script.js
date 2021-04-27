const editButton = document.querySelector(".profile__edit-button")
const addButton = document.querySelector(".profile__add-button")
const popupName = document.querySelector(".popup_content_name")
const popupCard = document.querySelector(".popup_content_card")
const popupPicContainer = document.querySelector(".popup_content_picture")
const popupPicture = popupPicContainer.querySelector(".popup__picture")
const popupPictureTitle = popupPicContainer.querySelector(".popup__picture-title")
const exitButtonName = document.querySelector(".popup__exit_content_name")
const exitButtonCard = document.querySelector(".popup__exit_content_card")
const exitButtonPicture = document.querySelector(".popup__exit_content_picture")
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
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    }    
]


const togglePopupName = () => {
  popupName.classList.toggle("popup_opened")
}

const togglePopupCard = () => {
  popupCard.classList.toggle("popup_opened")
}

const togglePopupPicture = () => {
  popupPicContainer.classList.toggle("popup_opened")
}

const emptyTable = () => {
  console.log("dobavil")
        emptyTitle.classList.add("elements__empty_active")
}

const filledTable = () => {
  console.log("ubral")
        emptyTitle.classList.remove("elements__empty_active")
}

const addCard = (link,name) => {
        const template = document.querySelector("#elements__template").content
        const cardElement = template.querySelector(".elements__card").cloneNode(true)
        cardElement.querySelector(".elements__picture").src = link
        cardElement.querySelector(".elements__title").textContent = name
        const likeButton = cardElement.querySelector(".elements__like-button")
        likeButton.addEventListener("click", (evt) => {
          evt.target.classList.toggle("elements__like-button_active")
        })
        elementsTable.prepend(cardElement)
        const deleteButton = cardElement.querySelector(".elements__trash")
        deleteButton.addEventListener("click", (evt) => {
            const listItem = evt.target.closest(".elements__card")
            listItem.remove()
            if (document.querySelectorAll(".elements__title").length === 0) {
              emptyTable()
            }
        })
        const cardPicture = cardElement.querySelector(".elements__picture")
        cardPicture.addEventListener("click", (evt) => {
          popupPicture.src = link
          popupPictureTitle.textContent = name
          togglePopupPicture()
        }) 
}

const fillPage = () => {
    initialCards.forEach((card) => {
        addCard(card.link, card.name)
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



function handleFormSubmit (evt) {
    evt.preventDefault();
    editProfession();
    editName();
    togglePopupName();
}

editButton.addEventListener("click", () => { 
    saveName()
    saveProfession()
    togglePopupName()
})



addButton.addEventListener("click", () => {
    togglePopupCard()
})

exitButtonName.addEventListener("click", togglePopupName)

exitButtonCard.addEventListener("click", togglePopupCard)

exitButtonPicture.addEventListener("click", togglePopupPicture)

formEditElementName.addEventListener("submit", handleFormSubmit)

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault()
  addCard(cardLink.value, cardPlace.value)
  cardLink.value = ""
  cardPlace.value = ""
  filledTable()
  togglePopupCard()
})

popupName.addEventListener("click", (event) =>{
    if (event.target === event.currentTarget)
        togglePopupName()
})

popupCard.addEventListener("click", (event) =>{
  if (event.target === event.currentTarget)
      togglePopupCard()
})

popupPicContainer.addEventListener("click", (event) =>{
  if (event.target === event.currentTarget)
      togglePopupPicture()
})

fillPage()

console.log("her")
