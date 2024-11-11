// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(card) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  placesList.append(cardElement);

return cardElement;
}

// @todo: Функция удаления карточки

placesList.addEventListener('click', function (event){
  const target = evt.target;
  const card = target.closest('.card');
  card.remove();
})

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(card => {
  createCard(card);
  });
  }

  renderCards();