import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  width: 250px;
  padding: 8px;
`;

const ItemContent = styled.div`
  padding: 8px;
  border-radius: 4px;
  background-color: white;
`;

const ItemImage = styled.div`
  width: auto;
  text-align: center;
  height: 200px;
  padding: 16px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ItemName = styled.p`
  font-size: 16px;
  margin: 8px 0;
`;

const ItemPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
`;

const ItemBuyBytton = styled.button`
  width: 100%;
  height: 32px;
  border-style: none;
  background-color: #3D7DCA;
  font-size: 18px;
  font-weight: 500px;
  color: white;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
`;

const Card = ({name, price, image }) => {
  return (
    <Item>
      <ItemContent>
        <ItemImage>
          <Image src={image} />
        </ItemImage>
        <div>
          <ItemName>{name}</ItemName>
          <ItemPrice>R$ {price}</ItemPrice>
        </div>
        <ItemBuyBytton>Comprar</ItemBuyBytton>
      </ItemContent>
    </Item>
  );
};

export default Card;
