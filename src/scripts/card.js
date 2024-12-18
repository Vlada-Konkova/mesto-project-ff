import { initialCards} from './cards.js';
import {cardTemplate} from './index.js';


// @todo: Функция создания карточки
function createCard(cardData, onDelete, onLike, onImage) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.addEventListener('click', onImage);
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', onLike);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', (evt) => {
    onDelete(evt); // Вызываем функцию удаления при клике
  });
  return cardElement;
}

// @todo: Функция удаления карточки
function handleCardDelete(evt) {
  const deleteCard = evt.target.closest('.card');
  deleteCard.remove();
}

// функция лайка карточки
function handlLike(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

export {createCard, handleCardDelete, handlLike};