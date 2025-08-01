import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

const QUESTION_GROUPS = [
  {
    icon: 'rainy-outline',
    label: 'น้ำจะมารึยัง (สถานการณ์น้ำปัจจุบัน)',
    questions: [
      "แถวบ้านจะท่วมไหม?",
      "น้ำจะท่วมบ้านเราไหม?",
      "น้ำเริ่มขึ้นหรือยังอ่ะ?",
      "เขาบอกว่าน้ำมาจริงมั้ย?",
      "น้ำมาถึงไหนแล้ว?",
      "บ้านฉันเสี่ยงน้ำท่วมมั้ย?",
      "ตอนนี้แถวนี้น้ำลึกกี่เซนต์แล้ว?",
      "ฝนจะตกอีกนานไหม?",
      "ฝนตกหนักขนาดนี้ น้ำจะขึ้นไหม?",
      "ท่วมหนักเหมือนปีก่อนไหม?",
      "น้ำตรงคลองมันจะล้นเมื่อไหร่?",
      "จะต้องย้ายของขึ้นที่สูงยัง?",
      "ถนนสายนี้ขับผ่านได้อยู่มั้ย?",
      "น้ำจะเข้าเขตนี้อีกกี่วัน?",
      "น้ำลดหรือยัง?",
      "ปลอดภัยรึยัง",
      "เข้าขั้นเฝ้าระวังหรือวิกฤตรึยัง?",
      "ที่นี่น้ำท่วมทุกปีเลย รอบนี้หนักมั้ย?",
      "น้ำท่วมหน้าบ้านฉันคนอื่นแจ้งรึยัง?",
      "มีหน่วยงานไหนช่วยเราได้บ้าง?",
      "ท่วมถึงบ้านชั้นเดียวไหม?",
      "ดูได้ยังว่าน้ำจะมาทางไหน?",
    ],
  },
  {
    icon: 'notifications-outline',
    label: 'แจ้งเตือนยังไง? (ระบบเตือนภัย)',
    questions: [
      "แอปมันเตือนยังไงอ่ะ?",
      "ทำไมไม่เห็นเตือนเลย?",
      "มันจะเตือนทันก่อนน้ำมามั้ย?",
      "เปิดเสียงเตือนตรงไหน?",
      "ต้องกดตรงไหนถึงจะรู้ข่าว?",
      "ตั้งให้เตือนเฉพาะหมู่บ้านฉันได้มั้ย?",
      "ถ้าไม่มีเน็ต มันจะยังเตือนมั้ย?",
      "ทำไมแจ้งเตือนช้า?",
      "ดูย้อนหลังได้ไหมว่ามีเตือนไรบ้าง?",
      "ต้องเปิดแอปไว้ตลอดเลยเหรอ?",
    ],
  },
  {
    icon: 'briefcase-outline',
    label: 'จะหนีไปไหน? (การอพยพและช่วยเหลือ)',
    questions: [
      // การอพยพและช่วยเหลือ
      "ถ้าน้ำมาจะหนีไปตรงไหน?",
      "มีที่ให้นอนมั้ยถ้าย้ายออก?",
      "จุดอพยพแถวนี้อยู่ตรงไหนอ่ะ?",
      "มีคนมารับมั้ยถ้าหนีไม่ทัน?",
      "จะบอกใครดีว่าต้องการความช่วยเหลือ?",
      "ถ้ามีคนแก่ในบ้าน จะพาไปไหนได้บ้าง?",
      "หมาแมวเอาไปด้วยได้มั้ย?",
      "ถ้าติดอยู่ในบ้านโทรหาใครได้บ้าง?",
      "ลูกหลานไปโรงเรียน จะปลอดภัยมั้ย?",
      "ต้องเตรียมของยังไงถ้าจะหนี?",
      "มีคนมาส่งของช่วยไหม?",
      "ไปอยู่ที่อพยพ เค้ามีข้าวให้กินมั้ย?",
      "ต้องแจ้งเบอร์อะไรถ้าขอความช่วยเหลือ?",
      "ถ้ารถโดนน้ำจะทำไงดี?",
      "ไฟจะดับมั้ยถ้าน้ำมา?",
      // การมีส่วนร่วมในชุมชน
      "บ้านใกล้ฉันท่วมแล้ว แต่ในแอปยังไม่ขึ้น ต้องแจ้งยังไง?",
      "แอปมีให้แจ้งบอกข้อมูลเองไหม?",
      "มีที่รับของบริจาคมั้ย?",
      "อยากให้ชุมชนใช้แอปนี้ต้องทำไง?",
      // การใช้แอพยังไง
      "แอปนี้ฟรีใช่มั้ย?",
      "ใช้กับมือถือรุ่นเก่าได้มั้ย?",
      "ต้องเปิดเน็ตตลอดเลยเหรอ?",
      "ทำไมบางทีเปิดแอปแล้วค้าง?",
      "ใช้แอปนี้บนแท็บเล็ตได้มั้ย?",
      "แจ้งเตือนเข้า LINE หรือ SMS ได้มั้ย?",
      "ข้อมูลในแอปนี้มาจากไหน?",
      "ถ้าไม่กดอัปเดต จะพลาดข่าวไหม?",
      // ดูข้อมูลในแอพยังไง
      "ดูว่าน้ำจะมาทางไหนได้ตรงไหนในแอป?",
      "แผนที่นี้ดูยังไง",
      "ดูได้มั้ยว่าตรงไหนน้ำท่วมหนัก?",
      "แอปมันบอกเวลาไหมว่าน้ำจะมาประมาณกี่โมง?",
      "น้ำจะมาเยอะมามั้ย",
      // ป้องกันน้ำท่วม
      "ต้องซื้อกระสอบทรายจากไหน?",
      "จะรู้ได้ไงว่าน้ำจะมาทางไหนก่อน?",
      "ควรเก็บของเลยไหมจากสถานการ์ณตอนนี้",
      "ไฟบ้านควรปิดตอนไหน?",
      "จัดกระเป๋าหนีภัยต้องใส่อะไรบ้าง?",
      "ซื้ออาหารสำรองอะไรดีที่เก็บได้นานๆ?",
      "ต้องเก็บพวกเอกสารสำคัญยังไงดี?",
      "มีที่รับฝากรถไหม",
      "ถ้าอยู่คนเดียวจะจัดการยังไง?",
      "ยาและของใช้จำเป็นควรเตรียมไรบ้าง?",
      // ข้อมูลน้ำ/อากาศ/สถานการณ์
      "สภาพอากาศในวันนี้",
      "สภาพอากาศตอนนี้",
      "สภาพอากาศพรุ่งนี้",
      "สภาพอากาศอาทิตย์หน้า",
      "ระดับน้ำอ่างเก็บน้ำ",
      "ระดับน้ำแม่น้ำ",
      "วันนี้ฝนตกไหม",
      "ฝนเกิดจากอะไร",
      "น้ำท่วมเกิดจากอะไร",
      "ทำไมน้ำท่วม",
      "สาเหตุน้ำท่วมเชียงรายปี67",
      "ต้องเตรียมอะไรติดบ้านไว้บ้าง",
      "ปริมาณน้ำในแม่น้ำต่างๆ(ในเชียงราย)",
      "สถานการณ์น้ำตอนนี้",
      "พื้นที่เสี่ยงน้ำท่วม",
      "คู่มือการรับมืออุทกภัย",
      "วันนี้น้ำท่วมไหม",
      "น้ำท่วมที่ไหนบ้าง",
      "ปีนี้น้ำจะท่วมไหม",
      "ติดน้ำท่วมทำยังไง",
      "โทรขอความช่วยเหลือเบอร์ไหนได้บ้าง",
    ],
  },
];

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'สวัสดีครับ Ai จากน้องต้นน้ำ พี่ๆ สามารถพูดคุยกับน้องต้นน้ำ ได้เลย  น้องพร้อมให้ข้อมูลแล้ว', from: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text: msg, from: 'user' }
    ]);
    setInput('');
    // Simulate bot reply
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { id: (Date.now() + 1).toString(), text: 'ขอบคุณที่ติดต่อมา! ระบบจะตอบกลับเร็วๆ นี้', from: 'bot' }
      ]);
    }, 800);
  };

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ParallaxScrollView
      headerImage={
        <View style={styles.headerRow}>
          <Ionicons
            name="chatbubbles"
            size={44}
            color="#1976d2"
            style={styles.chatbubblesIcon}
          />
          <View style={styles.headerTextBox}>
            <ThemedText style={styles.headerTitle}>
              น้องต้นน้ำ
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              เพื่อช่วยเหลือและให้ข้อมูลเกี่ยวกับภัยพิบัติและการเตรียมความพร้อม
            </ThemedText>
          </View>
        </View>
      }
    >

      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.from === 'user' ? styles.userBubble : styles.botBubble
              ]}
            >
              <ThemedText style={[
                styles.bubbleText,
                item.from === 'user' ? styles.userText : styles.botText
              ]}>
                {item.text}
              </ThemedText>
            </View>
          )}
          contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 4 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
        style={styles.inputRow}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="พิมพ์ข้อความ..."
          style={styles.input}
          placeholderTextColor="#90caf9"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View style={styles.suggestedContainer}>
        {QUESTION_GROUPS.map((group, groupIdx) => (
          <View key={groupIdx} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name={group.icon as any} size={18} color="#1976d2" style={{ marginRight: 6 }} />
              <ThemedText style={{ color: '#000000ff', fontWeight: 'bold', fontSize: 15 }}>
                {group.label}
              </ThemedText>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {group.questions.map((q, idx) => (
                <TouchableOpacity
                  key={q}
                  style={styles.suggestedChip}
                  onPress={() => sendMessage(q)}
                  activeOpacity={0.85}
                >
                  <ThemedText style={styles.suggestedText}>{q}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
    color: '#1976d2',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    color: '#1976d2',
    fontSize: 15,
    opacity: 0.85,
    fontWeight: '500',
    marginTop: 2,
  },

  headerImage: {
    color: '#2196f3',
    bottom: -60,
    left: -20,
    position: 'absolute',
    opacity: 0.15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 8,
    justifyContent: 'center',
  },
  titleText: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 20,
  },
  chatContainer: {
    height: 320,
    backgroundColor: '#f5fafd',
    borderRadius: 16,
    padding: 8,
    marginHorizontal: 8,
    marginBottom: 12,
    shadowColor: '#2196f3',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginVertical: 3,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196f3',
    borderTopRightRadius: 4,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3f2fd',
    borderTopLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#1976d2',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 18,
    backgroundColor: '#e3f2fd',
    borderRadius: 24,
    padding: 4,
    shadowColor: '#2196f3',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    color: '#1976d2',
  },
  sendButton: {
    backgroundColor: '#2196f3',
    borderRadius: 20,
    padding: 8,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: '#1976d2',
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  suggestedContainer: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  suggestedChip: {
    backgroundColor: '#ffffffff',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#494949ff',
  },
  suggestedText: {
    color: '#545353ff',
    fontSize: 14,
  },
  chatbubblesIcon: {
    marginLeft: 12,
    opacity: 0.92,
  },
});
