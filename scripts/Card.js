import {popupPicture, popupPictureTitle, popupPicContainer, openPopup} from "./index.js"

export default class Card {
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
      this._setEventListener()
      this._handleLikeButton()
      this._handleTrashButton()

      return this._element
    }
}