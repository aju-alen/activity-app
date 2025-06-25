import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/providers/ThemeProviders';
import { AuthProvider } from '@/providers/GoogleAuthProvider';

  



const RootLayout = () => {
    return (
        <AuthProvider>
        <ThemeProvider>
        <Stack >
            <Stack.Screen name="src/(welcome)" options={{ headerShown: false }} />
            <Stack.Screen name="src/(authenticate)" options={{ headerShown: false }} />
            <Stack.Screen name="src/(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        </ThemeProvider>
        </AuthProvider>
    );
};

export default RootLayout;