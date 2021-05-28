export default class Card {
  constructor({link, name, likes, owner, _id},
      currentUserId, 
      template, 
      handleCardClick,
      {handleTrashButton},
      handleAddLike,
      handleRemoveLike) {
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

  _handleLike(res) {
    this.likes = res.likes
    this._likeCounter.textContent = this.likes.length
    this._isLiked = !this._isLiked
  }

  _toggleLikeButton() {
    this._likeCounter = this._element.querySelector(".elements__like-counter")
    this._likeCounter.textContent = this.likes.length
    const likeButton = this._element.querySelector(".elements__like-button")
    if (this._isLiked) {likeButton.classList.add("elements__like-button_active")}
    likeButton.addEventListener("click", (evt) => {
      if (this._isLiked) {
        this._handleRemoveLike(this._cardId).then((res) => {
          this._handleLike(res)
          evt.target.classList.remove("elements__like-button_active")
        }).catch(err => console.log(`Ошибка: ${err}`))
      } else {
        this._handleAddLike(this._cardId).then((res) => {
          this._handleLike(res)
          evt.target.classList.add("elements__like-button_active")
        }).catch(err => console.log(`Ошибка: ${err}`))
      }   
        
    })
  }

  _toggleTrashButton() {
    const trashButton = this._element.querySelector(".elements__trash")
    if (this._ownerId === this._currentUserId) {
      trashButton.addEventListener("click", () => {
        this._handleTrashButton(this._element, this._cardId)
        
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