import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProviders';
import { FONTS } from '@/constants/Fonts';

const MOCK_THREADS = [
  {
    id: '1',
    title: 'Hiking Trails',
    description: 'Hey everyone, I\'m new to the community and looking for recommendations on the best hiking trails in the area. Any suggestions?',
    lastPost: '2d ago',
    replies: 12,
  },
  {
    id: '2',
    title: 'Board Game Night',
    description: 'I\'m organizing a board game night this weekend and looking for players. We\'ll have a variety of games, from strategy to party games. All skill levels welcome!',
    lastPost: '1d ago',
    replies: 25,
  },
  {
    id: '3',
    title: 'Picnic in the Park',
    description: 'I\'m planning a picnic in Central Park next Saturday and would love to meet new people. Bring your favorite snacks and drinks!',
    lastPost: '3d ago',
    replies: 8,
  },
  {
    id: '4',
    title: 'Running Partner',
    description: 'I\'m looking for a running partner to train for the upcoming marathon. I run at a moderate pace and prefer morning runs.',
    lastPost: '1d ago',
    replies: 15,
  },
  {
    id: '5',
    title: 'Book Club',
    description: 'I\'m starting a book club and looking for members. We\'ll read a new book each month and discuss it over coffee. Our first book is \'The Great Gatsby\'.',
    lastPost: '2d ago',
    replies: 20,
  },
];

const ThreadItem = ({ item }: { item: any }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={[styles.threadItem, { backgroundColor: theme.surface }]}>
      <View style={[styles.threadIconContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.threadIconText, { color: theme.text.secondary }]}>#</Text>
      </View>
      <View style={styles.threadContent}>
        <Text style={[styles.threadTitle, { color: theme.text.primary }]}>{item.title}</Text>
        <Text style={[styles.threadDescription, { color: theme.text.secondary }]} numberOfLines={2}>{item.description}</Text>
        <Text style={[styles.threadMeta, { color: theme.text.secondary }]}>
          Last post {item.lastPost} · {item.replies} replies
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ThreadsPage = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Discussions');

  const TabButton = ({ name }: { name: string }) => {
    const isActive = activeTab === name;
    return (
      <TouchableOpacity
        style={[styles.tab, { backgroundColor: isActive ? theme.primary : theme.surface }]}
        onPress={() => setActiveTab(name)}
      >
        <Text style={[styles.tabText, { color: isActive ? theme.text.inverse : theme.text.primary }]}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text.primary }]}>Community</Text>
        <View style={styles.tabsContainer}>
          <TabButton name="Discussions" />
          <TabButton name="Threads" />
        </View>
      </View>

      <FlatList
        data={MOCK_THREADS}
        renderItem={({ item }) => <ThreadItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />

      <TouchableOpacity style={[styles.fab, { backgroundColor: theme.text.primary }]}>
        <Ionicons name="add-outline" size={28} color={theme.background} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 4,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 99,
  },
  tabText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  threadItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    gap: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  threadIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  threadIconText: {
    fontFamily: FONTS.bold,
    fontSize: 24,
  },
  threadContent: {
    flex: 1,
    gap: 6,
  },
  threadTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
  threadDescription: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  threadMeta: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default ThreadsPage;