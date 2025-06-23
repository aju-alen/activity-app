import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '@/providers/ThemeProviders';

const WelcomeLayout = () => {
    const { theme } = useTheme();
    return (
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        
    );
};

export default WelcomeLayout;