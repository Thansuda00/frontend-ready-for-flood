import TabBarBackground from '@/components/ui/TabBarBackground';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Dimensions, Image, Linking, Platform, Pressable } from 'react-native';

import type { GestureResponderEvent } from 'react-native';

const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 70 : 64;
const SCREEN_WIDTH = Dimensions.get('window').width;

type AnimatedTabBarButtonProps = {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
};

function AnimatedTabBarButton({ children, onPress }: AnimatedTabBarButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = (event: GestureResponderEvent) => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
    if (onPress) onPress(event);
  };

  return (
    <Pressable onPress={handlePress} style={{ flex: 1 }}>
      <Animated.View style={{ transform: [{ scale }], alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#90caf9',
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: TAB_BAR_HEIGHT,
          width: SCREEN_WIDTH,
          backgroundColor: '#fff',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          elevation: 10,
          shadowColor: '#2196f3',
          shadowOpacity: 0.13,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 2 },
          paddingHorizontal: 0,
          flexDirection: 'row',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 8 : 4,
          fontFamily: 'Kanit-Regular',
        },
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 6,
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarButton: (props) => <AnimatedTabBarButton {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ข้อมูลน้ำ',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'rainy' : 'rainy-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'แชทกับน้องต้นน้ำ',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/images/icon.png')}
              style={{
                width: 32,
                height: 32,
                tintColor: color,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="floodGuide"
        options={{
          title: 'คู่มือ',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="emergencyContacts"
        options={{
          title: 'ฉุกเฉิน',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'call' : 'call-outline'} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="weatherWeb"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Linking.openURL('https://tmd.go.th/forecast/daily');
          },
        }}
        options={{
          title: 'พยากรณ์อากาศ',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cloudy' : 'cloudy-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
