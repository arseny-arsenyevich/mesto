let editButton = document.querySelector(".profile__edit-button")
let popup = document.querySelector(".popup")
let exitButton = document.querySelector(".popup__exit")
let travelerName = document.querySelector(".profile__name")
let travelerProfession = document.querySelector(".profile__profession")
let travelerNameEdit = document.querySelector(".popup__form_input_name")
let travelerProfessionEdit = document.querySelector(".popup__form_input_profession")
let formEditElement = document.querySelector(".popup__forms")


let saveName = () => {
    travelerNameEdit.value = travelerName.textContent
}

let saveProfession = () => {
    travelerProfessionEdit.value = travelerProfession.textContent
}

let togglePopup = () => {
    popup.classList.toggle("popup_opened")
}

let editName = () => {
    travelerName.textContent = travelerNameEdit.value
}

let editProfession = () => {
    travelerProfession.textContent = travelerProfessionEdit.value
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    editProfession();
    editName();
    togglePopup();
}

editButton.addEventListener("click", () => { 
    saveName()
    saveProfession()
    togglePopup()
})

exitButton.addEventListener("click", togglePopup)

formEditElement.addEventListener("submit", handleFormSubmit)

popup.addEventListener("click", (event) =>{
    if (event.target === event.currentTarget)
        togglePopup()
})