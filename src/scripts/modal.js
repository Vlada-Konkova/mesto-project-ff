// @todo: Открытие модального окна
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-animated');
  popupElement.classList.add('popup_is-opened');
  popupElement.querySelector(".popup__close").addEventListener('click', () => {
    closePopup(popupElement);
  });
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

function handleOverlayClick(e) {
  if (e.target.classList.contains('popup')) {
    e.currentTarget.classList.remove('popup_is-opened');
  };
};

export {openPopup, closePopup, closeEsc, handleOverlayClick};
