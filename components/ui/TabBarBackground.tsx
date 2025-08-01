import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';

export default function TabBarBackground() {
  const fadeAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.85,
          duration: 1600,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.tabBar,
        {
          opacity: fadeAnim,
          shadowColor: Platform.OS === 'ios' ? '#2196f3' : '#000',
        },
      ]}
    >
      <LinearGradient
        colors={['#b6d9f4', '#e3f2fd']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 18,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
});

export function useBottomTabOverflow() {
  return 0;
}