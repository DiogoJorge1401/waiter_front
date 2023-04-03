import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 0.75rem;

  > img {
    width: 3.5rem;
    height: 3rem;

    object-fit: cover;
    border-radius: 0.375rem;
  }
`;

export const ProductDetails = styled.div`
  display: flex;
  gap: 0.5rem;

  span {
    color: #666;
    font-size: 0.875rem;
    font-weight: 400;
  }

  .product-info {
    display: flex;
    flex-direction: column;

    strong {
      font-weight: 600;
      color: #333;
    }
  }
`;
