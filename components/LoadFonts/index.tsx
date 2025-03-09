import { ReactNode, useEffect, useState } from "react";
import { loadFonts } from '@/utils/loadFonts';
import * as SplashScreen from 'expo-splash-screen';

export default function LoadFonts({ children }: { children: ReactNode }) { 
    const [ fontsLoaded, setFontsLoaded ] = useState(false);
    
    useEffect(() => {
        async function prepare() {
            try {
                await loadFonts();
                await SplashScreen.hideAsync();
                setFontsLoaded(true);
                window.frameworkReady?.();
            } catch (error) {
                console.error('Erro ao carregar fontes:', error);
            }
        }

        prepare();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return children as JSX.Element;
}