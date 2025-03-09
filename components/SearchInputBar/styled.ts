

import { Theme } from '@/context/ThemeContext';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUSBAR_HEIGHT = getStatusBarHeight();

type StyledProps = {
  theme: Theme;
}

export const Container = styled.View<StyledProps>`
  flex: 1;
  margin-top: ${STATUSBAR_HEIGHT}px;
`;

export const Header = styled.View<StyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 'auto';
  
  padding-top: 44px;
  background-color: ${(props: StyledProps) => props.theme.colors.light};
  elevation: 4;
  ${Platform.OS === 'ios' ? 'shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.25; shadow-radius: 3.84px;' : ''}
  z-index: 1000;
`;

export const HeaderBox = styled.View<StyledProps>`
  flex: 1;
  margin-top: ${STATUSBAR_HEIGHT}px;
`; 
export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 44px;
`;

export const SearchWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const SearchContainer = styled.View<StyledProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${(props: StyledProps) => props.theme.colors.backgroundLight};
  margin-bottom: 20px;
`;

export const SearchInput = styled.TextInput<StyledProps>`
  flex: 1;
  height: 43px;
  color: ${(props: StyledProps) => props.theme.colors.text};
  
  font-size: 14px;
  line-height: 19.1px;
  font-weight: 600;

  padding: 12px 16px;
  background-color: #EFF1F5;
  gap: 10px;
  border-radius: 8px;
`;

export const ContainerButtonCancel = styled.TouchableOpacity`
  min-height: 100%;
  padding: 0 15px;
`; 

export const SearchButtonCancel = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => props.theme.colors.primary};
  font-size: 14px;
  line-height: 19.1px;
  color: #0F90D9;
  font-weight: 600;
  text-align: center;
  justify-content: center;
`;