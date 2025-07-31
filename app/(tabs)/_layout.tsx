import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

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
            position: 'absolute',
            marginHorizontal: 16, // left and right margin
            marginBottom: 16,     // bottom margin
            marginTop: 8,         // top margin
            borderRadius: 12,     // optional: rounded corners
          },
          default: {
            marginHorizontal: 16,
            marginBottom: 16,
            marginTop: 16,
            borderRadius: 8,
            backgroundColor: '#aed3f1ff', // background color

          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'หน้าแรก',
          tabBarIcon: ({ color }) => <IconSymbol size={15} name="house.fill" color={color} />,
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
          tabBarIcon: ({ color }) => <IconSymbol size={15} name="house.fill" color={color} />,
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
          tabBarIcon: ({ color }) => <IconSymbol size={15} name="house.fill" color={color} />,
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
          tabBarIcon: ({ color }) => <IconSymbol size={15} name="house.fill" color={color} />,
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
