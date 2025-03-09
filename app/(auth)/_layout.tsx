import { Stack } from "expo-router";
import { router } from 'expo-router';
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from '@/context/ThemeContext';
import { ContainerTitle } from "@/components/ui/user/styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import { fetchPosts } from "@/store/slices/postsSlice";
import { fetchUsers } from "@/store/slices/usersSlice";


export default function Layout() {

    const { theme } = useTheme();
    
    const dispatch = useDispatch<AppDispatch>();

    const handleCancel = () => {
        router.back();
    };

    useEffect(()=> {
        
        const fetchAll = async () => {
            await Promise.all([
                dispatch(fetchPosts()),
                dispatch(fetchUsers())
            ]);
        };

        fetchAll();

    }, []);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{
                
                presentation: 'modal',
                animation: 'slide_from_right',
                headerShown: false
            }} />

            <Stack.Screen name="post/[id]" options={{
                presentation: 'modal',
                animation: 'slide_from_right',
                headerShown: false
            }} />

            <Stack.Screen 
                name="post/create/index" 
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                    headerShown: false,
                }} 
            />

            <Stack.Screen name="user/[id]" options={{
                presentation: 'modal',
                animation: 'slide_from_right',
                title: 'Perfil',
                headerShown: false,
                
                headerLeft: () => (
                    <ContainerTitle
                        onPress={handleCancel}
                    >
                        <ArrowLeft size={24} color={theme.colors.text} />
                        
                    </ContainerTitle>
                ),
                headerStyle: {
                    backgroundColor: theme.colors.backgroundLight,
                },
                headerShadowVisible: false,
            }} />
        </Stack>
    );
}