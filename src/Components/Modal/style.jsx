import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Box = styled.div`
  position: relative;
  padding: 42px;
  width: 30%;
  min-width: 300px;
  background-color: white;
`;

export const Message = styled.p`
  font-size: 42px;
  font-weight: bold;
  color: #3D7DCA;
`;

export const CloseButton = styled.button`
  position: absolute;
  width: 42px;
  height: 42px;
  top: -10px;
  right: -10px;
  font-size: 18px;
  font-weight: bold;
  background-color: #FFCB05;
  border-radius: 50%;
  border-style: none;
  outline: none;
  cursor: pointer;
`;
