import closeIcon from '@/assets/images/close-icon.svg';
import { Order } from '@/types/Order';
import { formatCurrency } from '@/utils/formatCurrency';
import { useEffect } from 'react';
import { OrderProduct } from '../OrderProduct';
import {
  PrimaryButton,
  Actions,
  ModalBody,
  ModalBodyHeader,
  OrderDetails,
  OrderItens,
  OrderTotal,
  Overlay,
  StatusContainer,
  SecondaryButton,
} from './styles';

type OrderModalProps = {
  isOpen: boolean;
  order: Order;
  status: string;
  icon: string;
  onRequestClose: () => void;
};

export const OrderModal = ({
  isOpen,
  order,
  status,
  icon,
  onRequestClose,
}: OrderModalProps) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onRequestClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRequestClose]);

  const totalPrice = order.products.reduce(
    (acc, { product, quantity }) => acc + quantity * product.price,
    0
  );

  const actions = {
    emoji: {
      WAITING: '🧑‍🍳',
      IN_PRODUCTION: '🚚',
      DONE: '✅',
    },
    text: {
      WAITING: 'Iniciar Preparo',
      IN_PRODUCTION: 'Finalizar Pedido',
      DONE: '',
    },
  };

  return (
    <Overlay onClick={onRequestClose}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <ModalBodyHeader>
          <strong>Mesa {order.table}</strong>

          <button onClick={onRequestClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </ModalBodyHeader>

        <StatusContainer>
          <small>Status do Pedido</small>

          <div>
            <span>{icon}</span>

            <strong>{status}</strong>
          </div>
        </StatusContainer>

        <OrderDetails>
          <OrderItens>
            <strong>Produtos Selecionados</strong>

            {order.products.map(({ _id, ...data }) => (
              <OrderProduct {...data} key={_id} />
            ))}
          </OrderItens>

          <OrderTotal>
            <span>Total</span>

            <strong>{formatCurrency(totalPrice)}</strong>
          </OrderTotal>
        </OrderDetails>

        <Actions>
          <PrimaryButton disabled={order.status == 'DONE'}>
            <span>{actions.emoji[order.status]}</span>
            <span>{actions.text[order.status]}</span>
          </PrimaryButton>

          {order.status !== 'DONE' && <SecondaryButton>Cancel</SecondaryButton>}
        </Actions>
      </ModalBody>
    </Overlay>
  );
};
