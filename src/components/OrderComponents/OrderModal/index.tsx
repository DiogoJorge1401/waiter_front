import { app } from '@/api/app';
import closeIcon from '@/assets/images/close-icon.svg';
import { Order } from '@/types/Order';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCallback, useEffect } from 'react';
import { useOrder } from '@/contexts/Order';
import { OrderProduct } from '../OrderProduct';
import {
  Actions,
  ModalBody,
  ModalBodyHeader,
  OrderDetails,
  OrderItens,
  OrderTotal,
  Overlay,
  PrimaryButton,
  SecondaryButton,
  StatusContainer,
} from './styles';
import { toast } from 'react-toastify';

type OrderModalProps = {
  isOpen: boolean;
  order: Order;
  status: string;
  icon: string;
  onRequestClose: () => void;
};

const ACTIONS = {
  WAITING: {
    emoji: '🧑‍🍳',
    text: 'Iniciar Preparo',
    nextStatus: 'IN_PRODUCTION',
  },
  IN_PRODUCTION: {
    emoji: '🚚',
    text: 'Finalizar Pedido',
    nextStatus: 'DONE',
  },
  DONE: {
    emoji: '✅',
    text: '',
    nextStatus: '',
  },
};

const ORDER_CANCELLED_MESSAGE = (table: string) =>
  `O pedido da mesa ${table} foi cancelado!`;

const ORDER_MOVED_MESSAGE = (table: string) =>
  `O pedido da mesa ${table} foi movido!`;

export const OrderModal = ({
  isOpen,
  order,
  status,
  icon,
  onRequestClose,
}: OrderModalProps) => {
  const { removeOrder, setIsLoadingOrders, setOrders, isLoadingOrders } =
    useOrder();

  if (!isOpen) return null;

  const totalPrice = order.products.reduce(
    (acc, { product, quantity }) => acc + quantity * product.price,
    0
  );

  const handleCancelOrder = useCallback(async () => {
    setIsLoadingOrders(true);

    await app.delete(`/orders/${order._id}`);

    setIsLoadingOrders(false);

    removeOrder(order._id);

    onRequestClose();

    toast.success(ORDER_CANCELLED_MESSAGE(order.table), {
      position: 'bottom-center',
    });
  }, [order._id, order.table, onRequestClose, removeOrder]);

  const handleChangeStatus = useCallback(
    async (status: Order['status']) => {
      const nextStatus = ACTIONS[status].nextStatus as Order['status'];

      setIsLoadingOrders(true);

      await app.patch(`/orders/${order._id}`, { status: nextStatus });

      setOrders((orders) =>
        orders.map((o) =>
          o._id === order._id ? { ...o, status: nextStatus } : o
        )
      );

      setIsLoadingOrders(false);

      onRequestClose();

      toast.success(ORDER_MOVED_MESSAGE(order.table), {
        position: 'bottom-center',
      });
    },
    [onRequestClose, order._id, order.table]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onRequestClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRequestClose]);

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
          <PrimaryButton
            disabled={order.status === 'DONE' || isLoadingOrders}
            onClick={() => handleChangeStatus(order.status)}
          >
            <span>{ACTIONS[order.status].emoji}</span>
            <span>{ACTIONS[order.status].text}</span>
          </PrimaryButton>

          {order.status !== 'DONE' && (
            <SecondaryButton
              onClick={handleCancelOrder}
              disabled={isLoadingOrders}
            >
              Cancelar Pedido
            </SecondaryButton>
          )}
        </Actions>
      </ModalBody>
    </Overlay>
  );
};
