import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../../../constants/Colors';
// import { FONTS } from '../../../constants/Fonts';
import { router } from 'expo-router';

const theme = COLORS.light;

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LinearGradient
          colors={[theme.primary, theme.accent.calories]}
          style={styles.iconContainer}
        >
          <Ionicons name="sparkles-outline" size={80} color={theme.text.inverse} />
        </LinearGradient>
        
        <Text style={styles.title}>Your Adventure Awaits</Text>
        <Text style={styles.subtitle}>
          Discover unique activities and meet new people in your city.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.ctaButton} onPress={()=> router.push('/src/(authenticate)/sign-up-options')}>
          <Text style={styles.ctaButtonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> router.push('/src/(authenticate)/sign-in')}>
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.signInLink}>Sign In</Text>
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
    backgroundColor: theme.background,
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
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    color: theme.text.primary,
    textAlign: 'center',
    
  },
  subtitle: {
    fontSize: 18,
    color: theme.text.secondary,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: '90%',
    
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  ctaButton: {
    backgroundColor: theme.primary,
    borderRadius: 14,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
    shadowColor: theme.text.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaButtonText: {
    color: theme.text.primary,
    fontSize: 18,
    
  },
  signInText: {
    fontSize: 14,
    color: theme.text.secondary,
    
  },
  signInLink: {
    
    color: theme.text.primary,
  },
});
