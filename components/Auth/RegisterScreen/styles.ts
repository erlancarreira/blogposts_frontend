import { StyledProps } from '@/types';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';

const STATUSBAR_HEIGHT = getStatusBarHeight();

export const HeaderTitle = styled.Text<StyledProps>`
  font-size: 16px;
  font-weight: 700;
  line-height: 21.82px;
  
`;

export const HeaderContainer = styled.View<StyledProps>`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  
 
  background-color: #FFFFFF;
  
  margin-top: ${STATUSBAR_HEIGHT}px;
`;

export const HeaderContainerTitle = styled.View<StyledProps>`
  padding: 20px 16px;
  flex-direction: row;
`;

export const Container = styled.View<StyledProps>`
  flex: 1;
  border-top-width: 1px;
  border-color: #0000000A;
  background-color: #FFFFFF;
  justify-content: center;
  padding: 20px;
  justify-content: flex-start;
  
`;

export const Title = styled.Text<StyledProps>`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

export const FormContainer = styled.View<StyledProps>`
  width: 100%;
`;

export const Label = styled.Text<StyledProps>`
  font-size: 16px;
  line-height: 21.82px;
  font-weight: 400;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#A9AEB7",
})<StyledProps>`
  background-color: #EFF1F5;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  gap: 10px;
  font-size: 14px;
  line-height: 19.1px;
  font-weight: 400;
  color: #000; /* Define a cor do texto */
`;

export const LoginButton = styled.TouchableOpacity<StyledProps>`
  background-color: #0F90D9;
  border-radius: 40px;
  padding: 12px;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;

export const LoginButtonText = styled.Text<StyledProps>`
  color: #FFFFFF;
 
  font-weight: 700;
  font-size: 16px;
  line-height: 21.82px;
  

`;

export const CreateAccountButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 20px;
`;

export const CreateAccountText = styled.Text<StyledProps>`
  color: #0094D8;
  font-size: 16px;
`;

export const ErrorText = styled.Text<StyledProps>`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;
