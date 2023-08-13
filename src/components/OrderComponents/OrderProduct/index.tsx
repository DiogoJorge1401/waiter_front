import { Product } from '@/types/Order';
import { formatCurrency } from '@/utils/formatCurrency';
import { Container, ProductDetails } from './styles';
import { BASE_URL } from '@/configs/envs';

interface OrderProductProps {
  quantity: number;
  product: Product;
}

export const OrderProduct = ({ quantity, product }: OrderProductProps) => {
  return (
    <Container>
      <img
        src={`${BASE_URL}/uploads/${product.imagePath}`}
        alt={product.name}
      />

      <ProductDetails>
        <span className="product-quantity">{quantity}x</span>

        <div className="product-info">
          <strong>{product.name}</strong>

          <span>{formatCurrency(product.price)}</span>
        </div>
      </ProductDetails>
    </Container>
  );
};
