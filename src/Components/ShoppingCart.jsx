import React from 'react';
import styled from 'styled-components';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

const ShoppingCartContainer = styled.div`
  width: 20%;
  height: 20%;
  background-color: white;
`;

const Orders = styled.div`
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  margin: 8px;
`;

const OrderImage = styled.div`
  height: 30px;
  width: 30px;
`;

const Image = styled.img`
  widht: 100%;
  height: 100%;
`;

const OrderInformationsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  margin: 0px 8px;
`;

const OrderInformation = styled.p`
  font-size: 18px;
`;

const OrderButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
  align-items: center;
`;

const Button = styled.div`
  border-style: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const ButtonBuy = styled.button`
  width: 100%;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #3D7DCA;
  border-style: none;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;


// <div className="shopping-cart">
// <div className="orders">
//   <div className="order">
//     <div className="order-image">
//       <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" alt="colocar o nome do pokemon" />
//     </div>
//     <div className="order-informations">
//       <p className="order-name">Ditto</p>
//       <p className="order-quantity">1</p>
//       <p className="order-price">R$ 40,00</p>
//     </div>

//     <div className="order-buttons">
//       <button type="button" className="order-plus">+</button>
//       <button type="button" className="order-minus">-</button>
//     </div>
//   </div>
// </div>

// <div className="order-total">
//   <p>Total</p>
//   <p className="order-total-price">R$ 40,00</p>
// </div>

// <button type="button" className="order-button-buy">
//   Comprar
// </button>
// </div>

const Order = () => {
  return (
    <OrderContainer>
      <OrderImage>
        <Image src="https://pokeres.bastionbot.org/images/pokemon/3.png" />
      </OrderImage>
      <OrderInformationsContainer>
        <OrderInformation>Bulbassaur</OrderInformation>
        <OrderInformation>R$ 40,00</OrderInformation>
        <OrderInformation>1</OrderInformation>
      </OrderInformationsContainer>

      <OrderButtonsContainer>
        <Button>
          <FiPlusCircle size="30px" />
        </Button>
        <Button>
          <FiMinusCircle size="30px" />
        </Button>
      </OrderButtonsContainer>
    </OrderContainer>
  );
};


const ShoppingCart = () => {
  return (
    <ShoppingCartContainer>
      <Orders>
        <Order />
        <Order />
        <Order />
        <Order />
      </Orders>
      <ButtonBuy>Comprar</ButtonBuy>
    </ShoppingCartContainer>
  );
};

export default ShoppingCart;
