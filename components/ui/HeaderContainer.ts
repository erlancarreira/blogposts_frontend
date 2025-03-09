import { StyledProps } from '@/types';
import styled from 'styled-components/native';

const HeaderContainer = styled.View<StyledProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export default HeaderContainer;