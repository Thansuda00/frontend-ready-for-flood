import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const phoneNumber = '1784';

  return (
    <ParallaxScrollView
      headerImage={
        <View style={styles.headerRow}>
         <Ionicons
            name="alert-circle"
            size={44}
            color="#e53935"
            style={styles.headerAlertIcon}
          />
          <View style={styles.headerTextBox}>
            <ThemedText style={styles.headerTitle}>ติดต่อฉุกเฉิน</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              เบอร์สายด่วนกรมป้องกันและบรรเทาสาธารณภัย 24 ชั่วโมง
            </ThemedText>
          </View>
 
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Ionicons name="alert-circle" size={26} color="#e53935" style={{ marginRight: 8 }} />
        <ThemedText type="title" style={styles.titleText}>ติดต่อฉุกเฉิน!</ThemedText>
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
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="call" size={20} color="#fff" style={{ marginRight: 10 }} />
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
    gap: 8,
    marginTop: 18,
    marginBottom: 8,
  },
  titleText: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 22,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    margin: 18,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#e53935',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#333',
    marginBottom: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#e53935',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 36,
  paddingBottom: 18,
  gap: 18,
  backgroundColor: 'rgba(255,255,255,0.0)',
},
headerTextBox: {
  flex: 1,
  justifyContent: 'center',
  marginLeft: 12,
},
headerTitle: {
  color: '#e53935',
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 2,
  textShadowColor: '#fff',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
},
headerSubtitle: {
  color: '#e53935',
  fontSize: 15,
  opacity: 0.85,
  fontWeight: '500',
  marginTop: 2,
},
headerAlertIcon: {
  marginLeft: 12,
  opacity: 0.92,
},
reactLogo: {
  height: 64,
  width: 64,
  marginRight: 0,
  borderRadius: 16,
  shadowColor: '#e53935',
  shadowOpacity: 0.12,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
},
});

