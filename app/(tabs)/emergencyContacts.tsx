import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Linking, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons'; // Add this import

export default function HomeScreen() {
  const phoneNumber = '1784';

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
        <ThemedText type="title">ติดต่อฉุกเฉิน!</ThemedText>
      </ThemedView>

      <View style={styles.card}>
        <ThemedText style={styles.title}>
          เบอร์โทรสายด่วน {phoneNumber}
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          จากกรมป้องกันและบรรเทาสาธารณภัย
        </ThemedText>
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="call" size={18} color="#fff" style={{ marginRight: 8 }} />
            <ThemedText style={styles.buttonText}>โทร {phoneNumber}</ThemedText>
          </View>
        </Pressable>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  reactLogo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginTop: 50,
  },
  card: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

