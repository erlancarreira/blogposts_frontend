import styled from 'styled-components/native';

import { StyledProps } from '@/types';


const Container = styled.View<StyledProps>`
  flex: 1;
  background-color: ${(props: StyledProps) => props.theme.colors.background};
  padding: 12px;
`;

export default Container;