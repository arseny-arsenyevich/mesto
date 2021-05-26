export default class Card {
  constructor({link, name, likes, owner, _id},
              currentUserId, 
              template, 
              handleCardClick,
              {handleTrashButton},
              handleAddLike,
              handleRemoveLike, 
              showEmptyTableTitle) {
    this._link = link
    this._name = name
    this.likes = likes
    this._ownerId = owner._id
    this._cardId = _id
    this._currentUserId = currentUserId
    this.likes.some((like) => like._id === this._currentUserId) ? this._isLiked = true
                                                                : this._isLiked = false
    this._template = template
    this._handleCardClick = handleCardClick
    this._handleTrashButton = handleTrashButton
    this._handleAddLike = handleAddLike
    this._handleRemoveLike = handleRemoveLike
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

  _toggleLikeButton() {
    const likeCounter = this._element.querySelector(".elements__like-counter")
    likeCounter.textContent = this.likes.length
    const likeButton = this._element.querySelector(".elements__like-button")
    if (this._isLiked) {likeButton.classList.add("elements__like-button_active")}
    likeButton.addEventListener("click", (evt) => {
      if (this._isLiked) {
        likeCounter.textContent = parseInt(likeCounter.textContent, 10) - 1
        evt.target.classList.remove("elements__like-button_active")
        this._handleRemoveLike(this._cardId)
      } else {
        likeCounter.textContent = parseInt(likeCounter.textContent, 10) + 1
        evt.target.classList.add("elements__like-button_active")
        this._handleAddLike(this._cardId)
      }   
      this._isLiked = !this._isLiked   
    })
  }

  _toggleTrashButton() {
    const trashButton = this._element.querySelector(".elements__trash")
    if (this._ownerId === this._currentUserId) {
      trashButton.addEventListener("click", () => {
        this._handleTrashButton(this._element, this._cardId)
        if (document.querySelectorAll(".elements__title").length === 0) this._showEmptyTableTitle()
      })
    } else {
      trashButton.style.display = "none"
    }
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
    this._toggleLikeButton()
    this._toggleTrashButton()

    return this._element
  }
}