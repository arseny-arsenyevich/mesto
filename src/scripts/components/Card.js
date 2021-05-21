export default class Card {
  constructor(cardData, template, handleCardClick, showEmptyTableTitle) {
    this._link = cardData.link
    this._name = cardData.name
    this._template = template
    this._handleCardClick = handleCardClick
    this._showEmptyTableTitle = showEmptyTableTitle
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
    likeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__like-button_active")
    })
  }

  _handleTrashButton() {
    const trashButton = this._element.querySelector(".elements__trash")
    trashButton.addEventListener("click", () => {
      this._element.remove()
      if (document.querySelectorAll(".elements__title").length === 0) this._showEmptyTableTitle()
    })
  }

  _addEventListenerPicture() {
    this._picture.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name)
    }) 
  }

  generateCard() {
    this._element = this._getTemplate()
    this._picture = this._getPicture()
    this._addEventListenerPicture()
    this._handleLikeButton()
    this._handleTrashButton()

    return this._element
  }
}