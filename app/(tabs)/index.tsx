import { Image } from 'expo-image';
import { Platform, StyleSheet, View, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SoftTabThree from '@/components/buttomNavigator/SoftTabThree';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { Modal, Pressable, Button } from 'react-native';

const tableHeader = ['สถานี', 'ระดับน้ำ (ม.รทก)', 'สถานการณ์น้ำ', 'เวลา'];
const allTableData = [
  [
    { key: '1', col1: 'คลองแม่พุง', col2: '384.29', col3: 'น้ำล้นตลิ่ง', col4: '08:00 น.' },
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
  const [modalRows, setModalRows] = useState<
    { key: string; col1: string; col2: string; col3: string; col4: string }[]
  >([]);

  useEffect(() => {
    const foundRows = allTableData[selectedDataIndex].filter(row => row.col3 === 'น้ำล้นตลิ่ง');
    if (foundRows.length > 0) {
      setModalRows(foundRows);
      setModalVisible(true);
    } else {
      setModalRows([]);
      setModalVisible(false);
    }
  }, [selectedDataIndex]);

  return (
    <View style={{ flex: 1 }}>
      {/* Background Image */}
      <Image
        source={require('@/assets/images/15055.jpg')}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }} contentFit="cover"
        blurRadius={0}
      />

      <ParallaxScrollView
        headerBackgroundColor={{ light: '#b6d9f4ff', dark: '#1D3D47' }}
        headerImage={
          <View style={styles.headerRow}>
            <Image
              source={require('@/assets/images/44616-removebg-preview.png')}
              style={styles.reactLogo}
            />
            <ThemedText style={styles.headerTitle}>
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
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>แจ้งเตือนน้ำล้นตลิ่ง</ThemedText>
              {modalRows.map((row, idx) => (
                <View key={row.key} style={{ marginBottom: 12 }}>
                  <ThemedText style={styles.modalStation}>สถานี: {row.col1}</ThemedText>
                  <ThemedText>ระดับน้ำ: {row.col2}</ThemedText>
                  <ThemedText>เวลา: {row.col4}</ThemedText>
                </View>
              ))}
              <Button title="ปิด" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

        {/* Dropdown */}
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownInner}>
            <ThemedText style={styles.dropdownLabel}>เลือกพื้นที่</ThemedText>
            <Picker
              selectedValue={selectedDataIndex}
              onValueChange={(itemValue) => setSelectedDataIndex(itemValue)}
              mode="dropdown"
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {dropdownOptions.map(option => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        <ThemedText style={styles.infoText}>
          ข้อมูลสถานีวัดระดับน้ำในพื้นที่ <ThemedText style={styles.infoHighlight}>{dropdownOptions[selectedDataIndex].label}</ThemedText>
          {'\n'}ณ วันที่ {new Date().getDate()} {getThaiMonthName(new Date())} {new Date().getFullYear() + 543}
          {' '}เวลา {new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
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
            keyExtractor={item => item.key}
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
    </View>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    gap: 12,
  },
  reactLogo: {
    height: 50,
    width: 50,
    marginRight: 12,
  },
  headerTitle: {
    color: '#1976d2',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    minWidth: 250,
    alignItems: 'center',
    elevation: 4,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#e53935',
    marginBottom: 8,
  },
  modalStation: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#1976d2',
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    alignSelf: 'center',
    elevation: 1,
  },
  dropdownInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: 'bold',
    marginRight: 12,
  },
  picker: {
    width: '100%',
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  pickerItem: {
    fontSize: 16,
    color: '#1976d2',
    fontFamily: 'System',
  },
  infoText: {
    marginTop: 14,
    marginBottom: 14,
    textAlign: "center",
    fontSize: 15,
    color: '#333',
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 16,
    lineHeight: 22,
  },
  infoHighlight: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  tableContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 24,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#1976d2',
  },
  tableCell: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
    color: '#333',
    borderRightWidth: 1,
    borderRightColor: '#e3f2fd',
    borderStartWidth: 1,
    borderStartColor: '#e3f2fd',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#1976d2',
    borderRightWidth: 0,
    borderStartWidth: 0,
  },
  tableCellLast: {
    borderRightWidth: 0,
    borderStartWidth: 0,
  },
  col3Cell: {
    backgroundColor: '#ffe082',
    borderColor: '#ffe082',
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
    fontSize: 13,
    marginHorizontal: 8,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 3,
    fontWeight: 'bold',
    minWidth: 45,
  },
});