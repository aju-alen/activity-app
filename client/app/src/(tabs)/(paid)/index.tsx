import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProviders';
import { FONTS } from '@/constants/Fonts';
import { router } from 'expo-router';

const MOCK_FEATURED = [
  {
    id: '1',
    title: 'Beach Volleyball',
    description: 'Join us for a fun game of beach volleyball!',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=3107&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    title: 'Board Game Night',
    description: 'Gather around for a night of classic board games and laughter.',
    image: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?q=80&w=3117&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    title: 'Live Concert',
    description: 'Enjoy an evening of live music under the stars.',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2940&auto=format&fit=crop',
  },
];

const MOCK_POPULAR = [
  {
    id: '1',
    category: 'Outdoor',
    title: 'Hiking Adventure',
    description: 'Explore scenic trails with a group of nature enthusiasts.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    category: 'Social',
    title: 'Wine Tasting',
    description: 'Sip and socialize at a local vineyard.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1513618827672-0d7c5ad591b1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    category: 'Creative',
    title: 'Pottery Workshop',
    description: 'Learn the art of pottery in a hands-on workshop.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1565253249718-1933b4559183?q=80&w=2787&auto=format&fit=crop',
  },
];

const FeaturedCard = ({ item }: { item: any }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.featuredCard}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <Text style={[styles.featuredTitle, { color: theme.text.primary }]}>{item.title}</Text>
      <Text style={[styles.featuredDesc, { color: theme.text.secondary }]}>{item.description}</Text>
    </TouchableOpacity>
  );
};

const PopularActivity = ({ item }: { item: any }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.popularCard}>
      <View style={styles.popularTextContainer}>
        <Text style={[styles.popularCategory, { color: theme.text.secondary }]}>{item.category}</Text>
        <Text style={[styles.popularTitle, { color: theme.text.primary }]}>{item.title}</Text>
        <Text style={[styles.popularDesc, { color: theme.text.secondary }]}>{item.description}</Text>
        <View style={[styles.priceContainer, { backgroundColor: theme.surface }]}>
          <Text style={[styles.priceText, { color: theme.text.primary }]}>${item.price}</Text>
        </View>
      </View>
      <Image source={{ uri: item.image }} style={styles.popularImage} />
    </TouchableOpacity>
  );
};

const PaidActivitiesPage = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color={theme.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text.primary }]}>Paid Activities</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Featured</Text>
          <FlatList
            horizontal
            data={MOCK_FEATURED}
            renderItem={({ item }) => <FeaturedCard item={item} />}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 4, gap: 20 }}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Popular</Text>
          <View style={styles.popularListContainer}>
            {MOCK_POPULAR.map((item) => <PopularActivity key={item.id} item={item} />)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
  section: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: 260,
  },
  featuredImage: {
    width: '100%',
    height: 320,
    borderRadius: 24,
    marginBottom: 16,
  },
  featuredTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    marginBottom: 4,
  },
  featuredDesc: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  popularListContainer: {
    paddingHorizontal: 20,
    gap: 24,
  },
  popularCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  popularTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  popularCategory: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  popularTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    marginBottom: 8,
  },
  popularDesc: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 22,
    color: '#6c757d',
    marginBottom: 16,
  },
  priceContainer: {
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 99,
  },
  priceText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  popularImage: {
    width: 120,
    height: 150,
    borderRadius: 24,
  },
});

export default PaidActivitiesPage;