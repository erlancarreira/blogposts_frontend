import styled from 'styled-components/native';
import { Theme } from '@/context/ThemeContext';

interface StyledProps {
  theme: Theme;
}

export const CommentContainer = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => props.theme.colors.card};
  border-radius: 8px;
  margin: 8px 16px;
  padding: 12px;
  border-left-width: 3px;
  border-left-color: ${(props: StyledProps) => props.theme.colors.primary};
`;

export const CommentHeader = styled.TouchableOpacity<StyledProps>`
  margin-bottom: 8px;
`;

export const CommentAuthor = styled.Text<StyledProps>`
  font-size: 14px;
  font-weight: bold;
  color: ${(props: StyledProps) => props.theme.colors.text};
`;

export const CommentEmail = styled.Text<StyledProps>`
  font-size: 12px;
  color: ${(props: StyledProps) => props.theme.colors.textLight};
`;

export const CommentBody = styled.Text<StyledProps>`
  font-size: 14px;
  color: ${(props: StyledProps) => props.theme.colors.text};
  line-height: 20px;
`;
