import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [isCard, setCard] = useState({ name: '', link: '' });
  
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log(isCard)
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(isCard);
  }

  return (
    <PopupWithForm
      name={'card-form'}
      title={'Новое место'}
      button={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
    >
      <fieldset className="popup__inputs">
        <input
          className="popup__input"
          id="place-image-name"
          type="text"
          placeholder="Название"
          defaultValue=""
          onChange={event => setCard({...isCard, name: event.target.value})}
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
          onChange={event => setCard({...isCard, link: event.target.value})}
          name="placeImageLink"
          required
        />
        <span className="popup__error" id="place-image-link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
