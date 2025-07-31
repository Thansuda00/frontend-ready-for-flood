import { Image } from 'expo-image';
import { Platform, StyleSheet, View, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SoftTabThree from '@/components/buttomNavigator/SoftTabThree';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

// const tableHeader = ['สถานี', 'ที่ตั้ง', 'ระดับน้ำ (ม.รทก)', 'ระดับตลิ่ง (ม.รทก)', 'สถานการณ์น้ำ', 'แนวโน้ม', 'เวลา'];
// const tableData = [
//   { key: '2', col1: 'คลองแม่พุง', col2: 'ต.ป่าแงะ อ.ป่าแดด', col3: '384.29	', col4: '384.43	', col5: 'น้ำมาก', col6: 'ต่ำกว่าตลิ่ง (ม.) 0.14', col7: '08:00 น.' },
//   { key: '3', col1: 'สะพานอิงอุดม', col2: 'ต.ศรีดอนชัย อ.เชียงของ', col3: '384.29	', col4: '384.43	', col5: 'น้ำมาก', col6: 'ต่ำกว่าตลิ่ง (ม.) 0.14', col7: '10:00 น.' },
//   { key: '4', col1: 'เทิง', col2: 'ต.เวียง อ.เทิง', col3: '384.29	', col4: '384.43	', col5: 'น้ำมาก', col6: 'ต่ำกว่าตลิ่ง (ม.) 0.14', col7: '12:00 น.' },
// ];


const tableHeader = ['สถานี', 'ระดับน้ำ (ม.รทก)', 'สถานการณ์น้ำ', 'เวลา'];
const allTableData = [
  [
    { key: '2', col1: 'คลองแม่พุง', col2: '384.29', col3: '384.43', col4: '08:00 น.' },
    { key: '3', col1: 'สะพานอิงอุดม', col2: '384.29', col3: '384.43', col4: '10:00 น.' },
    { key: '4', col1: 'เทิง', col2: '384.29', col3: '384.43', col4: '12:00 น.' },
  ],
  [
    { key: '5', col1: 'เชียงราย', col2: 'ต.รอบเวียง', col3: '385.00', col4: '385.50', col5: 'ปกติ', col6: 'คงที่', col7: '09:00 น.' },
    { key: '6', col1: 'แม่สาย', col2: 'ต.แม่สาย', col3: '386.00', col4: '386.50', col5: 'ปกติ', col6: 'ลดลง', col7: '11:00 น.' },
  ]
];


const dropdownOptions = [
  { label: 'ชุดข้อมูล 1', value: 0 },
  { label: 'ชุดข้อมูล 2', value: 1 },
];

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
        <ThemedText type="title">ติดต่อฉุกเฉิน!</ThemedText>
  
      </ThemedView>
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
  tableContainer: {
    marginTop: 32,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableHeader: {
    backgroundColor: '#e3f2fd',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableCellLast: {
    borderRightWidth: 0,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  col3Cell: {
    backgroundColor: '#ffe082', // fill color (light yellow)
    borderColor: '#ffb300',     // border color (amber)
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
  },
});

