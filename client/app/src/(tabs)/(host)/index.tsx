import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProviders';
import { FONTS } from '@/constants/Fonts';

const MOCK_CATEGORIES = [
  { id: '1', name: 'Sports', icon: 'tennisball-outline' },
  { id: '2', name: 'Art', icon: 'color-palette-outline' },
  { id: '3', name: 'Music', icon: 'musical-notes-outline' },
  { id: '4', name: 'Food', icon: 'fast-food-outline' },
  { id: '5', name: 'Travel', icon: 'airplane-outline' },
  { id: '6', name: 'Health', icon: 'heart-outline' },
];

const FormInput = ({ icon, placeholder, value, onChangeText, multiline = false, keyboardType = 'default' }: { icon?: any, placeholder: string, value: string, onChangeText: (text: string) => void, multiline?: boolean, keyboardType?: any }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.inputContainer, { backgroundColor: theme.surface }]}>
      {icon && <Ionicons name={icon} size={22} color={theme.text.secondary} style={styles.inputIcon} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.text.secondary}
        style={[styles.input, { color: theme.text.primary, height: multiline ? 120 : 'auto' }]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
};

const HostActivityPage = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [joinOption, setJoinOption] = useState('Open'); // 'Open' or 'Closed'

  const renderCategory = ({ item }: { item: { id: string, name: string, icon: any } }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <TouchableOpacity 
        style={styles.categoryItem}
        onPress={() => setSelectedCategory(item.id)}
      >
        <View style={[styles.categoryIconContainer, { backgroundColor: isSelected ? theme.primary : theme.surface }]}>
          <Ionicons name={item.icon} size={32} color={isSelected ? theme.text.inverse : theme.text.primary} />
        </View>
        <Text style={[styles.categoryText, { color: theme.text.secondary }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={[styles.label, { color: theme.text.primary }]}>{title}</Text>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
            <Text style={[styles.mainTitle, { color: theme.text.primary }]}>Host an activity</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          
          <Section title="What kind of activity?">
            <FlatList
              horizontal
              data={MOCK_CATEGORIES}
              renderItem={renderCategory}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 20 }}
            />
          </Section>

          <Section title="Tell us the details">
            <FormInput placeholder="Title of your activity" value={title} onChangeText={setTitle} />
            <View style={{height: 16}}/>
            <FormInput placeholder="Describe your activity..." value={description} onChangeText={setDescription} multiline />
          </Section>
          
          <Section title="Logistics">
            <FormInput icon="location-outline" placeholder="Location" value={location} onChangeText={setLocation} />
            <View style={{height: 16}}/>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={{ flex: 1 }}>
                <FormInput icon="calendar-outline" placeholder="Date & Time" value={time} onChangeText={setTime} />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput icon="people-outline" placeholder="Max participants" value={capacity} onChangeText={setCapacity} keyboardType="numeric" />
              </View>
            </View>
          </Section>

          <Section title="Privacy">
            <View style={[styles.toggleContainer, { backgroundColor: theme.surface }]}>
              <TouchableOpacity 
                style={[styles.toggleButton, joinOption === 'Open' && [styles.activeToggleButton, {backgroundColor: theme.primary}]]}
                onPress={() => setJoinOption('Open')}
              >
                <Text style={[styles.toggleText, { color: joinOption === 'Open' ? theme.text.inverse : theme.text.secondary }]}>Open</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.toggleButton, joinOption === 'Closed' && [styles.activeToggleButton, {backgroundColor: theme.primary}]]}
                onPress={() => setJoinOption('Closed')}
              >
                <Text style={[styles.toggleText, { color: joinOption === 'Closed' ? theme.text.inverse : theme.text.secondary }]}>Closed</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.descriptionText, {color: theme.text.secondary}]}>
              'Open' means anyone can join. 'Closed' means you approve members.
            </Text>
          </Section>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={[styles.createButton, { backgroundColor: theme.primary }]}>
            <Text style={[styles.createButtonText, { color: theme.text.inverse }]}>Publish Activity</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 10
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  mainTitle: {
    fontFamily: FONTS.bold,
    fontSize: 32,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 16,
    paddingVertical: 16,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 12,
  },
  categoryIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 6,
  },
  toggleButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeToggleButton: {
  },
  toggleText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  descriptionText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center'
  },
  footer: {
    padding: 24,
    paddingTop: 10,
  },
  createButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  createButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
  }
});

export default HostActivityPage;