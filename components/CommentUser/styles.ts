
import { StyledProps } from '@/types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)<StyledProps>`
  flex-direction: row;
  align-items: flex-start;
  
  margin: 0 20px 8px 20px; 
`;

export const AvatarContainer = styled.View`
  margin-right: 8px;
`;

export const ContentContainer = styled.View`
  flex: 1;

`;


// Usando estilos similares aos do PostDetails
export const Name = styled.Text<StyledProps>`
  
  font-weight: 400;
  font-size: 16px;
  line-height: 21.82px;
  color: #5E6064;
  

`;

export const Username = styled.Text<StyledProps>`
  font-weight: 400;
  font-size: 14px;
  line-height: 19.1px;
  color: ${(props: StyledProps) => props.theme.colors.textLight};
`;

export const Email = styled.Text<StyledProps>`
  font-size: 14px;
  line-height: 19.1px;
  color: ${(props: StyledProps) => props.theme.colors.textLight};
  margin-top: 2px;
`;