import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import socketIo from 'socket.io-client';
import { app } from '../api/app';
import { BASE_URL } from '../configs/envs';
import { Order } from '../types/Order';

enum OrderStatus {
  WAITING = 'WAITING',
  IN_PRODUCTION = 'IN_PRODUCTION',
  DONE = 'DONE',
}

interface IOrderContext {
  waitingOrders: Order[];
  inProductionOrders: Order[];
  doneOrders: Order[];
  isLoadingOrders: boolean;
  removeOrder: (orderId: string) => void;
  setIsLoadingOrders: (isFetching: boolean) => void;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const initialState = {
  waitingOrders: [],
  inProductionOrders: [],
  doneOrders: [],
} as unknown as IOrderContext;

const OrderContext = createContext<IOrderContext>(initialState);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const waitingOrders = orders.filter(
    ({ status }) => status === OrderStatus.WAITING
  );
  const inProductionOrders = orders.filter(
    ({ status }) => status === OrderStatus.IN_PRODUCTION
  );
  const doneOrders = orders.filter(({ status }) => status === OrderStatus.DONE);

  const getOrders = async () => {
    setIsLoadingOrders(true);

    try {
      const {
        data: { orders },
      } = await app.get<{ orders: Order[] }>('/orders');

      setOrders(orders);
    } catch (error) {
      console.error(error);
    }

    setIsLoadingOrders(false);
  };

  const removeOrder = (orderId: string) => {
    const newOrders = orders.filter((order) => order._id !== orderId);

    setOrders(newOrders);
  };

  useEffect(() => {
    const socket = socketIo(BASE_URL, {
      transports: ['websocket'],
    });

    socket.on('newOrder', (order: Order) => {
      setOrders((prevOrders) => prevOrders.concat(order));
    });
  }, []);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        waitingOrders,
        inProductionOrders,
        doneOrders,
        isLoadingOrders,
        removeOrder,
        setIsLoadingOrders,
        setOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
