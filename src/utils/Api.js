class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //Загрузка информации о пользователе с сервера
  // запрос GET
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  // Загрузка карточек с сервера
  // запрос GET
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  // Редактирование профиля (Данные уходят на сервер)
  patchUserInfo(UserNameNew, UserAboutNew) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: UserNameNew,
        about: UserAboutNew,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  // Добавление новой карточки. полученный ответ нужно отрендерить на страницу
  // запрос POST
  postNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${card.name}`,
        link: `${card.link}`,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  // Удаление карточки
  // DELETE-запрос:
  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  // Постановка  лайка
  // Чтобы лайкнуть карточку, отправьте PUT-запрос:
  addLikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  // Cнятие лайка
  // Чтобы убрать лайк, нужно отправить DELETE-запрос:
  deleteLikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  // Обновление аватара пользователя (Данные уходят на сервер)
  // Запрос PATCH
  patchUserAvatar(LinkAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: LinkAvatar,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  // закгружаем первичную информацию с сервера
  getInitialsData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '0fac7cb1-5a97-4e4b-9bc6-bcf4a65057a3',
    'Content-Type': 'application/json',
  }
});

export default api;