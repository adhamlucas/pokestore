import React from 'react';
import styled from 'styled-components';
import { FiMinusCircle, FiPlusCircle, FiShoppingCart } from 'react-icons/fi';

const ShoppingCartContainer = styled.div`
  width: 20%;
  height: 20%;
  background-color: white;
`;

const Orders = styled.div`
`;

const ShoppingCartTitle = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
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

const Text = styled.div`
  font-size: ${(props) => (props.title ? '32px' : '18px')};
  font-weight: ${(props) => ((props.price || props.title) ? 'bold' : '500')}
`;


const Order = ({
  id,
  name,
  price,
  image,
  quantity,
  plusPokemonOrderQuantity,
  minusPokemonOrderQuantity,
}) => {
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
        <Button onClick={() => plusPokemonOrderQuantity(id)}>
          <FiPlusCircle size="30px" />
        </Button>
        <Button onClick={() => minusPokemonOrderQuantity(id)}>
          <FiMinusCircle size="30px" />
        </Button>
      </OrderButtonsContainer>
    </OrderContainer>
  );
};


const ShoppingCart = ({orders, total, plusPokemonOrderQuantity, minusPokemonOrderQuantity, endShopping}) => {
  return (
    <ShoppingCartContainer>
      <ShoppingCartTitle>
        <Text title="true">Carrinho</Text>
        <FiShoppingCart size='24px'/>
      </ShoppingCartTitle>
      <Orders>
        {orders.map((order) => (
          <Order
            key={order.id}
            id={order.id}
            name={order.name}
            price={order.price}
            image={order.image}
            quantity={order.quantity}
            plusPokemonOrderQuantity={plusPokemonOrderQuantity}
            minusPokemonOrderQuantity={minusPokemonOrderQuantity}
          />
        ))}
      </Orders>

      <TotalContainer>
        <Text>Total</Text>
        <Text price>R$ {total}</Text>
      </TotalContainer>

      <ButtonBuy onClick={() => endShopping()}>Comprar</ButtonBuy>
    </ShoppingCartContainer>
  );
};

export default ShoppingCart;
