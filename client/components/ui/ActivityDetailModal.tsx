import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProviders';
import { FONTS } from '@/constants/Fonts';

const ActivityDetailModal = ({ isVisible, onClose, activity }: { isVisible: boolean, onClose: () => void, activity: any }) => {
  const { theme } = useTheme();

  if (!activity) return null;

  const InfoPill = ({ icon, text }: {icon: any, text: string}) => (
    <View style={[styles.infoPill, { backgroundColor: theme.surface }]}>
      <Ionicons name={icon} size={18} color={theme.text.secondary} />
      <Text style={[styles.infoPillText, { color: theme.text.secondary }]}>{text}</Text>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            <View>
              <Image source={{ uri: activity.image }} style={styles.activityImage} />
              <TouchableOpacity style={[styles.headerButton, styles.backButton]} onPress={onClose}>
                <Ionicons name="arrow-back-outline" size={24} color={theme.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.headerButton, styles.favoriteButton]}>
                <Ionicons name="heart-outline" size={24} color={theme.text.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.detailsContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Ionicons name="tennisball-outline" size={16} color={theme.primary} />
                <Text style={[styles.categoryText, { color: theme.primary }]}>{activity.category.toUpperCase()}</Text>
              </View>

              <Text style={[styles.title, { color: theme.text.primary }]}>{activity.title}</Text>
              <TouchableOpacity>
                <Text style={{ fontFamily: FONTS.medium, color: theme.text.secondary, textDecorationLine: 'underline' }}>View Reviews</Text>
              </TouchableOpacity>

              <View style={styles.pillsContainer}>
                <InfoPill icon="location-outline" text="Central Park" />
                <InfoPill icon="people-outline" text="12/25 spots" />
                <InfoPill icon="time-outline" text="2 hours" />
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>What you'll do</Text>
                <Text style={[styles.description, { color: theme.text.secondary }]}>
                  Join us for a scenic hike through the beautiful trails of Central Park. This is a great opportunity to meet new people, enjoy nature, and get some exercise. All skill levels are welcome!
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Hosted by</Text>
                <View style={[styles.hostInfo, { backgroundColor: theme.surface }]}>
                  <Image source={{ uri: 'https://i.pravatar.cc/150?u=' + activity.host }} style={styles.hostAvatar} />
                  <View>
                    <Text style={[styles.hostName, { color: theme.text.primary }]}>{activity.host}</Text>
                    <Text style={{ color: theme.text.secondary }}>Joined in 2024</Text>
                  </View>
                </View>
              </View>

            </View>
          </ScrollView>

          <View style={[styles.footer, { borderTopColor: theme.background, backgroundColor: theme.surface }]}>
            <View>
              <Text style={{ color: theme.text.secondary }}>Price</Text>
              <Text style={[styles.price, { color: theme.text.primary }]}>Free</Text>
            </View>
            <TouchableOpacity style={[styles.joinButton, { backgroundColor: theme.primary }]}>
              <Text style={[styles.joinButtonText, { color: theme.text.inverse }]}>Join Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    height: '95%',
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  activityImage: {
    width: '100%',
    height: 350,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerButton: {
    position: 'absolute',
    top: 50,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    left: 20,
  },
  favoriteButton: {
    right: 20,
  },
  detailsContainer: {
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  categoryText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    marginBottom: 8,
  },
  pillsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
  },
  infoPillText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    marginBottom: 8,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 16,
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  hostName: {
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    paddingBottom: 30,
    borderTopWidth: 1,
  },
  price: {
    fontFamily: FONTS.bold,
    fontSize: 24,
  },
  joinButton: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 16,
  },
  joinButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
});

export default ActivityDetailModal; 