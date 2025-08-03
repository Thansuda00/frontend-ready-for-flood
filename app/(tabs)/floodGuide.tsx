import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const floodGuideSections = [
  {
    title: '1. ก่อนเกิดเหตุ',
    icon: 'cloud-outline',
    color: '#1976d2',
    tips: [
      'เช็คข่าวพยากรณ์อากาศ เพื่อเตรียมรับมือสถานการณ์ได้อย่างทันท่วงที',
      'วางกระสอบทรายรอบบ้าน เพื่ออุดช่องว่างไม่ให้น้ำไหลเข้าบ้าน',
      'เตรียมของใช้จำเป็น และหมายเลขโทรศัพท์ฉุกเฉิน เพื่อขอความช่วยเหลือจากหน่วยงานที่เกี่ยวข้อง',
    ],
  },
  {
    title: '2. ระหว่างเกิดเหตุ',
    icon: 'rainy-outline',
    color: '#e53935',
    tips: [
      'ปิดระบบไฟฟ้า แก๊ส และน้ำให้เรียบร้อย เพื่อป้องกันอันตรายจากไฟฟ้ารั่วหรือไฟดูด',
      'อพยพไปยังพื้นที่ปลอดภัย หากไม่สามารถอพยพได้ ควรรีบติดต่อหน่วยงานรัฐเพื่อขอความช่วยเหลือ',
      'หลีกเลี่ยงการเดินหรือขับรถลุยน้ำ เพราะเสี่ยงต่อการถูกกระแสน้ำพัดพา',
    ],
  },
  {
    title: '3. หลังเกิดเหตุ',
    icon: 'sunny-outline',
    color: '#43a047',
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
      headerImage={
        <View style={styles.headerRow}>
          <Ionicons
            name="water-sharp"
            size={44}
            color="#ffffffff"
            style={styles.headerWaterIcon}
          />
          <View style={styles.headerTextBox}>
            <ThemedText style={styles.headerTitle}>
              คำแนะนำรับมือภัยน้ำท่วม
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              เตรียมพร้อม ปลอดภัยทั้งก่อน ระหว่าง และหลังน้ำท่วม
            </ThemedText>
          </View>
        </View>
      }
    >

      <View style={styles.container}>
        {floodGuideSections.map((section, idx) => (
          <View
            key={idx}
            style={[
              styles.sectionBlock,
              {
                borderLeftColor: section.color,
                backgroundColor: `${section.color}10`,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Ionicons
                name={section.icon as any}
                size={22}
                color={section.color}
                style={{ marginRight: 8 }}
              />
              <ThemedText
                style={[styles.sectionTitle, { color: section.color }]}
              >
                {section.title}
              </ThemedText>
            </View>
            {section.tips.map((tip, tipIdx) => (
              <View key={tipIdx} style={styles.tipRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={section.color}
                  style={{ marginRight: 6, marginTop: 2 }}
                />
                <ThemedText style={styles.tip}>{tip}</ThemedText>
              </View>
            ))}
          </View>
        ))}
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
    fontSize: 15,
    opacity: 0.85,
    fontWeight: '500',
    marginTop: 2,
    marginLeft: 2,
    marginRight: 2,
  },
  headerWaterIcon: {
    marginLeft: 12,
    opacity: 0.92,
  },
  reactLogo: {
    height: 64,
    width: 64,
    marginRight: 0,
    borderRadius: 16,
    shadowColor: '#1976d2',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  titleText: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    margin: 16,
    backgroundColor: '#f5fafd',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#1976d2',
    shadowOpacity: 0.09,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionBlock: {
    marginBottom: 22,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 5,
    shadowColor: '#1976d2',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 7,
    marginLeft: 6,
  },
  tip: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    flex: 1,
  },
});
