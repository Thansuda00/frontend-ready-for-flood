import { Tabs } from 'expo-router';
import React from 'react';

import TabBarBackground from '@/components/ui/TabBarBackground';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';

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
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ข้อมูลน้ำ',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'rainy' : 'rainy-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'แชทกับน้องต้นน้ำ',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="floodGuide"
        options={{
          title: 'คู่มือ',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="emergencyContacts"
        options={{
          title: 'ฉุกเฉิน',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'call' : 'call-outline'} size={24} color={color} />
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
            <Ionicons name={focused ? 'cloudy' : 'cloudy-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
