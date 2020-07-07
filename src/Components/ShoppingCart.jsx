import React, { useDebugValue } from 'react';
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

const TotalContainer = styled.div`
  display:flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid black;
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


const Order = ({name, price, image, quantity}) => {
  return (
    <OrderContainer>
      <OrderImage>
        <Image src={image} />
      </OrderImage>
      <OrderInformationsContainer>
        <OrderInformation>{name}</OrderInformation>
        <OrderInformation>R$ {price}</OrderInformation>
        <OrderInformation>{quantity}</OrderInformation>
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


const ShoppingCart = ({orders, total}) => {
  return (
    <ShoppingCartContainer>
      <Orders>
        {orders.map((order, index) => (
          <Order
            key={index}
            name={order.name}
            price={order.price}
            image={order.image}
            quantity={order.quantity}
          />
        ))}
      </Orders>

      <TotalContainer>
        <p style={{fontSize: '18px' }}>Total</p>
        <p style={{fontSize: '18px', fontWeight: "bold"}}>R$ {total}</p>
      </TotalContainer>

      <ButtonBuy>Comprar</ButtonBuy>
    </ShoppingCartContainer>
  );
};



export default ShoppingCart;
