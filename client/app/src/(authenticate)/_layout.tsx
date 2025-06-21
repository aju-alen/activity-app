import React from 'react';
import { Stack } from 'expo-router';

  



const AuthenticateLayout = () => {
    return (
        
        <Stack >
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up-options" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up-flow" options={{ headerShown: false }} />
        </Stack>
        
    );
};

export default AuthenticateLayout;