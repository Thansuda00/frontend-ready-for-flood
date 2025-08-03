import { Image } from 'expo-image';
import { Linking, TouchableOpacity, View, Modal, ScrollView, FlatList, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel'; // Install if not yet: yarn add react-native-reanimated-carousel

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
  ],
  [
    { key: '1', col1: 'คลองแม่พุง', col2: '384.29', col3: 'น้ำมาก', col4: '08:00 น.' },
    { key: '2', col1: 'สะพานอิงอุดม', col2: '384.29', col3: 'น้ำมาก', col4: '10:00 น.' },
    { key: '3', col1: 'เทิง', col2: '384.29', col3: 'น้ำมาก', col4: '12:00 น.' },
    { key: '4', col1: 'เชียงราย', col2: '385.00', col3: 'น้ำปกติ', col4: '09:00 น.' },
    { key: '5', col1: 'แม่สาย', col2: '386.00', col3: 'น้ำปกติ', col4: '11:00 น.' },
  ],
  [
    { key: '1', col1: 'คลองแม่พุง', col2: '384.29', col3: 'น้ำมาก', col4: '08:00 น.' },
    { key: '2', col1: 'สะพานอิงอุดม', col2: '384.29', col3: 'น้ำมาก', col4: '10:00 น.' },
    { key: '3', col1: 'เทิง', col2: '384.29', col3: 'น้ำมาก', col4: '12:00 น.' },
    { key: '4', col1: 'เชียงราย', col2: '385.00', col3: 'น้ำปกติ', col4: '09:00 น.' },
    { key: '5', col1: 'แม่สาย', col2: '386.00', col3: 'น้ำปกติ', col4: '11:00 น.' },
  ],
  [
    { key: '1', col1: 'คลองแม่พุง', col2: '384.29', col3: 'น้ำมาก', col4: '08:00 น.' },
    { key: '2', col1: 'สะพานอิงอุดม', col2: '384.29', col3: 'น้ำมาก', col4: '10:00 น.' },
    { key: '3', col1: 'เทิง', col2: '384.29', col3: 'น้ำมาก', col4: '12:00 น.' },
    { key: '4', col1: 'เชียงราย', col2: '385.00', col3: 'น้ำปกติ', col4: '09:00 น.' },
    { key: '5', col1: 'แม่สาย', col2: '386.00', col3: 'น้ำปกติ', col4: '11:00 น.' },
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
  { label: 'อำเภอแม่สาย', value: 2 },
  { label: 'อำเภอเชียงของ', value: 3 },
  { label: 'อำเภอเทิง', value: 4 },
  { label: 'อำเภอป่าแดด', value: 5 },
];

// Banner images
const bannerImages = [
  require('@/assets/banners/banner1.jpg'),
  require('@/assets/banners/banner2.jpg'),
  require('@/assets/banners/banner3.jpg'),
];

// Links for each banner (must match order/length of bannerImages)
const bannerLinks = [
  'https://line.me/R/ti/p/@firstLineOA',
  'https://www.facebook.com/profile.php?id=6157604461323',
  'https://www.google.com',
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
      <ParallaxScrollView
        headerImage={
          <View style={styles.headerRow}>
            <Image
              source={require('@/assets/images/app-icon.png')} // Add your app-icon.png here
              style={styles.headerIcon}
            />
            <ThemedText style={styles.headerTitle}>
              น้ำท่วมเราพร้อม
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
              <TouchableOpacity
                style={{
                  backgroundColor: '#0c0c0cff',
                  paddingVertical: 10,
                  paddingHorizontal: 28,
                  borderRadius: 14,
                  marginTop: 10,
                }}
                onPress={() => setModalVisible(false)}
              >
                <ThemedText style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                  ปิด
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Slide Banner */}
        <View style={styles.bannerContainer}>
          <Carousel
            width={320}
            height={120}
            autoPlay
            autoPlayInterval={3000}
            data={bannerImages}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => Linking.openURL(bannerLinks[index])}
                style={{ flex: 1 }}
              >
                <Image
                  source={item}
                  style={styles.bannerImage}
                  contentFit="cover"
                  transition={300}
                />
              </TouchableOpacity>
            )}
            loop
          />
        </View>

        <ThemedText style={styles.infoText}>
          ข้อมูลสถานีวัดระดับน้ำในพื้นที่ <ThemedText style={styles.infoHighlight}>{dropdownOptions[selectedDataIndex].label}</ThemedText>
          {'\n'}ณ วันที่ {new Date().getDate()} {getThaiMonthName(new Date())} {new Date().getFullYear() + 543}
          {' '}เวลา {new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
        </ThemedText>

        <View style={styles.chipScroll}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dropdownOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.chip,
                  selectedDataIndex === option.value && styles.chipActive,
                ]}
                onPress={() => setSelectedDataIndex(option.value)}
              >
                <ThemedText
                  style={[
                    styles.chipText,
                    selectedDataIndex === option.value && styles.chipTextActive,
                  ]}
                >
                  {option.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

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

        {/* Reference Link */}
        <TouchableOpacity
          onPress={() => Linking.openURL('https://chiangrai.thaiwater.net/wl')}
          style={styles.referenceLink}
        >
          <ThemedText style={styles.referenceText}>
            ข้อมูลเพิ่มเติม: https://chiangrai.thaiwater.net/wl
          </ThemedText>
        </TouchableOpacity>

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
    justifyContent: 'flex-start', // <-- Aligns content to the left
    paddingTop: 30,
    paddingBottom: 10,
    gap: 12,
  },
  headerIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 100, // Makes the image circular
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Offset for the shadow
    shadowOpacity: 0.6, // Shadow transparency
    shadowRadius: 30, // Blur radius for the shadow
    elevation: 8, // Android shadow
  },
  headerTitle: {
    color: '#ffffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'justify',
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
    marginBottom: 45,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 0, // Remove horizontal padding for full width
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
    paddingHorizontal: 0, // Remove horizontal padding for full width
    minWidth: 0, // Allow shrinking
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
    flex: 1,
    backgroundColor: '#ffe082',
    borderColor: '#ffe082',
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
    fontSize: 13,
    marginHorizontal: 0,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 0,
    fontWeight: 'bold',
    minWidth: 0,
  },
  chipScroll: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  chip: {
    backgroundColor: '#e3f2fd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#1976d2',
  },
  chipActive: {
    backgroundColor: '#1976d2',
  },
  chipText: {
    color: '#1976d2',
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#fff',
  },

  bannerContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  bannerScroll: {
    width: '100%',
    height: 120,
  },
  bannerImage: {
    width: 320,
    height: 120,
  },

  referenceLink: {
    marginBottom: 60,
    alignSelf: 'center',
  },
  referenceText: {
    color: '#7d7d7dff',
    fontSize: 14,
    textAlign: 'center',},
});