import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  backgroundLight: string;
  card: string;
  text: string;
  textLight: string;
  border: string;
  error: string;
  light: string;
  success: string;
  warning: string;
  danger: string;
  black: string;
  white: string;
  gray: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  favorite: string;
  input: {
    placeholder: string;
  },
  headTitle: string;
}

export interface ThemeTypography {
  fontFamily: {
    regular: string;
    semiBold: string;
    bold: string;
  };
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
  typography: ThemeTypography;
}

// Define light and dark themes
const typography: ThemeTypography = {
  fontFamily: {
    regular: 'NunitoSans-Regular',
    semiBold: 'NunitoSans-SemiBold',
    bold: 'NunitoSans-Bold'
  }
};

const lightTheme: Theme = {
  dark: false,
  typography,
  colors: {
    primary: '#5271FF',
    secondary: '#5856D6',
    background: '#EFF1F5',
    backgroundLight: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1A1A1A',
    textLight: '#757575',
    border: '#E0E0E0',
    error: '#FF5252',
    light: '#FFFFFF',
    success: '#34C759',
    warning: '#FF9500',
    danger: '#FF3B30',
    black: '#000000',
    white: '#FFFFFF',
    gray: {
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    favorite: '#FFD700',
    input: {
      placeholder: '#BBBEC6',
    },
    headTitle: '#1C1F24',
  
  },
};

const darkTheme: Theme = {
  dark: true,
  typography,
  colors: {
    primary: '#0F90D9',
    secondary: '#5856D6',
    background: '#121212',
    backgroundLight: '#1E1E1E',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textLight: '#AAAAAA',
    border: '#333333',
    error: '#FF5252',
    light: '#FFFFFF',
    success: '#34C759',
    warning: '#FF9500',
    danger: '#FF3B30',
    black: '#000000',
    white: '#FFFFFF',
    gray: {
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    favorite: '#FFD700',
    input: {
      placeholder: '#EFF1F5',
    },
    headTitle: '#1C1F24',
  },
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);
  
  const theme = isDark ? darkTheme : lightTheme;
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);