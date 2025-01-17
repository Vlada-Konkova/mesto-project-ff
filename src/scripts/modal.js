// Функция для инициализации анимации
function initAnimation(popupElement) {
  popupElement.classList.add('popup_is-animated');
}

// Функция для инициализации модального окна
export function initializeModal(popupElement) {
  initAnimation(popupElement); // Добавляем класс анимации один раз
}

// @todo: Открытие модального окна
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener("keydown", closeEsc);
}

// @todo: Закрытие модального окна
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closeEsc);
}

export function closeEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

export function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  };
};