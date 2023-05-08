import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  border: 1px solid rgba(204, 204, 204, 0.5);
  border-radius: 1rem;
`;

export const BoardHeader = styled.header`
  padding: 0.5rem;

  font-size: 0.875rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const OrderContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const CardButton = styled.button`
  height: 8rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  background: #fff;

  border-radius: 0.5rem;
  border: 1px solid rgba(204, 204, 204, 0.5);

  strong {
    font-weight: 500;
  }

  span {
    font-weight: 400;
    font-size: 0.875rem;
    color: #666;
  }
`;
