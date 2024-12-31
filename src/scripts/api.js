const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: 'a025164f-36ef-4838-a092-66f45c7eebd1',
    'Content-Type': 'application/json'
  }
}

export const checkResponse = (result) => {
  if (result.ok) {
    return result.json()
  }
  return Promise.reject(`Ошибка ${result.status}`)
}

export const getCards = () => {
return fetch(`${config.baseUrl}/cards`, {
  method: 'GET',  
  headers: config.headers,
})
  .then(checkResponse)
  .then(result => {
    return result;
  })
}

export const likeCard = (cardId) => {
return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: "PUT",
  headers: config.headers,
})
  .then(checkResponse)
  .then(result => {
    return result;
  })
}

export const dislikeCard = (cardId) => {
return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: "DELETE",
  headers: config.headers,
})
  .then(checkResponse)
  .then(result => {
    return result;
  })
}

export const postCard = ({name, link}) => {
return fetch(`${config.baseUrl}/cards`, {
  method: "POST",
  headers: config.headers,
  body: JSON.stringify({
    name,
    link,
  }),
})
  .then(checkResponse)
  .then(result => {
    return result;
  })
}

export const deleteCards = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
  })
  .then(checkResponse)
  .then(result => {
      return result;
  })
}


export const getUser = () => {
return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
})
  .then(checkResponse)
  .then(result => {
    return result;
  })
}

export const updateAvatar = (avatar) => {
return fetch(`${config.baseUrl}/users/me/avatar`, {
  method: "PATCH",
  headers: config.headers,
  body: JSON.stringify({
    avatar
  }),
})
  .then(checkResponse)
  .then(result => {
    return result;
  })
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
  .then(checkResponse)
  .then(result => {
    return result;
  })
};