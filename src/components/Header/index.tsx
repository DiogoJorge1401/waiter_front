import { Container, Content, HeaderDetails } from './styles';
import logo from '@/assets/images/logo.svg';

export const Header = () => {
  return (
    <Container>
      <Content>
        <HeaderDetails>
          <h1>Pedidos</h1>

          <h2>Acompanhe os pedidos dos clientes</h2>
        </HeaderDetails>
        <img src={logo} alt="RAPIDSERVE" />
      </Content>
    </Container>
  );
};
