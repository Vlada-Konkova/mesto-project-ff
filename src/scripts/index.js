import { initialCards} from './cards.js';
import {openPopup, closePopup, closeEsc, handleOverlayClick} from './modal.js';
import {cardTemplate, placesList, createCard, renderCard, handleCardDelete, handlLike, handleImageClick} from './cards.js';

// @todo: Темплейт карточки

const popupButtonEdit = document.querySelector('.profile__edit-button');
const popupButtonAdd = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const formElement = document.querySelector('.popup__form');
// значение полей формы редактирования
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
// Выберите элементы, куда должны быть вставлены значения полей редактирования
const titleName = document.querySelector(".profile__title");
const titleType = document.querySelector(".profile__description");
// значения полей формы добавления карточки
const cardPopup = document.querySelector('.popup_type_new-card');
const cardInput = cardPopup.querySelector(".popup__input_type_card-name");
const urlInput = cardPopup.querySelector(".popup__input_type_url");

popupButtonEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  nameInput.value = titleName.textContent;
  jobInput.value = titleType.textContent;
});

popupButtonAdd.addEventListener('click', function () {
  openPopup(popupAdd);
  cardInput.value = '';
  urlInput.value = '';
});

popups.forEach(popup => {
  popup.addEventListener('click', handleOverlayClick);
});

// Обработчик «отправки» формы редактирования
function handleFormSubmit(evt) {
   evt.preventDefault();
  titleName.textContent = nameInput.value;
  titleType.textContent = jobInput.value;
  popupEdit.querySelector('.popup__button').addEventListener('click', handleFormSubmit);
  closePopup(popupEdit);
}
formElement.addEventListener('submit', handleFormSubmit); 

// функция добавления новой карточки
function newCard(evt) {
  evt.preventDefault();

  const initialCard = [];
  initialCard.name = cardInput.value;
  initialCard.link = urlInput.value;

  cardPopup.addEventListener('submit', newCard);
  const cardElement = createCard(initialCard, handleCardDelete, handlLike, handleImageClick);
  placesList.prepend(cardElement);
  closePopup(popupAdd);
}

popupAdd.querySelector('.popup__button').addEventListener('click', newCard);