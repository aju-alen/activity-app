import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FONTS } from '../../../constants/Fonts';
import { useTheme } from '@/providers/ThemeProviders';
import { checkAvailableLocation } from '@/utils/LocationServiceCheck';
import ToastNotification from '@/utils/ToastNotification';
import { useAuth } from '@/providers/GoogleAuthProvider';
import { developmentLogs } from '@/utils/DevelopmentLogs';

const SignIn = () => {
  const { signIn } = useAuth();
  const { theme } = useTheme();
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    try {
      const result = await checkAvailableLocation();
      if (result.success) {
        developmentLogs('Location verified. Proceeding with Google Sign-In...');
        await signIn();

        // TODO: Enable below to move to phone auth after google auth
        // router.push('/src/(authenticate)/sign-up-flow?startStep=phone');
      } else {
        setLocationErrorMsg(result.message);
        setLocationError(true);
      }
    } catch (error) {
      developmentLogs(error, 'Google Sign-In error');
      // Display Google Sign-In errors to the user
      const errorMessage = error instanceof Error ? error.message : 'Google Sign-In failed';
      setLocationErrorMsg(errorMessage);
      setLocationError(true);
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text.primary }]}>Welcome Back!</Text>
        <Text style={[styles.subtitle, { color: theme.text.secondary }]}>Enter your details to sign in.</Text>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email, Username, or Phone"
            style={[styles.input, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text.primary }]}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            style={[styles.input, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text.primary }]}
            secureTextEntry
          />
          <TouchableOpacity>
            <Text style={[styles.forgotPasswordText, { color: theme.text.primary }]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.loginButton, { backgroundColor: theme.button.default.background }]}
          onPress={() => router.push('/src/(tabs)/(home)')}
        >
          <Text style={[styles.loginButtonText, { color: theme.button.default.text }]}>Login</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <Text style={[styles.dividerText, { color: theme.text.secondary }]}>or sign in with</Text>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
        </View>

        {locationError && <ToastNotification message={locationErrorMsg || ''} type="error" />}

        <TouchableOpacity 
          style={[styles.googleButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
          onPress={handleGoogleSignIn}
        >
          <Ionicons name="logo-google" size={22} color={theme.text.primary} />
          <Text style={[styles.googleButtonText, { color: theme.text.primary }]}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/src/(authenticate)/sign-up-options')}>
          <Text style={[styles.signUpText, { color: theme.text.secondary }]}>
            Don't have an account?{' '}
            <Text style={[styles.signUpLink, { color: theme.text.primary }]}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 60,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: FONTS.regular,
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    textAlign: 'right',
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
    marginBottom: 32,
  },
  loginButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  googleButton: {
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    gap: 12,
    width: '100%',
    marginBottom: 40,
  },
  googleButtonText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  signUpText: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    marginBottom: 40,
  },
  signUpLink: {
    fontFamily: FONTS.bold,
  },
});