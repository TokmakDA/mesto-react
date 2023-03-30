import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [isValues, setValues] = useState({ name: '', link: '' });
  
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log(isValues)
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(isValues);

    // setValues({...isValues, name: '', link: ''})
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
          value={isValues.name}
          onChange={event => setValues({...isValues, name: event.target.value})}
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
          value={isValues.link}
          onChange={event => setValues({...isValues, link: event.target.value})}
          name="placeImageLink"
          required
        />
        <span className="popup__error" id="place-image-link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
