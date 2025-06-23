import { Redirect } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Page() {
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    'SF_Black_Italic': require('@/assets/fonts/sf-pro/SFPRODISPLAYBLACKITALIC.otf'),
    'SF_Bold':require('@/assets/fonts/sf-pro/SFPRODISPLAYBOLD.otf'),
    'SF_Heavy_Italic':require('@/assets/fonts/sf-pro/SFPRODISPLAYHEAVYITALIC.otf'),
    'SF_Light_Italic':require('@/assets/fonts/sf-pro/SFPRODISPLAYLIGHTITALIC.otf'),
    'SF_Medium':require('@/assets/fonts/sf-pro/SFPRODISPLAYMEDIUM.otf'),
    'SF_Regular':require('@/assets/fonts/sf-pro/SFPRODISPLAYREGULAR.otf'),
    'SF_Semibold_Italic':require('@/assets/fonts/sf-pro/SFPRODISPLAYSEMIBOLDITALIC.otf'),
    'SF_Thin_Italic':require('@/assets/fonts/sf-pro/SFPRODISPLAYTHINITALIC.otf'),
    'SF_UltraLight_Italic':require('@/assets/fonts/sf-pro/SFPRODISPLAYULTRALIGHTITALIC.otf'),
  });

// TODO: Handle authentication check

  // Handle splash screen and initialization
  useEffect(() => {
    async function prepare() {
      try {
        // Wait for fonts to load
        if (fontsLoaded) {
          // Keep splash screen visible for 4 seconds
          await new Promise(resolve => setTimeout(resolve, 4000));
          // Hide splash screen
          await SplashScreen.hideAsync();
          setIsReady(true);
        }
      } catch (error) {
        console.error('Error preparing app:', error);
      }
    }

    prepare();
  }, [fontsLoaded]);

  // Show splash screen while preparing
  if (!fontsLoaded || !isReady) {
    return (
      <View style={styles.container}>
        {/* <Image 
          source={require('../assets/images/logo.png')}  // Make sure this path matches your splash image location
          style={styles.splashImage}
          resizeMode="contain"
        /> */}
      </View>
    );
  }

  // Once ready, redirect based on authentication status
  return (
    <View>
      {!token ? (
        <Redirect href={'/src/(welcome)'} />
      ) : (
        <Redirect href={'/src/(tabs)/(home)'} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Match this with your splash screen background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
});