import { useState } from 'react';
import { Order } from '@/types/Order';
import { OrderModal } from '../OrderModal';
import { Container, BoardHeader, CardButton, OrderContainer } from './styles';

type OrderBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
};

export const OrderBoard = ({ icon, title, orders }: OrderBoardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState<Order>({} as Order);

  const handleClickToOpenOrderModal = (order: Order) => {
    setOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setOrder({} as Order);
    setIsModalOpen(false);
  };

  return (
    <Container>
      <BoardHeader>
        <span>{icon}</span>

        <strong>{title}</strong>

        <span>( {orders.length} )</span>
      </BoardHeader>

      <OrderContainer>
        {orders.map((order) => (
          <CardButton
            key={order._id}
            onClick={() => handleClickToOpenOrderModal(order)}
          >
            <strong>Mesa {order.table}</strong>

            <span>{order.products.length} itens</span>
          </CardButton>
        ))}
      </OrderContainer>

      <OrderModal
        isOpen={isModalOpen}
        order={order}
        status={title}
        icon={icon}
        onRequestClose={handleCloseOrderModal}
      />
    </Container>
  );
};
