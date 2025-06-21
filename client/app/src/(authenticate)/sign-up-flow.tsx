import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { COLORS } from '../../../constants/Colors';
import { FONTS } from '../../../constants/Fonts';

const theme = COLORS.light;

const STEPS = [
  { id: 'details', title: 'Your Details' },
  { id: 'phone', title: 'Phone Number' },
  { id: 'location', title: 'Location' },
  { id: 'picture', title: 'Profile Picture' },
];

const SignUpFlow = () => {
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
            <Text style={styles.stepTitle}>Let's get started</Text>
            <TextInput placeholder="Full Name" style={styles.input} />
            <TextInput placeholder="Email Address" style={styles.input} keyboardType="email-address" />
            <TextInput placeholder="Username" style={styles.input} />
            <TextInput placeholder="Date of Birth (YYYY-MM-DD)" style={styles.input} />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                style={styles.input}
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
                style={styles.input}
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
            <TouchableOpacity style={styles.nextButton} onPress={goToNextStep}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        );
      case 'phone':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Verify your number</Text>
            <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" />
            <TouchableOpacity style={styles.nextButton} onPress={goToNextStep}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        );
      case 'location':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Set your location</Text>
            <TouchableOpacity style={styles.locationButton}>
              <Ionicons name="location-outline" size={24} color={theme.text.primary} />
              <Text style={styles.locationButtonText}>Use my current location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={goToNextStep}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        );
      case 'picture':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Add a profile picture</Text>
            <TouchableOpacity style={styles.picturePlaceholder}>
              <Ionicons name="camera-outline" size={40} color={theme.text.secondary} />
              <Text style={styles.picturePlaceholderText}>Upload Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text.primary} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, animatedWidth]} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderStep()}
      </ScrollView>
    </View>
  );
};

export default SignUpFlow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
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
    backgroundColor: theme.border,
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: 4,
  },
  stepContainer: {
    paddingBottom: 40,
  },
  stepTitle: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: theme.text.primary,
    marginBottom: 32,
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
  passwordContainer: {
    justifyContent: 'center',
    marginBottom: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  nextButton: {
    backgroundColor: theme.button.default.background,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  nextButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: theme.button.default.text,
  },
  locationButton: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  locationButtonText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: theme.text.primary,
  },
  picturePlaceholder: {
    height: 200,
    borderWidth: 2,
    borderColor: theme.border,
    borderStyle: 'dashed',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  picturePlaceholderText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: theme.text.secondary,
  },
});