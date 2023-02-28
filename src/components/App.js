import React, { useState } from 'react';

import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isSelectedCard, setSelectedCard] = useState(null);

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

  return (
    <div className="App">
      <Header />

      <Main
        onEditAvatar={() => handleEditAvatarClick()}
        onEditProfile={() => handleEditProfileClick()}
        onAddPlace={() => handleAddPlaceClick()}
        onCardClick={handleCardClick}
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
          <span className="popup__error" id="profile-avatar-link-error"></span>
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
  );
}

export default App;
