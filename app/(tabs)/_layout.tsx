import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons'; // Add this import

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2196f3',
        headerShown: false,
        // tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          android: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute'
          },
          default: {
            borderRadius: 8,
            backgroundColor: '#aed3f1ff', // background color

          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ข้อมูลน้ำระดับจังหวัด',
          tabBarIcon: ({ color }) => <Ionicons size={15} name="rainy" color={color} />,
          tabBarLabelStyle: {
            fontSize: 8, // smaller font size
            marginTop: 1, // bottom margin
            // You can also use marginHorizontal or margin for all sides
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'แชทกับเรา',
          tabBarIcon: ({ color }) => <Ionicons size={15} name="chatbubbles" color={color} />,
          tabBarLabelStyle: {
            fontSize: 8, // smaller font size
            marginTop: 1, // bottom margin\]\
            // You can also use marginHorizontal or margin for all sides
          },
        }}
      />
      <Tabs.Screen
        name="floodGuide"
        options={{
          title: 'คำแนะนำรับมือภัยน้ำท่วม',
          tabBarIcon: ({ color }) => <Ionicons name="document-text" size={15} color={color} />,
          tabBarLabelStyle: {
            fontSize: 8, // smaller font size
            marginTop: 1, // bottom margin\]\
            // You can also use marginHorizontal or margin for all sides
          },
        }}
      />
      <Tabs.Screen
        name="emergencyContacts"
        options={{
          title: 'ติดต่อฉุกเฉิน',
          tabBarIcon: ({ color }) => <Ionicons name="alert-circle" size={18} color={color} />
          ,
          tabBarLabelStyle: {
            fontSize: 8, // smaller font size
            marginTop: 1, // bottom margin\]\
            // You can also use marginHorizontal or margin for all sides
          },
        }}
      />
    </Tabs>
  );
}
