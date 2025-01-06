import {cardTemplate} from '/src/index.js';
import { likeCard, dislikeCard, deleteCard } from "./api.js";

// @todo: Функция создания карточки
function createCard(cardData, userId, onDelete, onLike, onImage) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCount = cardElement.querySelector('.card__like-count'); // Новый элемент
  // Установка данных карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Проверяем, является ли текущий пользователь владельцем карточки
  if (cardData.owner._id === userId) {
    deleteButton.classList.remove('card__delete-button-invisible'); 
    deleteButton.addEventListener('click', (evt) => {
      onDelete(evt, cardData._id);
    });
  } else {
    deleteButton.classList.add('card__delete-button-invisible');
  }

  // Отображение количества лайков
  likeCount.textContent = cardData.likes.length; // Устанавливаем текст в новом элементе

  // Добавляем обработчики событий
  cardImage.addEventListener('click', onImage);
  likeButton.addEventListener('click', (evt) => {
    onLike(evt, likeCount, cardData);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function handleCardDelete(evt, cardId) {
  // Отправляем запрос на удаление карточки
  deleteCard(cardId)
    .then(() => {
      const deleteCard = evt.target.closest('.card');
      deleteCard.remove();
    })
    .catch(error => {
      console.error(`Ошибка: ${error}`);
    });
}

// функция лайка карточки
function handleLike(evt, likeCount, cardData) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  let send;
  // Определяем, какой запрос отправить
  if (isLiked) {
    send = dislikeCard(cardData._id);
  } else {
    send = likeCard(cardData._id);
  }

  send
    .then(updatedCard => {
      // Обновляем количество лайков
      likeCount.textContent = updatedCard.likes.length;
      // Меняем состояние кнопки лайка
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(error => {
      console.error(`Ошибка: ${error}`);
    });
}

export {createCard, handleCardDelete, handleLike};