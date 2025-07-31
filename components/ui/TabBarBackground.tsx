// This is a shim for web and Android where the tab bar is generally opaque.
import React from 'react';
import { View } from 'react-native';

export default function TabBarBackground() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#d1e7f8ff',
      borderRadius: 8,
    }} />
  );
}

export function useBottomTabOverflow() {
  return 0;
}