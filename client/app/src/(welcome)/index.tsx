import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { useTheme } from '@/providers/ThemeProviders';
import { FONTS } from '../../../constants/Fonts';

export default function WelcomeScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <LinearGradient
          colors={[theme.primary, theme.accent.calories]}
          style={[styles.iconContainer, { shadowColor: theme.primary }]}
        >
          <Ionicons name="sparkles-outline" size={80} color={theme.text.inverse} />
        </LinearGradient>
        
        <Text style={[styles.title, { color: theme.text.primary }]}>Your Adventure Awaits</Text>
        <Text style={[styles.subtitle, { color: theme.text.secondary }]}>
          Discover unique activities and meet new people in your city.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.ctaButton, { backgroundColor: theme.primary, shadowColor: theme.text.primary }]}
          onPress={()=> router.push('/src/(authenticate)/sign-up-options')}
        >
          <Text style={[styles.ctaButtonText, { color: theme.text.primary }]}>Get Started</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: '90%',
    fontFamily: FONTS.regular,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  ctaButton: {
    borderRadius: 14,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaButtonText: {
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
  signInText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  signInLink: {
    fontFamily: FONTS.medium,
  },
});
