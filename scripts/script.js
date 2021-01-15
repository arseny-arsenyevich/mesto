let editButton = document.querySelector(".profile__edit-button")
let overlay = document.querySelector(".overlay")
let exitButton = document.querySelector(".popup__exit")
let saveButton = document.querySelector(".popup__save-button")
let travelerName = document.querySelector(".profile__name")
let travelerProfession = document.querySelector(".profile__profession")
let travelerNameEdit = document.querySelector(".popup__form_input_name")
let travelerProfessionEdit = document.querySelector(".popup__form_input_profession")

travelerNameEdit.value = travelerName.textContent
travelerProfessionEdit.value = travelerProfession.textContent

let togglePopup = () => {
    overlay.classList.toggle("overlay_active")
}

let editName = () => {
    travelerName.textContent = travelerNameEdit.value
}

let editProfession = () => {
    travelerProfession.textContent = travelerProfessionEdit.value
}

editButton.addEventListener("click", togglePopup)

exitButton.addEventListener("click", togglePopup)

saveButton.addEventListener("click", () => {
    editProfession()
    editName()
    togglePopup()
})

overlay.addEventListener("click", (event) =>{
    if (event.target === event.currentTarget)
        togglePopup()
})