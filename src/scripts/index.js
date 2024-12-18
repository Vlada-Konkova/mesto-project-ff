import { initialCards} from './cards.js';
import {openPopup, closePopup, closeEsc, handleOverlayClick} from './modal.js';
import { createCard, handleCardDelete, handlLike} from './card.js';

// @todo: Темплейт карточки
const popupButtonProfileEdit = document.querySelector('.profile__edit-button');
const popupButtonProfileAdd = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
// значение полей формы редактирования
const popupEdit = document.querySelector('.popup_type_edit');
const EditForm = popupEdit.querySelector(".popup__form");
const popupEditNameInput = popupEdit.querySelector(".popup__input_type_name");
const popupEditJobInput = popupEdit.querySelector(".popup__input_type_description");
// Выберите элементы, куда должны быть вставлены значения полей редактирования
const profileTitle = document.querySelector(".profile__title");
const descriptionTitle = document.querySelector(".profile__description");
// значения полей формы добавления карточки
const popupCard = document.querySelector('.popup_type_new-card');
const cardForm = popupCard.querySelector(".popup__form");
const popupCardNameInput = popupCard.querySelector(".popup__input_type_card-name");
const popupCardUrlInput = popupCard.querySelector(".popup__input_type_url");
// элементы изображения
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const popupFullImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
  placesList.append(cardElement);
}
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleCardDelete, handlLike, handleImageClick);
  renderCard(cardElement);
});

popupButtonProfileEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  popupEditNameInput.value = profileTitle.textContent;
  popupEditJobInput.value = descriptionTitle.textContent;
});

popupButtonProfileAdd.addEventListener('click', function () {
  openPopup(popupCard);
  cardForm.reset();
  // можно и таким методом
  // popupCardNameInput.value = '';
  // popupCardUrlInput.value = '';
});

popups.forEach(popup => {
  popup.addEventListener('click', handleOverlayClick);

  popup.querySelector('.popup__close').addEventListener('click', () => {
    closePopup(popup);
  });
});

// Обработчик «отправки» формы редактирования
function handleFormEditSubmit(evt) {
   evt.preventDefault();
  profileTitle.textContent = popupEditNameInput.value;
  descriptionTitle.textContent = popupEditJobInput.value;
  popupEdit.querySelector('.popup__button').addEventListener('submit', handleFormEditSubmit);
  closePopup(popupEdit);
}
EditForm.addEventListener('submit', handleFormEditSubmit); 

// функция добавления новой карточки
function newCard(evt) {
  evt.preventDefault();

  const initialCard = [];
  initialCard.name = popupCardNameInput.value;
  initialCard.link = popupCardUrlInput.value;
 
  const cardElement = createCard(initialCard, handleCardDelete, handlLike, handleImageClick);
  placesList.prepend(cardElement);
  closePopup(popupCard);
}
cardForm.addEventListener('submit', newCard);

// функция открытия и закрытия изображения
function handleImageClick(event) {
  popupFullImage.src = event.target.src;
  popupFullImage.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openPopup(popupImage);
}

export {cardTemplate};