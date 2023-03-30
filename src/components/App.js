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
import CardDeletePopup from './DeleteCardPopup';

function App() {
  // Стейты состояния открытия попапов
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isSelectedCard, setSelectedCard] = useState(null);
  const [isCardDeletePopupOpen, setCardDeletePopupOpen] = useState(false);
  // Стейт массива карточек
  const [isCards, setCards] = useState([]);
  // Стейт карточки для удаления
  const [isCard, SetCard] = useState(null);
  // Стейт данных пользователя
  const [currentUser, setCurrentUser] = useState(null);
  // Стейт ожидания загрузки
  const [isLoading, setLoading] = useState(false);

  // Получаем первичные данные
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
  function handleCardDeleteClick(card) {
    SetCard(card);
    setCardDeletePopupOpen(true);
  }

  // обработчик открытия попапа с картинкой карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Отбработчик закрытия попапов
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setCardDeletePopupOpen(false);
  }

  // сохраняем введенные данные пользователя в Api
  function handleUpdateUser(dataUser) {
    setLoading(true);
    api
      .patchUserInfo(dataUser)
      .then((resUser) => {
        setCurrentUser(resUser);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  // сохраняем новый аватар пользователя в Api
  function handleUpdateAvatar(linkAvatar) {
    setLoading(true);
    api
      .patchUserAvatar(linkAvatar)
      .then((resUser) => {
        setCurrentUser(resUser);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  // добавляем новую карточку 
  function handleAddPlaceSubmit(dataCard) {
    setLoading(true);
    api
      .postNewCard(dataCard)
      .then((newCard) => {
        setCards([newCard, ...isCards]);
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
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  // обработчик удаления карточки
  function handleCardDeleteSubmit(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        console.log(res.message);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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
          onCardDelete={(card) => handleCardDeleteClick(card)}
        />

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={(dataUser) => handleUpdateAvatar(dataUser)}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={(dataUser) => handleUpdateUser(dataUser)}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={(dataNewCard) => handleAddPlaceSubmit(dataNewCard)}
          isLoading={isLoading}
        />

        <ImagePopup
          {...isSelectedCard}
          isOpen={isSelectedCard}
          onClose={closeAllPopups}
        />

        <CardDeletePopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={(data) => handleCardDeleteSubmit(data)}
          isLoading={isLoading}
          card={isCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
