import { ThemedText } from '@/components/ThemedText';
import { fetchData } from '@/services/ApiService';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { FlatList, Linking, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const tableHeader = ['สถานี', 'ระดับน้ำ (ม.รทก)', 'สถานการณ์น้ำ', 'เวลา'];

const bannerImages = [
  require('@/assets/banners/banner1.jpg'),
  require('@/assets/banners/banner2.jpg'),
  require('@/assets/banners/banner3.jpg'),
];

const bannerLinks = [
  'https://www.facebook.com/profile.php?id=61576044613232',
  'https://line.me/R/ti/p/@769btwlv',
  ''
];

export default function HomeScreen() {
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRows, setModalRows] = useState<any[]>([]);
  const [amphurData, setAmphurData] = useState<any[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        if (data && typeof data === 'object') {
          const arr = Object.entries(data).map(([amphur, rows]) => ({
            amphur,
            rows: Array.isArray(rows) ? rows : [],
          }));
          setAmphurData(arr);
          setDropdownOptions(
            arr.map((group, idx) => ({
              label: group.amphur,
              value: idx,
            }))
          );
        } else {
          setAmphurData([]);
          setDropdownOptions([]);
        }
      } catch (error) {
        setAmphurData([]);
        setDropdownOptions([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!amphurData[selectedDataIndex] || !Array.isArray(amphurData[selectedDataIndex]?.rows)) return;
    const foundRows = amphurData[selectedDataIndex].rows.filter(
      (row: any) => row.water_status_calc === 'น้ำล้นตลิ่ง'
    );
    if (foundRows.length > 0) {
      setModalRows(foundRows);
      setModalVisible(true);
    } else {
      setModalRows([]);
      setModalVisible(false);
    }
  }, [selectedDataIndex, amphurData]);

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={styles.headerRow}>
            <Image
              source={require('@/assets/images/header-app-icon.png')}
              style={styles.headerIcon}
            />
            <ThemedText variant="bold" style={styles.headerTitle}>
              น้ำท่วมเราพร้อม !
            </ThemedText>
          </View>

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
                  <View key={row.station + row.time + idx} style={{ marginBottom: 12 }}>
                    <ThemedText variant='bold' style={styles.modalStation}>สถานี: {row.station}</ThemedText>
                    <ThemedText variant='bold'>ระดับน้ำ: {row.water_level}</ThemedText>
                    <ThemedText variant='bold'>เวลา: {row.time}</ThemedText>
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
                  <ThemedText variant='bold' style={{ color: '#fff', fontSize: 16 }}>
                    ปิด
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Slide Banner */}
          <View style={styles.bannerContainer}>
            <Carousel
              width={360}
              height={200}
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
            ข้อมูลสถานีวัดระดับน้ำในพื้นที่{' '}
            <ThemedText style={styles.infoHighlight}>
              {dropdownOptions[selectedDataIndex]?.label || ''}
            </ThemedText>
            {'\n'}ณ วันที่ {new Date().getDate()} {getThaiMonthName(new Date())} {new Date().getFullYear() + 543}
            {' '}เวลา {new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
          </ThemedText>

          {/* Dropdown */}
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
                <ThemedText variant='bold'
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
          </View>
        </>
      }
      data={amphurData[selectedDataIndex]?.rows || []}
      keyExtractor={(item, idx) => item.station + item.time + idx}
      renderItem={({ item }) => (
        <View style={styles.tableRow}>
          <ThemedText style={styles.tableCell}>{item.station}</ThemedText>
          <ThemedText style={styles.tableCell}>{item.water_level}</ThemedText>
          <ThemedText
            style={[
              styles.col3Cell,
              item.water_status_calc === 'น้ำมาก' && { backgroundColor: '#2196f3', borderColor: '#2196f3', color: '#fff' },
              item.water_status_calc === 'น้ำปกติ' && { backgroundColor: '#43a047', borderColor: '#43a047', color: '#fff' },
              item.water_status_calc === 'น้ำล้นตลิ่ง' && { backgroundColor: '#e53935', borderColor: '#e53935', color: '#fff' },
              item.water_status_calc === 'น้ำน้อย' && { backgroundColor: '#ffd600', borderColor: '#ffd600', color: '#000' },
              item.water_status_calc === 'น้ำน้อยวิกฤต' && { backgroundColor: '#ff9800', borderColor: '#ff9800', color: '#fff' },
            ]}
          >
            {item.water_status_calc}
          </ThemedText>
          <ThemedText style={styles.tableCell}>{item.time}</ThemedText>
        </View>
      )}
      ListEmptyComponent={
        <ThemedText style={{ textAlign: 'center', margin: 16 }}>
          {loading ? 'กำลังโหลดข้อมูล...' : 'ไม่พบข้อมูล'}
        </ThemedText>
      }
      ListFooterComponent={
        <>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://chiangrai.thaiwater.net/wl')}
            style={styles.referenceLink}
          >
            <ThemedText style={styles.referenceText}>
              ข้อมูลเพิ่มเติม: ศูนย์ข้อมูลน้ำระดับจังหวัด
            </ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.disclaimerText}>
            ข้อมูลในแอปนี้จัดทำขึ้นจากแหล่งข้อมูลสาธารณะโดยผู้พัฒนาอิสระ ไม่มีความเกี่ยวข้องกับหน่วยงานของรัฐ โปรดใช้เพื่ออ้างอิงเบื้องต้นเท่านั้น
          </ThemedText>
        </>
      }
      contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    />
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
    backgroundColor: '#326a95',
    gap: 12,
    borderRadius: 12,
  },
  headerIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 8,
  },
  headerTitle: {
    color: '#ffffffff',
    fontSize: 30,
    textAlign: 'center',
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
    fontSize: 20,
    color: '#e53935',
    marginBottom: 8,
  },
  modalStation: {
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
    paddingHorizontal: 0,
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
    paddingHorizontal: 0,
    minWidth: 0,
  },
  tableCellHeader: {
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
    marginTop: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    overflow: 'hidden',
    borderRadius: 16,
  },
  bannerScroll: {
    width: '100%',
    height: 120,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },

  referenceLink: {
    marginBottom: 60,
    alignSelf: 'center',
  },
  referenceText: {
    color: '#7d7d7dff',
    fontSize: 14,
    textAlign: 'center',
  },
  disclaimerText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});