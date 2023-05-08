import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);

  cursor: pointer;
`;

export const ModalBody = styled.div`
  width: 31.25rem;
  max-height: 31.25rem;
  height: 100%;

  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  background: #fff;
  border-radius: 0.5rem;

  cursor: auto;
`;

export const ModalBodyHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > strong {
    font-weight: 600;
    font-size: 1.5rem;
  }

  > button {
    line-height: 0;
    background: transparent;
    border: 0;
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  > small {
    font-size: 0.875rem;
    opacity: 0.8;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    > strong {
      font-weight: 600;
    }
  }
`;

export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const OrderItens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > strong {
    font-weight: 500;
    font-size: 0.875rem;
    opacity: 0.8;
  }
`;

export const OrderTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > span {
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0.8;
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  > button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  background: #333;
  color: #fff;
  font-weight: 600;

  border: 0;
  border-radius: 3rem;

  transition: 200ms ease-in-out;

  :hover {
    background: #222;
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;

  background: transparent;
  color: #d73035;
  font-weight: 600;

  border: 0;
  transition: 200ms ease-in-out;

  :hover {
    color: #b52b2b;
  }
`;
