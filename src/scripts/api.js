const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: 'a025164f-36ef-4838-a092-66f45c7eebd1',
    'Content-Type': 'application/json'
  }
}

const getResponseData = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(getResponseData);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(getResponseData);
}

export const editProfile = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  })
  .then(getResponseData);
};

export const postCard = ({name, link}) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
  .then(getResponseData);
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(getResponseData);
}

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(getResponseData);
}

export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(getResponseData);
}

export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar
    }),
  })
  .then(getResponseData);
}