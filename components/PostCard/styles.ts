
import styled from "styled-components/native";
import { Theme } from '@/context/ThemeContext';

interface StyledProps {
  theme: Theme;
}

export const CardContainer = styled.TouchableOpacity<StyledProps>`
  background-color: ${(props: StyledProps) => props.theme.colors.card};
  border-radius: 15px;
  padding: 16px 0 20px 0;
  margin: 5px 0px;
  
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 4px;
  shadow-opacity: 1;
  shadow-radius: 24px;
  elevation: 5;

  min-height: 211px;
  justify-content: space-between;
`;

export const Header = styled.View<StyledProps>`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 12px;
  padding: 0 16px;
  min-height: 41px;
`;

export const UserInfo = styled.View<StyledProps>`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const UsernameContent = styled.View<StyledProps>`
  margin-left: 8px;
  padding: 0;
`;

export const Name = styled.Text<StyledProps>`
  font-weight: 700;
  font-size: 16px;
  line-height: 21.82px;
  color: ${(props: StyledProps) => props.theme.colors.text};
`;

export const Username = styled.Text<StyledProps>`
  font-weight: 400;
  font-size: 14px;
  line-height: 19.1px;
  color: ${(props: StyledProps) => props.theme.colors.textLight};
`;

export const ContentBody = styled.View<StyledProps>`
  padding: 0 16px;
  gap: 4px;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

export const Title = styled.Text<StyledProps>`
  flex: 1;
  width: 100%;
  font-weight: 700;
  font-size: 20px;
  line-height: 27.28px;
  margin-bottom: 4px;
  color: ${(props: StyledProps) => props.theme.colors.text};
`;

export const SubContent = styled.Text<StyledProps>`
  flex: 1;
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.1px;
  color: ${(props: StyledProps) => props.theme.colors.textLight};
`;

export const ActionButton = styled.TouchableOpacity<StyledProps>`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 21px;
`;

