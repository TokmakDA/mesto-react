import React from 'react';

function PopupWithForm({
  children,
  name,
  title,
  button,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
        ></button>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          
        >
          <h2 className="popup__title">{title}</h2>

          {/* Инпуты */}
          {children}

          <input
            className="popup__button"
            type="submit"
            value={button}
            required
          />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
