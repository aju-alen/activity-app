import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/providers/ThemeProviders';
import { FONTS } from '@/constants/Fonts';
import ActivityDetailModal from '@/components/ui/ActivityDetailModal';

const MOCK_CATEGORIES = [
  { id: '1', name: 'Sports', icon: 'tennisball-outline' },
  { id: '2', name: 'Art', icon: 'color-palette-outline' },
  { id: '3', name: 'Music', icon: 'musical-notes-outline' },
  { id: '4', name: 'Food', icon: 'fast-food-outline' },
  { id: '5', name: 'Travel', icon: 'airplane-outline' },
];

const MOCK_ACTIVITIES = [
  {
    id: '1',
    title: 'Community Hiking Trip',
    host: 'Laura',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
    category: 'Sports',
  },
  {
    id: '2',
    title: 'Art Workshop: Painting',
    host: 'David',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
    category: 'Art',
  },
];

const HomePage = () => {
  const { theme } = useTheme();
  console.log(theme, "theme in HomePage");
  
  const [scrollY] = useState(new Animated.Value(0));
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleCardPress = (activity: any) => {
    setSelectedActivity(activity);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedActivity(null);
  };

  // Calculate animated values
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const renderCategory = ({ item, index }: { item: any; index: number }) => {
    const color = theme.secondary[index % theme.secondary.length];
    return (
      <TouchableOpacity style={styles.categoryItem}>
        <View style={[styles.categoryIconContainer, { backgroundColor: color }]}>
          <Ionicons name={item.icon} size={26} color={theme.text.primary} />
        </View>
        <Text style={[styles.categoryText, { color: theme.text.secondary }]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderActivityCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.activityCard} onPress={() => handleCardPress(item)}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.activityCardBackground}
        imageStyle={{ borderRadius: 20 }}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.activityCardGradient}>
          <View style={styles.activityCardHeader}>
            <Text style={[styles.activityCategory, { backgroundColor: theme.primary, color: theme.text.inverse }]}>
              {item.category}
            </Text>
            <TouchableOpacity style={styles.favoriteIcon}>
              <Ionicons name="heart-outline" size={24} color={theme.surface} />
            </TouchableOpacity>
          </View>
          <View style={styles.activityCardFooter}>
            <Text style={[styles.activityTitle, { color: theme.surface }]}>{item.title}</Text>
            <TouchableOpacity onPress={() => {}} style={styles.seeDetailsButton}>
              <Text style={[styles.seeDetailsText, { color: theme.surface }]}>See details</Text>
              <Ionicons name="arrow-forward" size={16} color={theme.surface} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Fixed Search Bar - Only visible when scrolled */}
      <Animated.View 
        style={[
          styles.fixedSearchBar, 
          { 
            backgroundColor: theme.background,
            opacity: scrollY.interpolate({
              inputRange: [80, 120],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [80, 120],
                outputRange: [-20, 0],
                extrapolate: 'clamp',
              })
            }]
          }
        ]}
      >
        <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
          <Ionicons name="search-outline" size={22} color={theme.text.secondary} />
          <TextInput
            placeholder="Search activities"
            placeholderTextColor={theme.text.secondary}
            style={[styles.searchInput, { color: theme.text.primary }]}
          />
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.background }]}>
            <Ionicons name="options-outline" size={22} color={theme.text.primary} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Animated Header and Title */}
      <Animated.View 
        style={[
          styles.animatedHeader, 
          { 
            backgroundColor: theme.background,
            transform: [{ translateY: headerTranslateY }],
            opacity: headerOpacity,
          }
        ]}
      >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
              style={styles.avatar}
            />
            <View>
              <Text style={[styles.welcomeText, { color: theme.text.secondary }]}>Welcome back,</Text>
              <Text style={[styles.userName, { color: theme.text.primary }]}>Sarah</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { backgroundColor: theme.surface }]}>
            <Ionicons name="notifications-outline" size={24} color={theme.text.primary} />
          </TouchableOpacity>
        </View>

        <Animated.Text 
          style={[
            styles.mainTitle, 
            { 
              color: theme.text.primary,
              transform: [{ translateY: titleTranslateY }],
              opacity: titleOpacity,
            }
          ]}
        >
          Explore new activities
        </Animated.Text>

        {/* Search Bar - Part of the header initially */}
        <Animated.View 
          style={[
            styles.headerSearchBar,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, 60],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
              transform: [{
                translateY: scrollY.interpolate({
                  inputRange: [0, 60],
                  outputRange: [0, -20],
                  extrapolate: 'clamp',
                })
              }]
            }
          ]}
        >
          <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
            <Ionicons name="search-outline" size={22} color={theme.text.secondary} />
            <TextInput
              placeholder="Search activities"
              placeholderTextColor={theme.text.secondary}
              style={[styles.searchInput, { color: theme.text.primary }]}
            />
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.background }]}>
              <Ionicons name="options-outline" size={22} color={theme.text.primary} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollableContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Categories */}
        <FlatList
          horizontal
          data={MOCK_CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />

        {/* Activity Cards */}
        <FlatList
          data={MOCK_ACTIVITIES}
          renderItem={renderActivityCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} 
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>

      {isModalVisible && (
        <ActivityDetailModal
          isVisible={isModalVisible}
          onClose={closeModal}
          activity={selectedActivity}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  fixedSearchBar: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 2,
    paddingTop: 20,
  },
  animatedHeader: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  welcomeText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  userName: {
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  mainTitle: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  filterButton: {
    padding: 8,
    borderRadius: 10,
  },
  scrollableContent: {
    flex: 1,
    paddingTop: 240, // Account for header + search bar height
    paddingHorizontal: 20,
  },
  categoryList: {
    gap: 20,
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 8,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  activityCard: {
    height: 280,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  activityCardBackground: {
    flex: 1,
  },
  activityCardGradient: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
  },
  activityCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  activityCategory: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    overflow: 'hidden',
  },
  favoriteIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 20,
  },
  activityCardFooter: {},
  activityTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    marginBottom: 8,
  },
  seeDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  seeDetailsText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  headerSearchBar: {
    marginTop: 24,
  },
});

export default HomePage;