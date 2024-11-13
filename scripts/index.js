// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardData, onDelete) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', (evt) => {
    onDelete(evt); // Вызываем функцию удаления при клике
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function handleCardDelete(evt) {
  const arma = evt.target.closest('.card');
  arma.remove();
}

// @todo: Вывести карточки на страницу
function renderCard(cardElement) {
  placesList.append(cardElement);
}
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleCardDelete); // Передаем функцию удаления
  renderCard(cardElement);
});