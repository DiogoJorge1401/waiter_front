import { doneOrders, inProductionOrders, waitingOrders } from '@/mocks';
import { OrderBoard } from '../OrderComponents/OrderBoard';
import { Container } from './styles';

export const Boards = () => {
  return (
    <Container>
      <OrderBoard icon="🕒" title="Fila de espera" orders={waitingOrders} />
      <OrderBoard icon="🧑‍🍳" title="Em preparo" orders={inProductionOrders} />
      <OrderBoard icon="🚚" title="Feito" orders={doneOrders} />
    </Container>
  );
};
