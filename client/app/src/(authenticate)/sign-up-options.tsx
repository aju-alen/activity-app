import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../../constants/Colors';
import { FONTS } from '../../../constants/Fonts';

const theme = COLORS.light;

const SignUpOptions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Create an Account</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=> router.push('/src/(authenticate)/sign-up-flow')}>
            <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
              <Ionicons name="mail" size={22} color={theme.text.inverse} />
            </View>
            <Text style={styles.buttonText}>Sign up with Email</Text>
            <View style={{ width: 22 }} />
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.button}>
            <View style={[styles.iconContainer, { backgroundColor: theme.secondary[1] }]}>
              <Ionicons name="logo-google" size={22} color={theme.text.inverse} />
            </View>
            <Text style={styles.buttonText}>Sign in with Google</Text>
            <View style={{ width: 22 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/src/(authenticate)/sign-in')}>
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text style={styles.signInLink}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: theme.text.primary,
    marginBottom: 48,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    backgroundColor: theme.surface,
    padding: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.border,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: theme.text.primary,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  signInText: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: theme.text.secondary,
  },
  signInLink: {
    fontFamily: FONTS.bold,
    color: theme.text.primary,
  },
}); 