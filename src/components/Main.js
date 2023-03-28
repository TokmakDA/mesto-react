import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Card from './Card';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  isCards,
}) {
  // const [isUserName, setUserName] = useState('');
  // const [isUserDescription, setUserDescription] = useState('');
  // const [isUserAvatar, setUserAvatar] = useState('');
  // const [isCards, setCards] = useState([]);
  // const [isMyId, setMyId] = useState('');

  const currentUser = useContext(CurrentUserContext);

  // useEffect(() => {
  //   api
  //     .getInitialsData()
  //     .then(([userInfoMe, initialCards]) => {
  //       // сохраняем наш ID в переменну
  //       // Выгружаем информацию о пользователе на страницу
  //       setUserName(userInfoMe.name);
  //       setUserDescription(userInfoMe.about);
  //       setUserAvatar(userInfoMe.avatar);
  //       setMyId(userInfoMe._id);
  //       // Получаем первичный массив карточек
  //       setCards(initialCards);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   api
  //     .getInitialCards()
  //     .then((res) => setCards(res))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <main className="content page__content">
      {/* <!-- Profile --> */}
      <section className="profile content__section">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={currentUser?.avatar}
            alt="Аватар"
          />
          <button
            className="profile__avatar-edit-buttom"
            onClick={() => onEditAvatar()}
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <button
            className="profile__edit-button"
            onClick={() => onEditProfile()}
            type="button"
          ></button>
          <p className="profile__job">{currentUser?.about}</p>
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
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
