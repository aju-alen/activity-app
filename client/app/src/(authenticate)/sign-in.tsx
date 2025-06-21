import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../../constants/Colors';
import { FONTS } from '../../../constants/Fonts';

const theme = COLORS.light;

const SignIn = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Enter your details to sign in.</Text>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email, Username, or Phone"
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or sign in with</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={22} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/src/(authenticate)/sign-up-options')}>
          <Text style={styles.signUpText}>
            Don't have an account?{' '}
            <Text style={styles.signUpLink}>Sign up</Text>
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
    backgroundColor: theme.background,
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
    color: theme.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: theme.text.secondary,
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: theme.text.primary,
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: theme.text.primary,
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: theme.button.default.background,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
    marginBottom: 32,
  },
  loginButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: theme.button.default.text,
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
    backgroundColor: theme.border,
  },
  dividerText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: theme.text.secondary,
  },
  googleButton: {
    backgroundColor: theme.surface,
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.border,
    gap: 12,
    width: '100%',
    marginBottom: 40,
  },
  googleButtonText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: theme.text.primary,
  },
  signUpText: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: theme.text.secondary,
    marginBottom: 40,
  },
  signUpLink: {
    fontFamily: FONTS.bold,
    color: theme.text.primary,
  },
});