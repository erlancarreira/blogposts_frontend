import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="(auth)/login/index" 
            />
            <Stack.Screen
                name="(auth)/cadastrar/index"
            />
        </Stack>
    );
}
