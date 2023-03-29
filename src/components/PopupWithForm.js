import React from 'react';

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen && 'popup_is-opened'
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          onClick={props.onClose}
          type="button"
        ></button>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
          <h2 className="popup__title">{props.title}</h2>

          {props.children}

          <input
            className="popup__button"
            type="submit"
            value={props.button}
            required
          />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
