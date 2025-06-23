import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/providers/ThemeProviders';

  



const RootLayout = () => {
    return (
        <ThemeProvider>
        <Stack >
            <Stack.Screen name="src/(welcome)" options={{ headerShown: false }} />
            <Stack.Screen name="src/(authenticate)" options={{ headerShown: false }} />
            <Stack.Screen name="src/(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        </ThemeProvider>
        
    );
};

export default RootLayout;