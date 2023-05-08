import { Boards } from './components/Boards';
import { Header } from './components/Header';
import { OrderProvider } from './contexts/Order';
import { GlobalStyles } from './styles/GlobalStyles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <ToastContainer />
      <Header />
      <OrderProvider>
        <Boards />
      </OrderProvider>
    </>
  );
};
