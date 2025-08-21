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
          <Text style={styles.label}>เกี่ยวกับแอป:</Text>
          <Text style={styles.value}>เวอร์ชันของแอป: 2.0.0</Text>
          <Text style={styles.value}>ผู้พัฒนา: ทีมพัฒนาน้ำท่วมเราพร้อม</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>❗ คำชี้แจง: </Text>
          <Text style={styles.value}>
แอปพลิเคชันนี้พัฒนาโดยผู้พัฒนาอิสระ ไม่มีความเกี่ยวข้อง หรือได้รับการรับรองจากหน่วยงานราชการหรือองค์กรของรัฐใด ๆ ทั้งสิ้น ข้อมูลทั้งหมดในแอปนี้นำมาจากแหล่งข้อมูลสาธารณะ และจัดทำขึ้นเพื่อให้ประชาชนเข้าถึงข้อมูลได้สะดวกมากขึ้นเท่านั้น
          </Text>
                    <Text style={styles.value}>
⚠️ Disclaimer:
This app is independently developed and is not affiliated with or endorsed by any government agency. All data is sourced from public government websites and provided solely for informational purposes.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>🔗 แหล่งข้อมูล:</Text>
          <Text
            style={[styles.value]}
          >
            - กรมอุตุนิยมวิทยา:
            <Text
              style={[styles.value, styles.link]}
              onPress={() => Linking.openURL('https://www.tmd.go.th')}
            >  https://www.tmd.go.th
            </Text>
          </Text>
          <Text style={[styles.value]}>
            - กรมป้องกันและบรรเทาสาธารณภัย:
            <Text
              style={[styles.value, styles.link]}
              onPress={() => Linking.openURL('https://www.disaster.go.th')}
            >  https://www.disaster.go.th
            </Text>
          </Text>
          <Text
            style={[styles.value]}
          >
            - คลังข้อมูลน้ำแห่งชาติ:
            <Text
              style={[styles.value, styles.link]}
              onPress={() => Linking.openURL('https://chiangrai.thaiwater.net/wl')}
            >  https://chiangrai.thaiwater.net/wl
            </Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>🔒 ความเป็นส่วนตัว:</Text>
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
    paddingVertical: 40,
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
    marginTop: 8,
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
    marginTop: 8,
  },
});