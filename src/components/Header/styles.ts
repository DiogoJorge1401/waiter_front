import styled from 'styled-components';

export const Container = styled.header`
  height: 12.375rem;
  padding: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #d73035;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
`;

export const Content = styled.div`
  width: 100%;
  max-width: 76rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  color: #fff;

  h1 {
    font-size: 2rem;
    font-weight: 600;
  }

  h2 {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.9;
  }
`;
