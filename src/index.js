import './pages/index.css';
import './scripts/cards.js';
import {openModal, closeModal, closeEsc, handleOverlayClick, initializeModal} from './scripts/modal.js';
import { createCard, handleCardDelete, handleLike} from './scripts/card.js';
import { enableValidation , clearValidation } from './scripts/validation.js';
import {getUser, getInitialCards, editProfile, postCard, updateAvatar} from './scripts/api.js';

// @todo: Темплейт карточки
const popupButtonProfileEdit = document.querySelector('.profile__edit-button');
const popupButtonProfileAdd = document.querySelector('.profile__add-button');
const popupButtonProfileAvatar = document.querySelector('.profile__avatar-button');
const popups = document.querySelectorAll('.popup');
// значение полей формы редактирования
const popupEdit = document.querySelector('.popup_type_edit');
const editForm = popupEdit.querySelector('.popup__form');
const popupEditNameInput = popupEdit.querySelector('.popup__input_type_name');
const popupEditJobInput = popupEdit.querySelector('.popup__input_type_description');
// Выберите элементы, куда должны быть вставлены значения полей редактирования
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
// значения полей формы добавления карточки
const popupCard = document.querySelector('.popup_type_new-card');
const cardForm = popupCard.querySelector('.popup__form');
const popupCardNameInput = popupCard.querySelector('.popup__input_type_card-name');
const popupCardUrlInput = popupCard.querySelector('.popup__input_type_url');
// элементы изображения

const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const popupFullImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
// значение полей формы редактирования аватара
const popupAvatar = document.querySelector('.popup_type_avatar_edit');
const avatarForm = popupAvatar.querySelector('.popup__form');
const avatarInput = popupAvatar.querySelector(".popup__input_type_avatar");


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let userId;
// @todo: Вывести данные пользователя и карточки на страницу
Promise.all([getUser (), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;

    // Вывод данных пользователя в консоль
    // console.log('Данные пользователя:', userData);
    // console.log('Данные карточек:', cards);

    // Вывести карточки на страницу
    cards.forEach(card => {
      const cardElement = createCard(card, userId, handleCardDelete, handleLike, handleImageClick);
      renderCard(cardElement);
    });
  })
  .catch(error => {
    console.error(`Ошибка: ${error}`);
  });

// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
  placesList.append(cardElement);
}

popupButtonProfileAvatar.addEventListener('click', () => {
  openModal(popupAvatar);
  avatarForm.reset();
  clearValidation(popupAvatar, validationConfig);
});

popupButtonProfileEdit.addEventListener('click', function () {
  openModal(popupEdit);
  clearValidation(popupEdit, validationConfig);
  popupEditNameInput.value = profileTitle.textContent;
  popupEditJobInput.value = profileDescription.textContent;
});

popupButtonProfileAdd.addEventListener('click', function () {
  openModal(popupCard);
  cardForm.reset();
  clearValidation(popupCard, validationConfig);
  // можно и таким методом
  // popupCardNameInput.value = '';
  // popupCardUrlInput.value = '';
});

popups.forEach(popup => {
  initializeModal(popup);
  popup.addEventListener('click', handleOverlayClick);

  popup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(popup);
  });
});

// Функция для изменения текста кнопки
function toggleButtonText(button, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
    button.disabled = true;
  } else {
    button.textContent = 'Сохранить';
    button.disabled = false;
  }
}

// Обработчик «отправки» формы аватара
function handleEditAvatar(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  const saveButton = avatarForm.querySelector('.popup__button');

  toggleButtonText(saveButton, true);

  updateAvatar(avatarUrl)
  .then(res => {
    profileAvatar.style.backgroundImage = `url('${res.avatar}')`
    closeModal(popupAvatar);
  })
  .catch(error => {
    console.error(`Ошибка: ${error}`);
  })
  .finally(() => {
    toggleButtonText(saveButton, false);
  });
}
avatarForm.addEventListener('submit', handleEditAvatar); 

// Обработчик «отправки» формы редактирования
function handleFormEditSubmit(evt) {
   evt.preventDefault();
   const saveButton = editForm.querySelector('.popup__button');

   toggleButtonText(saveButton, true);

   const updatedProfileData = {
    name: popupEditNameInput.value,
    about: popupEditJobInput.value,
  };

    // Отправляем обновленные данные на сервер
    editProfile(updatedProfileData)
    .then(res => {
      // Обновляем интерфейс с новыми данными
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEdit);
    })
    .catch(error => {
      console.error(`Ошибка: ${error}`);
    })
    .finally(() => {
      toggleButtonText(saveButton, false);
    });
}
editForm.addEventListener('submit', handleFormEditSubmit); 

// функция добавления новой карточки
function handleAddNewCard(evt) {
  evt.preventDefault();

  const saveButton = cardForm.querySelector('.popup__button');
  saveButton.textContent = "Сохранение..."; 
  saveButton.disabled = true; 

  const newCardData = {
    name: popupCardNameInput.value,
    link: popupCardUrlInput.value,
  };

  // Отправляем новую карточку на сервер
  postCard(newCardData)
    .then(cardData => {
      const cardElement = createCard(cardData, userId, handleCardDelete, handleLike, handleImageClick); // Передаем userId
      placesList.prepend(cardElement);
      closeModal(popupCard);
      cardForm.reset();
    })
    .catch(error => {
      console.error(`Ошибка: ${error}`);
    })
    .finally(() => {
      saveButton.textContent = "Создать"; 
      saveButton.disabled = false; 
    });
}
cardForm.addEventListener('submit', handleAddNewCard);

// функция открытия и закрытия изображения
function handleImageClick(event) {
  popupFullImage.src = event.target.src;
  popupFullImage.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openModal(popupImage);
}

enableValidation(validationConfig);