import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';

export default function EmergencyContactsScreen() {
  const phoneNumber = '1784';
  const facebookUrl = 'https://www.facebook.com/profile.php?id=61576044613232';
  const lineUrl = 'https://line.me/R/ti/p/@769btwlv';

  return (
    <ParallaxScrollView
      headerImage={
        <View style={styles.headerRow}>
          <Ionicons
            name="alert-circle"
            size={44}
            color="#ffffffff"
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
      {/* Emergency Phone Section */}
      <View style={styles.card}>
        <Ionicons name="call" size={40} color="#e53935" style={styles.icon} />
        <ThemedText style={styles.title}>
          เบอร์โทรสายด่วน {phoneNumber}
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          จากกรมป้องกันและบรรเทาสาธารณภัย
        </ThemedText>
        <Pressable
          style={[styles.button, styles.phoneButton]}
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
        >
          <ThemedText style={styles.buttonText}>โทร {phoneNumber}</ThemedText>
        </Pressable>
      </View>

      {/* Social Contacts Section */}
      <View style={styles.card}>
        <Ionicons name="chatbubbles" size={40} color="#06C755" style={styles.icon} />
        <ThemedText style={styles.title}>
          ช่องทางติดต่อออนไลน์
        </ThemedText>

        {/* Facebook Contact */}
        <Pressable
          style={[styles.button, styles.facebookButton]}
          onPress={() => Linking.openURL(facebookUrl)}
        >
          <View style={styles.socialRow}>
            <Ionicons name="logo-facebook" size={24} color="#fff" style={styles.socialIcon} />
            <ThemedText style={styles.buttonText}>Facebook</ThemedText>
          </View>
          <ThemedText style={styles.socialSubtitle}>
            น้ำท่วมเราพร้อม
          </ThemedText>
        </Pressable>

        {/* LINE Contact */}
        <Pressable
          style={[styles.button, styles.lineButton]}
          onPress={() => Linking.openURL(lineUrl)}
        >
          <View style={styles.socialRow}>
            <Ionicons name="logo-wechat" size={24} color="#fff" style={styles.socialIcon} />
            <ThemedText style={styles.buttonText}>LINE</ThemedText>
          </View>
          <Image
            source={require('@/assets/images/line-qr-contact.jpg')}
            style={styles.qrImage}
          />
        </Pressable>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
    color: '#ffffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  headerSubtitle: {
    color: '#ffffffff',
    fontSize: 13,
    opacity: 0.85,
    fontWeight: '500',
    marginTop: 2,
    marginLeft: 2,
    marginRight: 7,
  },
  headerAlertIcon: {
    marginLeft: 12,
    opacity: 0.92,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    margin: 18,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    marginBottom: 12,
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
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 2,
  },
  phoneButton: {
    backgroundColor: '#e53935',
  },
  facebookButton: {
    backgroundColor: '#1877f2',
    marginTop: 16,
  },
  lineButton: {
    backgroundColor: '#06C755',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  socialIcon: {
    marginRight: 8,
  },
  socialSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  qrImage: {
    width: 100,
    height: 100,
    marginTop: 12,
    borderRadius: 8,
  },
});

