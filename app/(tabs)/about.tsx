import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>เกี่ยวกับแอป</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>เวอร์ชันของแอป:</Text>
          <Text style={styles.value}>2.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>ผู้พัฒนา:</Text>
          <Text style={styles.value}>ทีมพัฒนาน้ำท่วมเราพร้อม</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>คำชี้แจงจากผู้พัฒนา</Text>
          <Text style={styles.value}>
แอปพลิเคชันนี้พัฒนาโดยผู้พัฒนาอิสระ และไม่มีความเกี่ยวข้องหรือได้รับการรับรองจากหน่วยงานราชการ 
ข้อมูลในแอปนี้จัดทำขึ้นเพื่อช่วยเหลือและให้ข้อมูลเกี่ยวกับภัยพิบัติและการเตรียมความพร้อม 
ข้อมูลมาจากแหล่งข้อมูลสาธารณะ ทางผู้พัฒนาไม่รับผิดชอบต่อความเสียหายใดๆ ที่อาจเกิดขึ้นจากการใช้งานแอปนี้
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>แหล่งข้อมูล:</Text>
          <Text
            style={[styles.value, styles.link]}
            onPress={() => Linking.openURL('https://www.tmd.go.th')}
          >
            - กรมอุตุนิยมวิทยา
          </Text>
          <Text
            style={[styles.value, styles.link]}
            onPress={() => Linking.openURL('https://www.disaster.go.th')}
          >
            - กรมป้องกันและบรรเทาสาธารณภัย
          </Text>
          <Text
            style={[styles.value, styles.link]}
            onPress={() => Linking.openURL('https://chiangrai.thaiwater.net/wl')}
          >
            - คลังข้อมูลน้ำแห่งชาติ
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>ความเป็นส่วนตัว:</Text>
          <Text
            style={[styles.value, styles.link]}
            onPress={() => Linking.openURL('https://www.freeprivacypolicy.com/live/3173995f-48bc-42dd-9afe-8f5d60f4d845')}
          >
         Privacy Policy
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e3f2fd',
    fontFamily: 'Kanit-Regular', // Applied font family
  },
  header: {
    backgroundColor: '#326a95',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Kanit-Bold', // Applied font family
  },
  content: {
    padding: 16,

  },
  section: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Kanit-Bold', // Applied font family
  },
  value: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Kanit-Regular', // Applied font family
  },
  link: {
    color: '#1976d2',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});