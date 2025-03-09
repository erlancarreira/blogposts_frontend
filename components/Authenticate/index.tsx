import { useEffect, useState } from 'react';
import { Slot, useSegments, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSession } from '@/context/SessionContext';
import Loading from '@/components/Loading';
import * as SplashScreen from 'expo-splash-screen';


function Authenticate() {
    const [isReady, setIsReady] = useState(false);
    const { session, isLoading } = useSession();
    const segments = useSegments();
    const router = useRouter(); 
    
    useEffect(() => {
        if (!isLoading) {
            setIsReady(true);
            SplashScreen.hideAsync().catch(() => {
               
            });
        }
    }, [isLoading]);

    
    useEffect(() => {
        
        if (!isReady) return;

        const protectedGroup = segments[0] === '(auth)';
        const publicGroup = segments[0] === '(public)';

        if (!session && protectedGroup) {
            router.replace('/login');
        }
        else if (session && (publicGroup || !protectedGroup)) {
            router.replace('/(auth)/(tabs)');
        }

    }, [session, segments, isReady, router]);

    if (!isReady || isLoading) {
        return <Loading />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar 
                style="dark" 
                backgroundColor="#FFF"
                translucent={true}  
            />
            <Slot />
        </GestureHandlerRootView>
    );
}

export default Authenticate;