import logo from '../../assets/logo.svg';

import { Wrapper, Container } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Wrapper>
      <Container>
        <img src={logo} alt="dt money" />

        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Container>
    </Wrapper>
  );
}
