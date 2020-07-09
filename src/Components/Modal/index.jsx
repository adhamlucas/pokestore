import React from 'react';
import {
  ModalContainer,
  BoxContainer,
  Message,
  Box,
  CloseButton,
} from './style';

const Modal = ({ hideModal }) => {

  return (
    <ModalContainer>
      <BoxContainer>
        <Box>
          <Message>Obrigado, volte sempre!</Message>
          <CloseButton onClick={hideModal()}>X</CloseButton>
        </Box>
      </BoxContainer>
    </ModalContainer>
  );
};

export default Modal;
