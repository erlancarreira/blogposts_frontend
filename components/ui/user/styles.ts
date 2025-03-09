import { TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';
import { StyledProps } from '@/types';

const STATUSBAR_HEIGHT = getStatusBarHeight();

export const Header  = styled.View<StyledProps>`
  flex-direction: row;
  align-items: center;
  
  padding: 12px 16px;
  
  margin-top: ${STATUSBAR_HEIGHT}px;
  background-color: ${(props: StyledProps) => props.theme.colors.backgroundLight};
`;

export const BackButton = styled(TouchableOpacity)`
  
  margin-right: 16px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

export const HeaderRight = styled.View`
  width: 24px;
`;

export const Container = styled.View<StyledProps>`
  flex: 1;
  background-color: ${(props: StyledProps) => props.theme.colors.background};
`;

export const PerfilContainer = styled.View<StyledProps>`
    padding: 24px 16px;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    background-color: ${(props: StyledProps) => props.theme.colors.backgroundLight};
`;

export const PerfilHeader = styled.View`
  margin-bottom: 16px;
  background-color: ${(props: StyledProps) => props.theme.colors.card};
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image<StyledProps>`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 16px;
`;

export const UserInfo = styled.View<StyledProps>`
  flex: 1;
  margin-left: 8px;
`;

export const UserName = styled.Text<StyledProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${(props: StyledProps) => props.theme.colors.text};
`;

export const UserUsername = styled.Text<StyledProps>`
  font-size: 14px;
  
  margin-bottom: 4px;
`;

export const UserEmail = styled.Text<StyledProps>`
  font-size: 14px;
  color: ${(props: StyledProps) => props.theme.colors.textLight};
`;

export const UserDetails = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => props.theme.colors.card};
  margin-top: 8px;
  padding: 16px;
`;

export const DetailItem = styled.View<StyledProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const DetailContainer = styled.View`
   flex: 1;
   flex-direction: column;
   
`;        

export const DetailLabel = styled.Text<StyledProps>`
  font-size: 12px;
  color: ${(props: StyledProps) => props.theme.colors.textLight};
  margin-left: 12px;
`;

export const DetailValue = styled.Text<StyledProps>`
  font-size: 15px;
  color: ${(props: StyledProps) => props.theme.colors.text};
  margin-left: 12px;
`;

export const SectionTitle = styled.Text<StyledProps>`
  font-size: 18px;
  font-weight: bold;
  color: ${(props: StyledProps) => props.theme.colors.text};
  margin: 16px;
`;

export const LoadingContainer = styled.View<StyledProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props: StyledProps) => props.theme.colors.background};
`;

export const EmptyText = styled.Text<StyledProps>`
  text-align: center;
  margin-top: 40px;
  font-size: 16px;
  color: ${(props: StyledProps) => props.theme.colors.textLight};
`;

export const ContainerTitle = styled(TouchableOpacity)<StyledProps>`
   
    margin-right: 16px;

`