import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Theme } from '@/context/ThemeContext';

type StyledProps = {
  theme: Theme;
}

export const FloatingButton = styled.TouchableOpacity<StyledProps>`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  padding: 12px;
  gap: 10px;
  border-radius: 38px;
  background-color: #0F90D9;
  justify-content: center;
  align-items: center;
  elevation: 5;
  ${Platform.OS === 'ios' ? 'shadow-opacity: 0.3; shadow-radius: 3px; shadow-color: #000; shadow-offset: 0px 2px;' : ''}
`;