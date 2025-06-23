import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Tabs, useSegments } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, useAnimatedProps, interpolateColor } from 'react-native-reanimated';
import { verticalScale,horizontalScale,moderateScale } from "@/utils/ResponsiveValue";

import { COLORS } from "../../../constants/Colors";
import { FONTS } from "../../../constants/Fonts";
import { useTheme } from "@/providers/ThemeProviders";

// Constants
const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = verticalScale(80);
const TAB_CONTAINER_WIDTH = width - horizontalScale(20);



const springConfig = { damping: 20, stiffness: 150, mass: 1 };

const TAB_CONFIG = {
  '(home)': { icon: 'home', label: 'Home' },
  '(threads)': { icon: 'chatbubbles-outline', label: 'Threads' },
  '(host)': { icon: 'add-circle-outline', label: 'Host' },
  '(paid)': { icon: 'card-outline', label: 'Paid' },
  '(profile)': { icon: 'person-outline', label: 'Profile' },
  '(discover)': { icon: 'search-outline', label: 'Discover' }
};

const NUM_TABS = Object.keys(TAB_CONFIG).length;
const TAB_WIDTH = TAB_CONTAINER_WIDTH / NUM_TABS;

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const AnimatedText = Animated.createAnimatedComponent(Text);

const CustomTabBar = ({ state, navigation }: { state: any, navigation: any }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const activeIndex = useSharedValue(state.index);

  useEffect(() => {
    activeIndex.value = withSpring(state.index, springConfig);
  }, [state.index]);

  const animatedPillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: activeIndex.value * TAB_WIDTH }],
    backgroundColor: theme.button.default.background,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.tabBarContainer}>
        {/* Sliding Pill Background */}
        <Animated.View style={[styles.pill, animatedPillStyle]} />

        {/* Tab Items */}
        {state.routes.map((route: any, index: any) => {
          const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];
          if (!config) return null;

          const animatedIconProps = useAnimatedProps(() => ({
            color: interpolateColor(
              activeIndex.value,
              [index - 1, index, index + 1],
              [theme.text.secondary, theme.text.inverse, theme.text.secondary],
            )
          }));

          const animatedLabelStyle = useAnimatedStyle(() => ({
            color: interpolateColor(
              activeIndex.value,
              [index - 1, index, index + 1],
              [theme.text.secondary, theme.text.inverse, theme.text.secondary],
            ),
            opacity: withSpring(activeIndex.value === index ? 1 : 0.5),
            transform: [{ scale: withSpring(activeIndex.value === index ? 1 : 0.8) }]
          }));

          return (
            <TouchableOpacity 
              key={route.key} 
              onPress={() => navigation.navigate(route.name)} 
              style={styles.tabItem}
            >
              <AnimatedIcon
                name={config.icon as any}
                size={moderateScale(18)}
                animatedProps={animatedIconProps}
              />
              <AnimatedText style={[styles.label, animatedLabelStyle]}>
                {config.label}
              </AnimatedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const TabsLayout = () => {
  const segments = useSegments();
  const isDetailRoute = segments.length > 2;

  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: isDetailRoute ? { display: 'none' } : undefined,
      }}
    >
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="(threads)" />
      <Tabs.Screen name="(host)" />
      <Tabs.Screen name="(paid)" />
      <Tabs.Screen name="(profile)" />
      <Tabs.Screen name="(discover)" />
    </Tabs>
  );
};

export default TabsLayout;

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(20),
    left: horizontalScale(10),
    right: horizontalScale(10),
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarContainer: {
    width: TAB_CONTAINER_WIDTH,
    height: verticalScale(64),
    borderRadius: moderateScale(32),
    backgroundColor: theme.surface,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 10,
    position: 'relative',
    borderWidth: 1,
    borderColor: theme.border,
  },
  pill: {
    position: 'absolute',
    width: TAB_WIDTH,
    height: '100%',
    borderRadius: moderateScale(32),
  },
  tabItem: {
    width: TAB_WIDTH,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(2),
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: moderateScale(11),
  },
});