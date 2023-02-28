import React, { useEffect, useState } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [isUserName, setUserName] = useState('');
  const [isUserDescription, setUserDescription] = useState('');
  const [isUserAvatar, setUserAvatar] = useState('');
  const [isCards, setCards] = useState([]);
  const [isMyId, setMyId] = useState('');

  useEffect(() => {
    api
      .getInitialsData()
      .then(([userInfoMe, initialCards]) => {
        // сохраняем наш ID в переменну
        // Выгружаем информацию о пользователе на страницу
        setUserName(userInfoMe.name);
        setUserDescription(userInfoMe.about);
        setUserAvatar(userInfoMe.avatar);
        setMyId(userInfoMe._id);
        // Получаем первичный массив карточек
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content page__content">
      {/* <!-- Profile --> */}
      <section className="profile content__section">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={isUserAvatar}
            alt="Аватар"
          />
          <button
            className="profile__avatar-edit-buttom"
            onClick={() => onEditAvatar()}
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{isUserName}</h1>
          <button
            className="profile__edit-button"
            onClick={() => onEditProfile()}
            type="button"
          ></button>
          <p className="profile__job">{isUserDescription}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={() => onAddPlace()}
          type="button"
        ></button>
      </section>

      {/* <!-- Cards --> */}
      <section className="content__section">
        <ul className="cards">
          {isCards.map((card) => (
            <Card
              key={card._id}
              card={card}
              myId={isMyId}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
