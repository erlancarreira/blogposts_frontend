import { StyledProps } from '@/types';
import styled from 'styled-components/native';

const Title = styled.Text<StyledProps>`
  font-size: 24px;
  font-weight: 400;
  color: ${(props: StyledProps) => props.theme.colors.headTitle};
`;

export default Title;