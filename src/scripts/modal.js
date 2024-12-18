// @todo: Открытие модального окна
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-animated');
  popupElement.classList.add('popup_is-opened');
  document.addEventListener("keydown", closeEsc);
}

// @todo: Закрытие модального окна
function closePopup(popupElement) {
  popupElement.classList.add('popup_is-animated');
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closeEsc);
}

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
};

export {openPopup, closePopup, closeEsc, handleOverlayClick};
