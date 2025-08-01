import { Image } from 'expo-image';
import { Platform, StyleSheet, View, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SoftTabThree from '@/components/buttomNavigator/SoftTabThree';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

const floodGuideSections = [
  {
    title: '1. ก่อนเกิดเหตุ',
    tips: [
      'เช็กข่าวพยากรณ์อากาศ เพื่อเตรียมรับมือสถานการณ์ได้อย่างทันท่วงที',
      'วางกระสอบทรายรอบบ้าน เพื่ออุดช่องว่างไม่ให้น้ำไหลเข้าบ้าน',
      'เตรียมของใช้จำเป็น และหมายเลขโทรศัพท์ฉุกเฉิน เพื่อขอความช่วยเหลือจากหน่วยงานที่เกี่ยวข้อง',
    ],
  },
  {
    title: '2. ระหว่างเกิดเหตุ',
    tips: [
      'ปิดระบบไฟฟ้า แก๊ส และน้ำให้เรียบร้อย เพื่อป้องกันอันตรายจากไฟฟ้ารั่วหรือไฟดูด',
      'อพยพไปยังพื้นที่ปลอดภัย หากไม่สามารถอพยพได้ ควรรีบติดต่อหน่วยงานรัฐเพื่อขอความช่วยเหลือ',
      'หลีกเลี่ยงการเดินหรือขับรถลุยน้ำ เพราะเสี่ยงต่อการถูกกระแสน้ำพัดพา',
    ],
  },
  {
    title: '3. หลังเกิดเหตุ',
    tips: [
      'ทำความสะอาดบ้านหลังน้ำลด เพื่อระบายน้ำขังและฆ่าเชื้อโรคทั้งภายในและภายนอกบ้าน',
      'ให้ผู้เชี่ยวชาญตรวจสอบระบบไฟฟ้าก่อนใช้งาน เพื่อป้องกันอุบัติเหตุจากไฟฟ้าลัดวงจร',
      'ติดตามข่าวสารและปริมาณน้ำฝนอย่างต่อเนื่อง เพื่อให้มั่นใจว่าสถานการณ์กลับเข้าสู่ภาวะปลอดภัย',
    ],
  },
];

export default function FloodGuideTips() {
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
        <ThemedText type="title">คำแนะนำรับมือภัยน้ำท่วม</ThemedText>
      </ThemedView>

      <View style={styles.container}>
        {floodGuideSections.map((section, idx) => (
          <View key={idx} style={styles.sectionBlock}>
            <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
            {section.tips.map((tip, tipIdx) => (
              <ThemedText key={tipIdx} style={styles.tip}>{tip}</ThemedText>
            ))}
          </View>
        ))}
      </View>
    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
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
  container: {
    margin: 16,
    backgroundColor: '#f5fafd',
    borderRadius: 12,
    padding: 16,
  },
  sectionBlock: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
    color: '#1976d2',
  },
  tip: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
    lineHeight: 22,
  },
});
