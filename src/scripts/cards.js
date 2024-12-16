export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const popup = document.querySelector('.popup_type_image');
const popupImage = popup.querySelector('.popup__image');
const popupCaption = popup.querySelector('.popup__caption');
const closeButton = popup.querySelector('.popup__close');

// @todo: Функция создания карточки
function createCard(cardData, onDelete, onLike, onImage) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', onLike);
  const image = cardElement.querySelector('.card__image');
  image.addEventListener('click', onImage);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', (evt) => {
    onDelete(evt); // Вызываем функцию удаления при клике
  });
  return cardElement;
}

// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
  placesList.append(cardElement);
}
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleCardDelete, handlLike, handleImageClick);
  renderCard(cardElement);
});

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

// функция открытия изображения
function handleImageClick(event) {
  popupImage.src = event.target.src;
  popupCaption.textContent = event.target.alt;
  popup.classList.add('popup_is-opened','popup_is-animated');

  popup.addEventListener('click', (evt) => {
    if (evt.target === popup){
      popup.classList.remove('popup_is-opened');
      popup.classList.add('popup_is-animated');
    }
  });

  closeButton.addEventListener('click', () => {
    popup.classList.remove('popup_is-opened');
});
}

export {cardTemplate, placesList, createCard, renderCard, handleCardDelete, handlLike, handleImageClick};