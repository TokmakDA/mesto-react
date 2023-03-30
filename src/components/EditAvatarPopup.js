import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar(avatarRef.current.value);
    
    // сбрасываем инпуты
    e.target.reset();
  }

  return (
    <PopupWithForm
      name={'profile-avatar-form'}
      title={'Обновить аватар'}
      button={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
      isLoading={isLoading}
    >
      <fieldset className="popup__inputs">
        <input
          className="popup__input"
          id="profile-avatar-link"
          type="url"
          placeholder="Введите ссылку на аватарку"
          defaultValue=""
          ref={avatarRef}
          name="profileAvatarLink"
          required
        />
        <span className="popup__error" id="profile-avatar-link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
