import TabBarBackground from '@/components/ui/TabBarBackground';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Image, Linking, Pressable } from 'react-native';

import type { GestureResponderEvent } from 'react-native';

type AnimatedTabBarButtonProps = {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
};

function AnimatedTabBarButton({ children, onPress }: AnimatedTabBarButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = (event: GestureResponderEvent) => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    if (onPress) onPress(event);
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={{ transform: [{ scale }] }}>
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
          height: 64,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 10,
          right: 10,
          bottom: 10,
          elevation: 10,
          shadowColor: '#2196f3',
          shadowOpacity: 0.13,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 2 },
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 4,
          fontFamily: 'Kanit-Regular', // Applied font family
        },
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -20,
        },
        tabBarButton: (props) => <AnimatedTabBarButton {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ข้อมูลน้ำ',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons style={{ marginLeft: 65, width: 40, height: 22 }} name={focused ? 'rainy' : 'rainy-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'แชทกับน้องต้นน้ำ',
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/icon.png')}
              style={{ width: 40, height: 22, marginLeft: 40 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="floodGuide"
        options={{
          title: 'คู่มือ',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons style={{ marginLeft: 70, width: 40, height: 22 }} name={focused ? 'book' : 'book-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="emergencyContacts"
        options={{
          title: 'ฉุกเฉิน',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons style={{ marginLeft: 65, width: 40, height: 22 }} name={focused ? 'call' : 'call-outline'} size={24} color={color} />
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
            <Ionicons style={{ marginLeft: 65, width: 40, height: 22 }} name={focused ? 'cloudy' : 'cloudy-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'เกี่ยวกับแอป',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons style={{ marginLeft: 65, width: 40, height: 22 }} name={focused ? 'information-circle' : 'information-circle-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
