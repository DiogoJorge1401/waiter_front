import { Boards } from './components/Boards';
import { Header } from './components/Header';
import { GlobalStyles } from './styles/GlobalStyles';

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Boards />
    </>
  );
};
