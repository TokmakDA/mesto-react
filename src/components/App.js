import React, { useEffect, useState } from 'react';

import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
// import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isSelectedCard, setSelectedCard] = useState(null);

  const [isCards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  const [isLoading, setLoading] = useState(false);

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

  // Обработчики открытия попапов
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  // обработчик открытия картинки карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Отбработчик закрытия попапов
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  // сохраняем введенные данные пользователя в Api
  function handleUpdateUser(data) {
    console.log(data);
    setLoading(true);
    api
      .patchUserInfo(data.name, data.about)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  // сохраняем Аватар пользователя в Api
  function handleUpdateAvatar(LinkAvatar) {
    console.log(LinkAvatar);
    setLoading(true);
    api
      .patchUserAvatar(LinkAvatar)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  // добавляем новую карточку
  function handleAddPlaceSubmit(data) {
    console.log(`покажи что отправляем в App ${data}`);
    setLoading(true);
    api
      .postNewCard(data)
      .then((res) => {
        console.log(res);
        setCards([res, ...isCards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  // обработчик лайков и дизлайков
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

  // обработчик удаления карточки
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
          isCards={isCards}
          onEditAvatar={() => handleEditAvatarClick()}
          onEditProfile={() => handleEditProfileClick()}
          onAddPlace={() => handleAddPlaceClick()}
          onCardClick={handleCardClick}
          onCardLike={(card) => handleCardLike(card)}
          onCardDelete={(card) => handleCardDelete(card)}
        />

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={(data) => handleUpdateAvatar(data)}
          isLoading={isLoading}

        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={(data) => handleUpdateUser(data)}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={(data) => handleAddPlaceSubmit(data)}
          isLoading={isLoading}
        />

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
