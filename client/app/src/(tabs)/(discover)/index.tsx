import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/providers/ThemeProviders';
import { FONTS } from '@/constants/Fonts';
import Swiper from 'react-native-deck-swiper';
import { Ionicons } from '@expo/vector-icons';

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Sunset Yoga Session',
    age: 25,
    distance: '5km',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=3000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1575052814080-384361d15781?q=80&w=2940&auto=format&fit=crop',
    ],
    about: 'I like going on walks after work. Hit me up if you wanna join me.',
    tags: ['Yoga', 'Outdoors', 'Wellness', 'Beginner Friendly'],
    details: 'We will start with a gentle warm-up, followed by a vinyasa flow session as we watch the sunset. The session will conclude with a calming meditation. Please bring your own mat and water. All levels are welcome!',
    location: 'Beachside Park, Sunset Point',
  },
  {
    id: '2',
    title: 'Community Hiking Trip',
    age: 32,
    distance: '8km',
    images: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1473992529243-c36e4745039a?q=80&w=2868&auto=format&fit=crop',
    ],
    about: 'Let\'s explore the scenic trails together and enjoy the beauty of nature.',
    tags: ['Hiking', 'Adventure', 'Nature', 'Intermediate'],
    details: 'This is a 5-mile hike with moderate difficulty. We will meet at the trailhead at 9 AM. Please wear comfortable shoes and bring plenty of water and snacks. The views from the summit are breathtaking!',
    location: 'Eagle Peak Trailhead',
  },
];

const EventCard = ({ card }: { card: any }) => {
    const { theme } = useTheme();

    const InfoRow = ({icon, title, value}: {icon: keyof typeof Ionicons.glyphMap; title: string; value: string}) => (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8}}>
                <Ionicons name={icon} size={22} color={theme.text.secondary}/>
                <Text style={[styles.infoTitle, {color: theme.text.primary}]}>{title}</Text>
            </View>
            <Text style={[styles.infoValue, {color: theme.text.secondary}]}>{value}</Text>
        </View>
    )

    const Tag = ({text}: {text: string}) => (
        <View style={[styles.tag, {backgroundColor: theme.surface}]}>
            <Text style={[styles.tagText, {color: theme.text.secondary}]}>{text}</Text>
        </View>
    )

    return (
        <View style={[styles.card, { backgroundColor: theme.background }]}>
            <ScrollView 
                style={styles.card}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            >
                <View style={styles.imageContainer}>
                    {card.images.map((uri: string, index: number) => (
                        <Image
                            key={uri}
                            source={{ uri }}
                            style={[styles.cardImage]}
                        />
                    ))}
                </View>

                <View style={styles.contentContainer}>
                    <Text style={[styles.title, { color: theme.text.primary }]}>{card.title}, {card.age}</Text>
                    
                    <View style={{marginVertical: 24, gap: 24}}>
                        <InfoRow icon="person-outline" title="About" value={card.about}/>
                        <InfoRow icon="location-outline" title="Location" value={`${card.distance} away · ${card.location}`}/>
                        <InfoRow icon="information-circle-outline" title="Details" value={card.details}/>
                    </View>
                    
                    <View style={styles.tagContainer}>
                        {card.tags.map((tag: string) => <Tag key={tag} text={tag} />)}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const DiscoverPage = () => {
  const { theme } = useTheme();
  const swiperRef = useRef<Swiper<any>>(null);

  const ActionButton = ({icon, color, onPress}: {icon: keyof typeof Ionicons.glyphMap; color: string; onPress: () => void}) => (
    <TouchableOpacity style={[styles.actionButton, {backgroundColor: color}]} onPress={onPress}>
        <Ionicons name={icon} size={32} color={'#fff'}/>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Swiper
        ref={swiperRef}
        cards={MOCK_EVENTS}
        renderCard={(card) => <EventCard card={card} />}
        cardIndex={0}
        backgroundColor={'transparent'}
        stackSize={2}
        cardVerticalMargin={20}
        containerStyle={styles.swiperContainer}
        disableTopSwipe
        disableBottomSwipe
        infinite
        horizontalSwipe
        swipeBackCard
        onSwipedLeft={() => console.log('swiped left')}
        onSwipedRight={() => console.log('swiped right')}
        cardStyle={{ height: '95%' }}
      />
      <View style={styles.actionButtonsContainer}>
        <ActionButton icon="close" color="#E74C3C" onPress={() => swiperRef.current?.swipeLeft()} />
        <ActionButton icon="star" color="#F1C40F" onPress={() => {}} />
        <ActionButton icon="heart" color="#2ECC71" onPress={() => swiperRef.current?.swipeRight()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperContainer: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 300,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
  },
  infoSection: {
  },
  infoTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
  infoValue: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 34,
  },
  tagContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    borderTopWidth: 1,
    paddingTop: 24,
    borderColor: '#F0F0F0'
  },
  tag:{
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
  },
  tagText:{
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 12
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  }
});

export default DiscoverPage;