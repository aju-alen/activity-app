import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { COLORS } from '../../../constants/Colors';
import { FONTS } from '../../../constants/Fonts';
import { useTheme } from '@/providers/ThemeProviders';

const STEPS = [
  { id: 'details', title: 'Your Details' },
  { id: 'phone', title: 'Phone Number' },
  { id: 'location', title: 'Location' },
  { id: 'picture', title: 'Profile Picture' },
];

const SignUpFlow = () => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const progress = (currentStep + 1) / STEPS.length;
  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progress * 100}%`, { duration: 300 }),
    };
  });

  const goToNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case 'details':
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: theme.text.primary }]}>Let's get started</Text>
            <TextInput 
              placeholder="Full Name" 
              style={[styles.input, { 
                backgroundColor: theme.surface,
                borderColor: theme.border,
                color: theme.text.primary 
              }]} 
            />
            <TextInput 
              placeholder="Email Address" 
              style={[styles.input, { 
                backgroundColor: theme.surface,
                borderColor: theme.border,
                color: theme.text.primary 
              }]} 
              keyboardType="email-address" 
            />
            <TextInput 
              placeholder="Username" 
              style={[styles.input, { 
                backgroundColor: theme.surface,
                borderColor: theme.border,
                color: theme.text.primary 
              }]} 
            />
            <TextInput 
              placeholder="Date of Birth (YYYY-MM-DD)" 
              style={[styles.input, { 
                backgroundColor: theme.surface,
                borderColor: theme.border,
                color: theme.text.primary 
              }]} 
            />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                style={[styles.input, { 
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  color: theme.text.primary 
                }]}
                secureTextEntry={secureTextEntry}
              />
              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={theme.text.secondary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Confirm Password"
                style={[styles.input, { 
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  color: theme.text.primary 
                }]}
                secureTextEntry={secureTextEntry}
              />
              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={theme.text.secondary}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={[styles.nextButton, { backgroundColor: theme.button.default.background }]} 
              onPress={goToNextStep}
            >
              <Text style={[styles.nextButtonText, { color: theme.button.default.text }]}>Next</Text>
            </TouchableOpacity>
          </View>
        );
      case 'phone':
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: theme.text.primary }]}>Verify your number</Text>
            <TextInput 
              placeholder="Phone Number" 
              style={[styles.input, { 
                backgroundColor: theme.surface,
                borderColor: theme.border,
                color: theme.text.primary 
              }]} 
              keyboardType="phone-pad" 
            />
            <TouchableOpacity 
              style={[styles.nextButton, { backgroundColor: theme.button.default.background }]} 
              onPress={goToNextStep}
            >
              <Text style={[styles.nextButtonText, { color: theme.button.default.text }]}>Next</Text>
            </TouchableOpacity>
          </View>
        );
      case 'location':
        return (
          <View style={styles.locationStepContainer}>
            <View>
              <Text style={[styles.smallTitle, { color: theme.text.primary }]}>Find activities</Text>
              <Text style={[styles.largeTitle, { color: theme.text.primary }]}>Find activities near you</Text>
              <Text style={[styles.description, { color: theme.text.secondary }]}>
                To find activities near you, we need access to your location. This will help you discover events and connect with people in your area.
              </Text>
              <View style={[styles.imageContainer, { backgroundColor: theme.surface }]}>
                <Image 
                  source={{ uri: 'https://i.imgur.com/g91t4O5.png' }} 
                  style={styles.locationImage}
                  resizeMode="contain"
                />
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.nextButton, { backgroundColor: theme.primary }]} 
              onPress={goToNextStep}
            >
              <Text style={[styles.nextButtonText, { color: theme.text.inverse }]}>Enable location</Text>
            </TouchableOpacity>
          </View>
        );
      case 'picture':
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: theme.text.primary }]}>Add a profile picture</Text>
            <TouchableOpacity style={[styles.picturePlaceholder, { 
              borderColor: theme.border 
            }]}>
              <Ionicons name="camera-outline" size={40} color={theme.text.secondary} />
              <Text style={[styles.picturePlaceholderText, { color: theme.text.secondary }]}>Upload Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.nextButton, { backgroundColor: theme.button.default.background }]}>
              <Text style={[styles.nextButtonText, { color: theme.button.default.text }]}>Create Account</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text.primary} />
        </TouchableOpacity>
        <View style={[styles.progressContainer, { backgroundColor: theme.border }]}>
          <Animated.View style={[styles.progressBar, { backgroundColor: theme.primary }, animatedWidth]} />
        </View>
      </View>
      {STEPS[currentStep].id === 'location' ? (
        renderStep()
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderStep()}
        </ScrollView>
      )}
    </View>
  );
};

export default SignUpFlow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  progressContainer: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  stepContainer: {
    paddingBottom: 40,
  },
  stepTitle: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    marginBottom: 32,
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
  passwordContainer: {
    justifyContent: 'center',
    marginBottom: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  nextButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  locationStepContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  smallTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  largeTitle: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
  },
  locationImage: {
    width: '100%',
    height: 300,
  },
  picturePlaceholder: {
    height: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  picturePlaceholderText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
});