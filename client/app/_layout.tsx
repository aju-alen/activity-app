import React from 'react';
import { Stack } from 'expo-router';

  



const RootLayout = () => {
    return (
        
        <Stack >
            <Stack.Screen name="src/(welcome)" options={{ headerShown: false }} />
            <Stack.Screen name="src/(authenticate)" options={{ headerShown: false }} />
            <Stack.Screen name="src/(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        
    );
};

export default RootLayout;