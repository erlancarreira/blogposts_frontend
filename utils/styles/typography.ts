import styled from 'styled-components/native';
import { Theme } from '@/context/ThemeContext';

interface TextProps {
  theme: Theme;
}

export const Text = styled.Text<TextProps>`
  font-family: ${(props: TextProps) => props.theme.typography.fontFamily.regular};
  color: ${(props: TextProps) => props.theme.colors.text};
`;

export const Title = styled(Text)`
  font-family: ${(props: TextProps) => props.theme.typography.fontFamily.bold};
  font-size: 20px;
`;

export const Subtitle = styled(Text)`
  font-family: ${(props: TextProps) => props.theme.typography.fontFamily.semiBold};
  font-size: 16px;
`;