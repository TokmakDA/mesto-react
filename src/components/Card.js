import React from 'react';

function Card({ card, myId, onCardClick }) {
  function handleClick(card) {
    onCardClick(card);
  }

  return (
    <li className="card">
      <button className="card__trash" type="button"></button>
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => handleClick(card)}
      />
      <div className="card__caption">
        <h2 className="card__mane-card">{card.name}</h2>
        <div className="card__like">
          <button className="card__like-button" type="button"></button>
          <span className="care__like-quantity">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
