import { Image } from 'expo-image';
import { Platform, StyleSheet, View, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SoftTabThree from '@/components/buttomNavigator/SoftTabThree';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, Pressable, Button } from 'react-native';

// const tableHeader = ['สถานี', 'ที่ตั้ง', 'ระดับน้ำ (ม.รทก)', 'ระดับตลิ่ง (ม.รทก)', 'สถานการณ์น้ำ', 'แนวโน้ม', 'เวลา'];
// const tableData = [
//   { key: '2', col1: 'คลองแม่พุง', col2: 'ต.ป่าแงะ อ.ป่าแดด', col3: '384.29	', col4: '384.43	', col5: 'น้ำมาก', col6: 'ต่ำกว่าตลิ่ง (ม.) 0.14', col7: '08:00 น.' },
//   { key: '3', col1: 'สะพานอิงอุดม', col2: 'ต.ศรีดอนชัย อ.เชียงของ', col3: '384.29	', col4: '384.43	', col5: 'น้ำมาก', col6: 'ต่ำกว่าตลิ่ง (ม.) 0.14', col7: '10:00 น.' },
//   { key: '4', col1: 'เทิง', col2: 'ต.เวียง อ.เทิง', col3: '384.29	', col4: '384.43	', col5: 'น้ำมาก', col6: 'ต่ำกว่าตลิ่ง (ม.) 0.14', col7: '12:00 น.' },
// ];


const tableHeader = ['สถานี', 'ระดับน้ำ (ม.รทก)', 'สถานการณ์น้ำ', 'เวลา'];
const allTableData = [
  [
    { key: '1', col1: 'คลองแม่พุง', col2: '384.29', col3: 'น้ำมาก', col4: '08:00 น.' },
    { key: '2', col1: 'สะพานอิงอุดม', col2: '384.29', col3: 'น้ำน้อย', col4: '10:00 น.' },
    { key: '3', col1: 'เทิง', col2: '384.29', col3: 'น้ำปกติ', col4: '12:00 น.' },
    { key: '4', col1: 'เชียงราย', col2: '385.00', col3: 'น้ำน้อยวิกฤต', col4: '09:00 น.' },
    { key: '5', col1: 'แม่สาย', col2: '386.00', col3: 'น้ำล้นตลิ่ง', col4: '11:00 น.' },
    { key: '6', col1: 'คลองแม่พุง', col2: '384.29', col3: 'น้ำมาก', col4: '08:00 น.' },
    { key: '7', col1: 'สะพานอิงอุดม', col2: '384.29', col3: 'น้ำมาก', col4: '10:00 น.' },
    { key: '8', col1: 'เทิง', col2: '384.29', col3: 'น้ำมาก', col4: '12:00 น.' },
    { key: '9', col1: 'เชียงราย', col2: '385.00', col3: 'น้ำปกติ', col4: '09:00 น.' },
    { key: '10', col1: 'แม่สาย', col2: '386.00', col3: 'น้ำปกติ', col4: '11:00 น.' },
  ],
  [
    { key: '1', col1: 'คลองแม่พุง', col2: '384.29', col3: 'น้ำมาก', col4: '08:00 น.' },
    { key: '2', col1: 'สะพานอิงอุดม', col2: '384.29', col3: 'น้ำมาก', col4: '10:00 น.' },
    { key: '3', col1: 'เทิง', col2: '384.29', col3: 'น้ำมาก', col4: '12:00 น.' },
    { key: '4', col1: 'เชียงราย', col2: '385.00', col3: 'น้ำปกติ', col4: '09:00 น.' },
    { key: '5', col1: 'แม่สาย', col2: '386.00', col3: 'น้ำปกติ', col4: '11:00 น.' },
  ]
];


const dropdownOptions = [
  { label: 'อำเภอเมืองเชียงราย', value: 0 },
  { label: 'อำเภอแม่จัน', value: 1 },
];

export default function HomeScreen() {
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRow, setModalRow] = useState(null);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#8eb2f1ff', dark: '#1D3D47' }}
      headerImage={
        <View style={{ alignItems: 'center', flex: 1, paddingLeft: 16, marginTop: 15 }}>
          <Image
            source={require('@/assets/images/44616-removebg-preview.png')}
            style={{ width: 50, height: 50, marginRight: 12 }}
          />
          <ThemedText style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
            น้ำท่วมเราพร้อม!
          </ThemedText>
        </View>
      }
    >

      {/* Popup Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 24,
            borderRadius: 12,
            minWidth: 250,
            alignItems: 'center'
          }}>
            <ThemedText style={{ fontWeight: 'bold', fontSize: 18, color: '#e53935' }}>แจ้งเตือนน้ำล้นตลิ่ง</ThemedText>
            {modalRow && (
              <>
                <ThemedText>สถานี: test</ThemedText>
              </>
            )}
            <Button title="ปิด" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Dropdown */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedDataIndex}
          onValueChange={(itemValue) => setSelectedDataIndex(itemValue)}
          style={styles.picker}
        >
          {dropdownOptions.map(option => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      <ThemedText style={{ marginTop: 8, marginBottom: 10 , textAlign: "center", fontSize: 15 }}>
        ข้อมูลสถานีวัดระดับน้ำในพื้นที่ {dropdownOptions[selectedDataIndex].label} <br /> ณ วันที่ {new Date().getDate()} {getThaiMonthName(new Date())} {new Date().getFullYear() + 543} เวลา {new Date().toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </ThemedText>

      <View style={styles.tableContainer}>
        {/* Header Row */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          {tableHeader.map((header, idx) => (
            <ThemedText
              key={idx}
              style={[
                styles.tableCell,
                styles.tableCellHeader,
                idx === tableHeader.length - 1 && styles.tableCellLast,
              ]}
            >
              {header}
            </ThemedText>
          ))}
        </View>
        {/* Data Rows */}
        <FlatList
          data={allTableData[selectedDataIndex]}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <ThemedText style={styles.tableCell}>{item.col1}</ThemedText>
              <ThemedText style={styles.tableCell}>{item.col2}</ThemedText>
              <ThemedText
                style={[
                  styles.col3Cell,
                  item.col3 === 'น้ำมาก' && { backgroundColor: '#2196f3', borderColor: '#2196f3', color: '#fff' },         // blue
                  item.col3 === 'น้ำปกติ' && { backgroundColor: '#43a047', borderColor: '#43a047', color: '#fff' },         // green
                  item.col3 === 'น้ำล้นตลิ่ง' && { backgroundColor: '#e53935', borderColor: '#e53935', color: '#fff' },    // red
                  item.col3 === 'น้ำน้อย' && { backgroundColor: '#ffd600', borderColor: '#ffd600', color: '#000' },         // yellow
                  item.col3 === 'น้ำน้อยวิกฤต' && { backgroundColor: '#ff9800', borderColor: '#ff9800', color: '#fff' },   // orange
                ]}
              >
                {item.col3}
              </ThemedText>
              <ThemedText style={styles.tableCell}>{item.col4}</ThemedText>
            </View>
          )}
        />
      </View>
    </ParallaxScrollView>
  );
}

function getThaiMonthName(date: Date) {
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  return thaiMonths[date.getMonth()];
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
    alignSelf: 'flex-start',
    marginTop: 30,
    marginLeft: 30
  },
  tableContainer: {
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
    fontSize: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
    borderStartWidth: 1,
    borderStartColor: '#eee',
  },
  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  tableCellLast: {
    borderRightWidth: 0,
    borderStartWidth: 0,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%', // Make container full width
    alignSelf: 'center', // Center the container
  },
  picker: {
    height: 40,
    width: '100%',
  },
  col3Cell: {
    backgroundColor: '#ffe082', // fill color (light yellow)
    borderColor: '#ffe082',     // border color (amber)
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    fontSize: 11,
    marginRight: 18,
    marginLeft: 18,
    textAlign: 'center',
    paddingVertical: 4,   // space above/below text inside border
    paddingHorizontal: 8, // space left/right inside border
    marginHorizontal: 8,  // space outside border (left/right)
  },
});