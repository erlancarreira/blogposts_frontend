import styled from 'styled-components/native';

import { StyledProps } from '@/types';

const EmptyText = styled.Text<StyledProps>`  
  text-align: center;
  margin-top: 40px;
  font-size: 16px;
  color: ${(props: StyledProps) => props.theme.colors.textLight};
`;

export default EmptyText;