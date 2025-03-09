import { StyledProps } from '@/types';
import styled from 'styled-components/native';

const DefaultHeaderTitle = styled.Text<StyledProps>`
  font-size: 24px;
  font-weight: 400;
  color: ${(props: StyledProps) => props.theme.colors.headTitle};
`;

export default DefaultHeaderTitle;