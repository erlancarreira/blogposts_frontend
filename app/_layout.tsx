
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { ThemeProvider } from '@/context/ThemeContext';
import { SessionProvider } from '@/context/SessionContext';

import Authenticate from '@/components/Authenticate';
import Toast from "react-native-toast-message";
import * as SplashScreen from 'expo-splash-screen';
import LoadFonts from '@/components/LoadFonts';

declare global {
    interface Window {
        frameworkReady?: () => void;
    }
}

// Previne que a tela splash seja automaticamente escondida antes do carregamento completo
SplashScreen.preventAutoHideAsync();

// Componente principal que encapsula a aplicação
export default function RootLayout() {

    return (
        <LoadFonts>
            <SessionProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ThemeProvider>
                            <Authenticate />
                        </ThemeProvider>
                    </PersistGate>
                </Provider>
                <Toast position='bottom' />
            </SessionProvider>
        </LoadFonts>
    );
}
