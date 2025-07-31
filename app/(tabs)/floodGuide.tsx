import { Image } from 'expo-image';
import { Platform, StyleSheet, View, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SoftTabThree from '@/components/buttomNavigator/SoftTabThree';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

export default function HomeScreen() {
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffffff', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/44616.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>คำแนะนำรับมือภัยน้ำท่วม</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontSize: 5,
  },
  reactLogo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginTop: 50,
  },

});

