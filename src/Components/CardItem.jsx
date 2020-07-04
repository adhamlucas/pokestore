import React from 'react';
import './CardItem.css';

const CardItem = ({ name, price, image }) => {
  return (
    <div className="item">
      <div className="item-content">
        <div className="item-image">
          <img src={image} alt="" />
        </div>
        <div className="item-informations">
          <p className="item-name">{name}</p>
          <p className="item-price">R$ {price}</p>
        </div>
        <button className="item-buy-button" type="button">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default CardItem;
