import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProviders';
import { FONTS } from '@/constants/Fonts';
import { router } from 'expo-router';
import { developmentLogs } from '@/utils/DevelopmentLogs';

const { width } = Dimensions.get('window');

interface Activity {
  id: string;
  title: string;
  host: {
    name: string;
    avatar: string;
  };
  images: string[];
  details: string;
  distance: string;
  tags: string[];
  location: string;
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Sunset Yoga Session',
    host: {
      name: 'Laura',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    },
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=3000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2940&auto=format&fit=crop',
    ],
    details: 'We will start with a gentle warm-up, followed by a vinyasa flow session as we watch the sunset. The session will conclude with a calming meditation.',
    distance: '5km away',
    tags: ['Yoga', 'Outdoors', 'Wellness'],
    location: 'Beachside Park',
  },
  {
    id: '2',
    title: 'Community Hiking Trip',
    host: {
      name: 'David',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop',
    },
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473992529243-c36e4745039a?q=80&w=2868&auto=format&fit=crop',
    ],
    details: 'This is a 5-mile hike with moderate difficulty. We will meet at the trailhead at 9 AM. The views from the summit are breathtaking!',
    distance: '8km away',
    tags: ['Hiking', 'Adventure', 'Nature'],
    location: 'Eagle Peak Trailhead',
  },
];

const Card = ({ card }: { card: Activity }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const onScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    if (slide !== activeImageIndex) {
      setActiveImageIndex(slide);
    }
  };

  const InfoRow = ({ icon, title, value }: { icon: keyof typeof Ionicons.glyphMap; title: string; value?: string; }) => (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={22} color={theme.text.secondary} />
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>{title}</Text>
        {value && <Text style={styles.infoValue}>{value}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {card.images.map((uri) => (
            <Image key={uri} source={{ uri }} style={styles.cardImage} />
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {card.images.map((_, index) => (
            <View key={index} style={[styles.dot, index === activeImageIndex ? styles.activeDot : {}]} />
          ))}
        </View>
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{card.title}</Text>
        
        <View style={styles.hostSection}>
          <Image source={{ uri: card.host.avatar }} style={styles.hostAvatar} />
          <Text style={styles.hostText}>Hosted by {card.host.name}</Text>
        </View>

        <View style={styles.tagContainer}>
          {card.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        
        <InfoRow icon="information-circle-outline" title="Details" value={card.details} />
        <InfoRow icon="location-outline" title="Location" value={`${card.location} · ${card.distance}`} />
      </ScrollView>
    </View>
  );
};

const overlayStyles = StyleSheet.create({
  overlayLabelContainer: {
    width: 120,
    height: 50,
    borderWidth: 4,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLabel: {
    fontFamily: FONTS.bold,
    fontSize: 24,
  },
});

const OverlayLabel = ({ text, color }: { text: string, color: string }) => (
  <View style={[overlayStyles.overlayLabelContainer, { borderColor: color }]}>
    <Text style={[overlayStyles.overlayLabel, { color }]}>{text}</Text>
  </View>
);

const DiscoverPage = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const swiperRef = useRef<Swiper<Activity>>(null);

  const handleSwipeRight = (cardIndex: number) => {
    developmentLogs('Accepted Activity:', MOCK_ACTIVITIES[cardIndex].title);
    router.push('/src/(tabs)/(threads)');
  };
  
  const handleSwipeLeft = (cardIndex: number) => {
    developmentLogs('Dismissed Activity:', MOCK_ACTIVITIES[cardIndex].title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Discover Activities</Text>
      </View>
      <Swiper
        ref={swiperRef}
        cards={MOCK_ACTIVITIES}
        renderCard={(card) => card ? <Card card={card} /> : null}
        onSwipedLeft={handleSwipeLeft}
        onSwipedRight={handleSwipeRight}
        onSwipedAll={() => developmentLogs('onSwipedAll')}
        cardIndex={0}
        backgroundColor={'transparent'}
        stackSize={2}
        stackSeparation={-25}
        containerStyle={styles.swiperContainer}
        cardVerticalMargin={0}
        cardStyle={{ height: '85%'}}
        animateCardOpacity
        animateOverlayLabelsOpacity
        overlayLabels={{
          left: {
            element: <OverlayLabel text="NOPE" color="#E5566D" />,
            style: { wrapper: { alignItems: 'flex-end', paddingRight: 30 } },
          },
          right: {
            element: <OverlayLabel text="JOIN" color="#4CCC93" />,
            style: { wrapper: { alignItems: 'flex-start', paddingLeft: 30 } },
          },
        }}
      />
    </SafeAreaView>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  headerContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: theme.text.primary,
  },
  swiperContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: theme.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    height: '55%',
  },
  cardImage: {
    width: width - 40,
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: theme.text.primary,
    marginBottom: 15,
  },
  hostSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  hostAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  hostText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: theme.text.secondary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: theme.text.secondary,
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: theme.text.primary,
    lineHeight: 22,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: theme.background,
  },
  tagText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: theme.text.secondary,
  },
});

export default DiscoverPage;