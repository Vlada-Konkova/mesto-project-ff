import { initialCards } from './cards.js';
import { getCards, postCard, getUser , updateAvatar, editProfile } from "./api.js";
import { openPopup, closePopup, closeEsc, handleOverlayClick } from './modal.js';
import { createCard, handleCardDelete, handleLike } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import logo from "../images/logo.svg";

// @todo: Используем переменные в HTML
document.querySelector(".logo").src = logo;

// @todo: Темплейт карточки
const popupButtonProfileEdit = document.querySelector('.profile__edit-button');
const popupButtonProfileAdd = document.querySelector('.profile__add-button');
const popupButtonProfileAvatar = document.querySelector('.profile__avatar-button');
const popups = document.querySelectorAll('.popup');

// Обработчик для формы создания нового аватара профиля
const popupAvatar = document.querySelector('.popup_type_avatar_edit');
const avatarForm = popupAvatar.querySelector('.popup__form');
const avatarInput = popupAvatar.querySelector(".popup__input_type_avatar");

// значение полей формы редактирования
const popupEdit = document.querySelector('.popup_type_edit');
const editForm = popupEdit.querySelector(".popup__form");
const popupEditNameInput = popupEdit.querySelector(".popup__input_type_name");
const popupEditJobInput = popupEdit.querySelector(".popup__input_type_description");

// Выберите элементы, куда должны быть вставлены значения полей редактирования
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Глобальная переменная для userId
let userId;

// @todo: Вывести данные пользователя и карточки на страницу
Promise.all([getUser (), getCards()])
  .then(([userData, cardData]) => {
    userId = userData._id; // Определяем userId здесь

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;

    cardData.forEach((item) => {
      const cardElement = createCard(
        {
          cardTitle: item.name,
          cardAlt: item.name,
          cardLink: item.link,
          cardLikeCounter: item.likes,
          cardId: item._id,
          ownerId: item.owner._id,
        },
        userId, // Используем userId здесь
        (evt) => handleLike(evt, item._id), // Функция лайка
        handleCardDelete, // Функция удаления
        handleImageClick
      );
      renderCard(cardElement);
    });
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });

// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
  placesList.prepend(cardElement);
}

// Открытие попапа для обновления аватара
popupButtonProfileAvatar.addEventListener('click', function () {
  openPopup(popupAvatar);
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
});

popupButtonProfileEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  popupEditNameInput.value = profileTitle.textContent;
  popupEditJobInput.value = profileDescription.textContent;
});

popupButtonProfileAdd.addEventListener('click', function () {
  openPopup(popupCard);
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
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
  const name = popupEditNameInput.value;
  const about = popupEditJobInput.value;
  const saveButton = popupEdit.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;
  editProfile({ name, about })
    .then((response) => {
      profileTitle.textContent = response.name;
      profileDescription.textContent = response.about;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}
editForm.addEventListener('submit', handleFormEditSubmit);

// функция добавления новой карточки
function handleAddNewCard(evt) {
  evt.preventDefault();
  const saveButton = popupCard.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  const nameSys = popupCardNameInput.value;
  const linkSys = popupCardUrlInput.value;

  postCard({ name: nameSys, link: linkSys })
    .then((result) => {
      renderCard(
        createCard(
          {
            cardTitle: result.name,
            cardAlt: result.name,
            cardLink: result.link,
            cardLikeCounter: result.likes,
            cardId: result._id,
            ownerId: result.owner._id,
          },
          userId, // Теперь userId доступен здесь
          handleCardDelete,
          (evt) => handleLike(evt, result._id),
          handleImageClick
        )
      );
      closePopup(popupCard);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}
cardForm.addEventListener('submit', handleAddNewCard);

// Обработчик для формы создания нового аватара профиля
function handleNewAvatar(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  const saveButton = popupAvatar.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;
  updateAvatar(avatarUrl)
    .then((response) => {
      profileAvatar.style.backgroundImage = `url('${response.avatar}')`; // Исправлено на правильный синтаксис
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}
avatarForm.addEventListener('submit', handleNewAvatar);

// функция открытия и закрытия изображения
function handleImageClick(evt) {
  const { src, alt } = evt.target;
  popupFullImage.src = src;
  popupFullImage.alt = alt;
  popupImageCaption.textContent = alt;
  openPopup(popupImage);
}

enableValidation(validationConfig);

export { cardTemplate };
