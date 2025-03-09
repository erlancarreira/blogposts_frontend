import { StyledProps } from '@/types';
import { TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';

const STATUSBAR_HEIGHT = getStatusBarHeight();

export const Container = styled.View<StyledProps>`
  flex: 1;
  background-color: ${(props: StyledProps) => props.theme.colors.light};
  
`;

export const Label = styled.Text<StyledProps>`
  font-weight: 400;
  font-size: 16px;
  line-height: 21.82px;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput.attrs<StyledProps>((props: StyledProps) => ({
    placeholderTextColor: props.theme.colors.input.placeholder
  }))`
    background-color: ${(props: StyledProps) => props.theme.colors.background};
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    color: ${(props: StyledProps) => props.theme.colors.text};
    font-size: 14px;
`;

export const TextArea = styled.TextInput.attrs<StyledProps>((props: StyledProps) => ({
    placeholderTextColor: props.theme.colors.input.placeholder
  }))`
    background-color: ${(props: StyledProps) => props.theme.colors.background};
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    min-height: 280px;
    color: ${(props: StyledProps) => props.theme.colors.text};
    font-size: 14px;
`;

export const SubmitButton = styled.TouchableOpacity<StyledProps>`
  background-color: #0f90d9;
  border-radius: 30px;
  padding: 14px;
  margin-bottom: 12px;
  flex: 1;
  flex-direction: row;  
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text<StyledProps>`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export const SubmitButtonContainer = styled.TouchableOpacity<StyledProps>`
  background-color: ${(props: StyledProps) => props.theme.colors.backgroundLight};
  position: absolute;
  z-index: 4;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-width: 1px;
  border-top-color: #eee;
  padding: 10px 16px;
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled(TouchableOpacity)`
  margin-right: 16px;
`;


export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

export const HeaderRight = styled.View`
  width: 24px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  
  margin-bottom: 16px;
  
  margin-top: ${STATUSBAR_HEIGHT}px;
`;

export const FormContainer = styled.View<StyledProps>`
  padding: 0 16px;
`;






