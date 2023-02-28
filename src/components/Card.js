import React from 'react';

function Card(props) {

  function handleClick(card) {
    props.onCardClick(card);
  }

  return (
    <li className="card">
      <button className="card__trash" type="button"></button>
      <img
        className="card__image"
        src={props.link}
        alt={props.name}
        onClick={() => handleClick(props)}
      />
      <div className="card__caption">
        <h2 className="card__mane-card">{props.name}</h2>
        <div className="card__like">
          <button className="card__like-button" type="button"></button>
          <span className="care__like-quantity">{props.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
