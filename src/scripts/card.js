import { initialCards } from './cards.js';
import { cardTemplate } from './index.js';
import { deleteCards, likeCard, dislikeCard } from './api.js';
// Функция создания карточки
function createCard(cardData, userId, onLike, onDelete, onImage) {
  const {
    cardTitle,
    cardAlt,
    cardLink,
    cardLikeCounter = [],
    cardId,
    ownerId,
  } = cardData;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const isLikedByUser = cardLikeCounter.some((like) => like._id === userId);
  cardElement.querySelector(".card__title").textContent = cardTitle;
  cardElement.querySelector(".card__image").alt = cardAlt;
  cardElement.querySelector(".card__image").src = cardLink;
  cardElement.querySelector(".card__like__counter").textContent =
    cardLikeCounter.length;
  cardElement.dataset.id = cardId;

  const cardImage = cardElement.querySelector('.card__image');

  if (isLikedByUser) {
    likeButton.classList.add("card__like-button_is-active");
  }

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (ownerId !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", onDelete);
  }

  likeButton.addEventListener("click", onLike);

  cardImage.addEventListener("click", onImage);
  return cardElement;
}

// функция лайка карточки
function handleLike(evt, cardId) {
  const button = evt.target.classList;
  const card = evt.target.closest(".card");
  const countElement = card.querySelector(".card__like__counter");

  const request = button.contains("card__like-button_is-active")
    ? dislikeCard(cardId)
    : likeCard(cardId);

  request
    .then((response) => {
      const likes = response.likes.length;
      button.contains("card__like-button_is-active")
        ? button.remove("card__like-button_is-active")
        : button.add("card__like-button_is-active");

      countElement.textContent = likes;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// @todo: Функция удаления карточки
function handleCardDelete(evt) {
  const card = evt.target.closest(".card");
  const cardId = card.dataset.id;
  if (card) {
    deleteCards(cardId)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
}

export { createCard, handleCardDelete, handleLike };