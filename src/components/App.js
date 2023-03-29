import React, { useEffect, useState } from 'react';

import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isSelectedCard, setSelectedCard] = useState(null);

  const [isCards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   api
  //     .getUserInfo()
  //     .then((res) => setCurrentUser(res))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    api
      .getInitialsData()
      .then(([UserInfo, initialCards]) => {
        setCurrentUser(UserInfo);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //обработчик лайков и дизлайков
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .addLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
          console.log(`Лайкнул ${card._id}`);
          console.log(newCard);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
          console.log(`Лайк снят ${card._id}`);
          console.log(newCard);
        })
        .catch((err) => console.log(err));
    }
  }
  //обработчик удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />

        <Main
          onEditAvatar={() => handleEditAvatarClick()}
          onEditProfile={() => handleEditProfileClick()}
          onAddPlace={() => handleAddPlaceClick()}
          onCardClick={handleCardClick}
          onCardLike={(card) => handleCardLike(card)}
          isCards={isCards}
          onCardDelete={(card) => handleCardDelete(card)}
        />

        <Footer />

        <PopupWithForm
          name={'profile-avatar-form'}
          title={'Обновить аватар'}
          button={'Сохранить'}
          isOpen={isEditAvatarPopupOpen}
          onClose={() => closeAllPopups()}
        >
          <fieldset className="popup__inputs">
            <input
              className="popup__input"
              id="profile-avatar-link"
              type="url"
              placeholder="Введите ссылку на аватарку"
              defaultValue=""
              name="profileAvatarLink"
              required
            />
            <span
              className="popup__error"
              id="profile-avatar-link-error"
            ></span>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name={'profile-form'}
          title={'Редактировать профиль'}
          button={'Сохранить'}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__inputs">
            <input
              className="popup__input"
              id="profile-name"
              placeholder="Имя"
              defaultValue="Жак-Ив Кусто"
              name="profileName"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__error" id="profile-name-error"></span>
            <input
              className="popup__input"
              id="profile-job"
              type="text"
              placeholder="О себе"
              defaultValue="Исследователь океана"
              name="profileJob"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__error" id="profile-job-error"></span>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name={'card-form'}
          title={'Новое место'}
          button={'Сохранить'}
          isOpen={isAddPlacePopupOpen}
          onClose={() => closeAllPopups()}
        >
          <fieldset className="popup__inputs">
            <input
              className="popup__input"
              id="place-image-name"
              type="text"
              placeholder="Название"
              defaultValue=""
              name="placeImageName"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__error" id="place-image-name-error"></span>
            <input
              className="popup__input"
              id="place-image-link"
              type="url"
              placeholder="Ссылка на картинку"
              defaultValue=""
              name="placeImageLink"
              required
            />
            <span className="popup__error" id="place-image-link-error"></span>
          </fieldset>
        </PopupWithForm>

        <ImagePopup
          {...isSelectedCard}
          isOpen={isSelectedCard}
          onClose={() => closeAllPopups()}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
