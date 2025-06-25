import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Location from 'expo-location';

import { useTheme } from '@/providers/ThemeProviders';
import { FONTS } from '../../../constants/Fonts';
import { checkAvailableLocation } from '@/utils/LocationServiceCheck'
import ToastNotification from '@/utils/ToastNotification';
import { useAuth } from '@/providers/GoogleAuthProvider';
import { developmentLogs } from '@/utils/DevelopmentLogs';

export default function SignUpOptions() {
  const { theme } = useTheme();
  const [locationError, setLocationError] = useState<boolean>(false);
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);
  const { signIn,user } = useAuth();

  const handleGoogleSignIn = async () => {
    setLocationError(false);
    setLocationErrorMsg(null);
     try{
      const result = await checkAvailableLocation();
      if (result.success) {
        // Proceed with Google Sign-In
        developmentLogs('Location verified. Proceeding with Google Sign-In...');
        // Navigate to sign-up flow starting from phone verification step
        await signIn();
        
        // router.push('/src/(authenticate)/sign-up-flow?startStep=phone');
      } else {
        setLocationError(true);
        setLocationErrorMsg(result.message);
      }
    } catch(error){
      developmentLogs(error, 'Google Sign-In error');
      // Display Google Sign-In errors to the user
      const errorMessage = error instanceof Error ? error.message : 'Google Sign-In failed';
      setLocationError(true);
      setLocationErrorMsg(errorMessage);

    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text.primary }]}>Join our community</Text>
        <Text style={[styles.subtitle, { color: theme.text.secondary }]}>
          Discover and host activities with people around you.
        </Text>
      </View>
      {locationError && <ToastNotification message={locationErrorMsg || ''} type="error" />}
      <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.button, { 
              backgroundColor: theme.surface,
              borderColor: theme.border 
            }]}
            onPress={handleGoogleSignIn}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme.secondary[1] }]}>
              <Ionicons name="logo-google" size={22} color={theme.text.inverse} />
            </View>
            <Text style={[styles.buttonText, { color: theme.text.primary }]}>Sign in with Google</Text>
            <View style={{ width: 22 }} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { 
              backgroundColor: theme.surface,
              borderColor: theme.border 
            }]}
            onPress={() => router.push('/src/(authenticate)/sign-up-flow')}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme.secondary[0] }]}>
              <Ionicons name="mail-outline" size={22} color={theme.text.inverse} />
            </View>
            <Text style={[styles.buttonText, { color: theme.text.primary }]}>Sign up with Email</Text>
            <View style={{ width: 22 }} />
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> router.push('/src/(authenticate)/sign-in')}>
          <Text style={[styles.signInText, { color: theme.text.secondary }]}>
            Already have an account? <Text style={[styles.signInLink, { color: theme.text.primary }]}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '80%',
  },
  footer: {
    paddingBottom: 40,
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  signInText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  signInLink: {
    fontFamily: FONTS.bold,
  },
}); 