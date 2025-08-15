import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const QUESTION_GROUPS = [
  {
    icon: 'rainy',
    label: 'คำถามเกี่ยวกับน้ำท่วม',
    questions: [
      "ระดับน้ำอยู่ในระดับไหนถึงจะต้องเตรียมยกของขึ้นที่สูง?",
      "จะทราบได้อย่างไรว่าระดับน้ำไหนอยู่ขั้นเฝ้าระวังหรือขั้นวิกฤติ?",
      "ปีนี้น้ำจะเกิดน้ำท่วมหนักเหมือนปีพ.ศ.2567 ไหม?",
      "มีหน่วยงานไหนช่วยเหลือได้บ้าง?",
      "แอปพลิเคชันมีการแจ้งเตือนอย่างไร?",
      "แอปพลิเคชันจะมีการแจ้งเตือนก่อนที่น้ำจะมาหรือไม่?",
      "หากต้องการทราบข่าวสารสามารถดูได้ที่ไหน?",
      "หากต้องการรับแจ้งเตือนต้องเปิดแอปพลิเคชันไว้เสมอหรือไม่",
      "ศูนย์อพยพ",
      "กรณีมีคนแก่ในบ้านต้องทำอย่างไร",
      "นำสัตว์เลี้ยงไปศูนย์อพยพด้วยได้ไหม?",
      "หากติดอยู่ในบ้านสามารถแจ้งได้ที่ไหน?",
    ],
  },
  {
    questions: [
      "สิ่งของที่ควรเตรียมติดกระเป๋าไว้หากต้องการอพยพเร่งด่วน",
      "จะมีหน่วยงานไหนเข้ามาส่งสิ่งของจำเป็นช่วยเหลือหรือไม่?",
      "สามารถแจ้งเบอร์ไหนได้บ้างถ้าต้องการขอความช่วยเหลือ",
      "กรณีที่รถโดนน้ำต้องทำอย่างไร?",
      "หากกรณีที่น้ำมีปริมาณมากจะมีการตัดไฟหรือไม่?",
      "สามารถนำการแจ้งเตือนจากแอปนี้ไปเผยแพร่ข่าวสารต่อได้หรือไม่",
      "ระดับน้ำแถวบ้านสูงมาก แต่ยังไม่มีกำรแจ้งเตือนในแอปพลิเคชันต้องทำอย่างไร?",
      "แอปพลิเคชันมีให้แจ้งบอกข้อมูลเองไหม?",
      "แอปพลิเคชันมีค่าบริการไหม?",
      "แจ้งเตือนเข้าทาง LINE หรือ SMS ได้ไหม?",
      "ข้อมูลในแอปนี้มาจากไหน?",
    ],
  },
  {
    questions: [
      "แอปพลิเคชันบอกเวลาไหมว่าน้ำจะมาประมาณกี่โมง?",
      "ควรสับสวิตช์ไฟของบ้านตั้งแต่เมื่อไร",
      "อุปกรณ์สำรองที่เก็บได้น้ำ",
      "วิธีการเก็บเอกสารสำคัญไม่ให้เปียกน้ำ",
      "สถานที่รับฝากรถหากเกิดเหตุอุทกภัย",
      "ฝนเกิดจากอะไร",
      "อุทกภัยเกิดจากอะไร",
      "สาเหตุการเกิดอุทกภัยในเชียงรายปีพ.ศ. 2567",
      "คู่มือการรับมืออุทกภัย",
      "ระดับแม่น้ำกก",
      "ระดับแม่น้ำสาย",
      "สามารถดูสภาพอากาศได้ที่ไหน?"
    ],
  },
];

const MOCK_ANSWERS: Record<string, string> = {
  "ระดับน้ำอยู่ในระดับไหนถึงจะต้องเตรียมยกของขึ้นที่สูง?": `
    - ระดับแม่น้ำกกสะพานพ่อขุนเม็งรายมหาราช เกณฑ์เฝ้าระวังอยู่ที่ 5.50 ม.
    - ระดับแม่น้ำกกสะพานขัวพญาเม็งราย เกณฑ์เฝ้าระวังอยู่ที่ 5.50 ม.
    - ระดับแม่น้ำสายสะพานมิตรภาพ แม่น้ำสายแห่งที่ 1 เกณฑ์เฝ้าระวังอยู่ที่ 394.60 ม.รทก.
  `,
  "จะทราบได้อย่างไรว่าระดับน้ำไหนอยู่ขั้นเฝ้าระวังหรือขั้นวิกฤติ?": `
    แม่น้ำกกสะพานพ่อขุนเม็งราย:
    - เฝ้าระวังที่ 5.50 ม.
    - วิกฤติที่ 7.00 ม.

    แม่น้ำกกสะพานขัวพญาเม็งราย:
    - เฝ้าระวังที่ 5.50 ม.
    - วิกฤติที่ 6.00 ม.

    แม่น้ำสายสะพานมิตรภาพ แม่น้ำสายแห่งที่ 1:
    - เฝ้าระวังที่ 394.60 ม.รทก.
    - วิกฤติที่ 396.59 ม.รทก.
  `,
  "ปีนี้น้ำจะเกิดน้ำท่วมหนักเหมือนปีพ.ศ.2567 ไหม?": "ในปีนี้น้ำจะท่วมไม่หนักเท่าปีที่แล้วครับ ปีที่แล้วที่น้ำท่วมหนักเนื่องจากมีหลายๆ ปัจจัย เช่น การปล่อยน้ำในเขื่อนกั้นแม่น้ำโขงในจีนทำให้เกิดน้ำโขงหนุน ผลพวงจากพายุไต้ฝุ่นยางิ การพัฒนาเมืองทำให้ลุกล้ำลำน้ำ ฯลฯ ในปีนี้ถึงน้ำจะไม่ท่วมหนักเท่าปีที่แล้ว แต่ควรติดตามสถานการณ์น้ำอยู่เรื่อยๆ ครับ",
  "มีหน่วยงานไหนช่วยเหลือได้บ้าง?": "กรมป้องกันและบรรเทาสาธารณภัย เทศบาล อบจ. อบต. อาสาสมัคร และกู้ภัยครับ",
  "แอปพลิเคชันมีการแจ้งเตือนอย่างไร?": "แอปพลิเคชันจะเริ่มแจ้งเตือนเมื่อระดับน้ำถึงขั้นเฝ้าระวังจนถึงขั้นวิกฤติครับ",
  "แอปพลิเคชันจะมีการแจ้งเตือนก่อนที่น้ำจะมาหรือไม่?": "แอปพลิเคชันจะเริ่มแจ้งเตือนตั้งแต่ขั้นเฝ้าระวังถึงขั้นวิกฤติครับ",
  "หากต้องการทราบข่าวสารสามารถดูได้ที่ไหน?": "สามารถติดตามได้ที่เพจ Facebook น้ำท่วมเราพร้อม หรือ LINE OA น้ำท่วมเราพร้อมครับ",
  "หากต้องการรับแจ้งเตือนต้องเปิดแอปพลิเคชันไว้เสมอหรือไม่": "ไม่จำเป็นต้องเปิดแอปไว้ตลอดก็สามารถรับการแจ้งเตือนได้ครับ",
  "ศูนย์อพยพ": `
          - สำนักงานประชาสัมพันธ์จังหวัดเชียงราย: 0-5315-0163
          - นายกเทศบาลแม่สาย: 08-9755-7555
          - ปภ.เชียงราย สายด่วน: 1784
          - โรงพยาบาลแม่สาย: 08-6428-5890
          - สสอ.แม่สาย: 0-5373-1503
          - มูลนิธิกระจกเงา เชียงราย: 0-5373-7616
          - หมายเลขขอความช่วยเหลือ ป.ประยงค์: 06-3901-8472
          - สมาคมกู้ภัยสยามแม่สาย: 08-4226-1669
          - สนับสนุนน้ำดื่ม ข้าวกล่อง ให้เจ้าหน้าที่ชุดปฏิบัติงานและผู้ประสบภัย:
            ประสาน เสมียนตราอำเภอ: 08-1796-2095
        `,
  "กรณีมีคนแก่ในบ้านต้องทำอย่างไร": "โทรติดต่อขอความช่วยเหลือจากเบอร์สายด่วน ปภ. 1784 ได้ครับ หรือติดต่อขอความช่วยเหลือได้ที่ไลน์ OA น้ำท่วมเราพร้อมและเพจเฟสบุ๊คน้ำท่วมเราพร้อมครับ",
  "นำสัตว์เลี้ยงไปศูนย์อพยพด้วยได้ไหม?": "สามารถนำไปที่ศูนย์อพยพได้ครับ",
  "หากติดอยู่ในบ้านสามารถแจ้งได้ที่ไหน?": "โทรติดต่อขอความช่วยเหลือจากเบอร์สายด่วน ปภ. 1784 ได้ครับ หรือติดต่อขอความช่วยเหลือได้ที่ไลน์ OA น้ำท่วมเราพร้อมและเพจเฟสบุ๊คน้ำท่วมเราพร้อมครับ",
  "สิ่งของที่ควรเตรียมติดกระเป๋าไว้หากต้องการอพยพเร่งด่วน": "ยาสามัญประจำบ้าน, ปลากระป๋องหรืออาหารแห้งพร้อมทาน, เทียน, ไฟแช็ค, ไม้ขีดไฟ, ไฟฉาย, หน้ากากอนามัย, ผ้าอนามัย, เสื้อผ้า 1 ชุด, เอกสารสำคัญหรือบัตรประชาชน",
  "จะมีหน่วยงานไหนเข้ามาส่งสิ่งของจำเป็นช่วยเหลือหรือไม่?": "จะมีหน่วยงานอาสาสมัคร, ทหาร และภาครัฐนำสิ่งของจำเป็นเข้ามาช่วยเหลือครับ",
  "สามารถแจ้งเบอร์ไหนได้บ้างถ้าต้องการขอความช่วยเหลือ": `
          - สายด่วน ปภ. 1784
          - ปภ.เชียงราย: 053 177 318
          - กู้ภัย: 1669
          - เหตุด่วน: 191
          - ไฟฟ้า: 1129
        `,
  "กรณีที่รถโดนน้ำต้องทำอย่างไร?": `
          - ตรวจสอบความเสียหายและติดต่อประกันภัย
          - ติดต่อบริการเคลื่อนย้ายรถเพื่อเข้าศูนย์หรืออู่ซ่อมรถ
          - ทดสอบรถหลังซ่อมแซม
          - วางแผนบำรุงรักษารถในระยะยาวครับ
        `,
  "หากกรณีที่น้ำมีปริมาณมากจะมีการตัดไฟหรือไม่?": `
          ทางไฟฟ้าจะตัดไฟเมื่อระดับน้ำถึงอันตรายครับ 
          หากไฟฟ้ายังไม่ตัดและน้ำท่วมถึงระดับที่อาจเป็นอันตรายต่อระบบไฟฟ้า 
          ควรตัดไฟที่มิเตอร์ไฟฟ้าหรือสวิตช์ไฟหลักของบ้านครับ
        `,
  "สามารถนำการแจ้งเตือนจากแอปนี้ไปเผยแพร่ข่าวสารต่อได้หรือไม่": "สามารถนำไปเผยแพร่ต่อได้ครับ เพื่อให้ทุกคนได้รับข่าวสารทั่วถึงครับ",
  "ระดับน้ำแถวบ้านสูงมาก แต่ยังไม่มีการแจ้งเตือนในแอปพลิเคชันต้องทำอย่างไร": "แจ้งข้อมูลมาในไลน์ น้ำท่วมเราพร้อม หรือเพจเฟสบุ๊ค น้ำท่วมเราพร้อม ได้เลยครับ และควรติดตามข่าวสารอยู่เรื่อยๆ ครับ",
  "แอปพลิเคชันมีให้แจ้งบอกข้อมูลเองไหม?": "สามารถแจ้งเข้ามาในไลน์ น้ำท่วมเราพร้อม หรือ เพจเฟสบุค น้ำท่วมเราพร้อม ได้เลยครับ",
  "แอปพลิเคชันมีค่าบริการไหม?": "ไม่มีคิดค่าบริการใดๆครับ",
  "แจ้งเตือนเข้าทาง LINE หรือ SMS ได้ไหม?": "ในตอนนี้ไม่สามารถแจ้งเตือนเข้า SMS ได้ครับ แต่ในตัวของแอปพลิเคชันจะมีไลน์ OA น้ำท่วมเราพร้อมแจ้งเตือนอยู่ครับ https://line.me/R/ti/p/@769btwlv",
  "ข้อมูลในแอปนี้มาจากไหน?": "มาจาก คลังข้อมูลน้ำแห่งชาติ ส่วนอุทกวิทยาที่ 2 เชียงราย สำนักงานทรัพยากรน้ำที่ 1กรมทรัพยากรน้ำ และกรมอุตุนิยมวิทยาครับ",
  "แอปพลิเคชันบอกเวลาไหมว่าน้ำจะมาประมาณกี่โมง?": "ไม่สามารถระบุเวลาว่ากี่โมงได้ครับ จะระบุได้แค่เวลาที่ระยะทางที่น้ำจะมาถึงครับ",
  "ควรสับสวิตช์ไฟของบ้านตั้งแต่เมื่อไร": "เมื่อมีประกาศเตือนให้เก็บของหรือเมื่อน้ำเริ่มเข้าบ้านครับ",
  "อุปกรณ์สำรองที่เก็บได้น้ำ": "อาหารกระป๋องเช่นปลากระป๋อง หรือ อาหารซองพร้อมทานหากยังไม่แกะซองสามารถเก็บได้1ปี แนบรูป",
  "วิธีการเก็บเอกสารสำคัญไม่ให้เปียกน้ำ": "ใส่ซองกันน้ำหรือแฟ้มเอกสาร หากไม่มีสามารถนำใส่ถุงพลาสติกแทนได้ครับ",
  "สถานที่รับฝากรถหากเกิดเหตุอุทกภัย": "จอดในอาคารที่มั่นคงและแข็งแรง หากต้องการข้อมูลเพิ่มเติมเกี่ยวกับการรับฝากรถในช่วงอุทกภัย สามารถ ติดต่อ สอบถามหน่วยงานราชการในพื้นที่ เช่น สำนักงานป้องกันและบรรเทาสาธารณภัยจังหวัดเชียงรายหรือ เทศบาล",
  "ฝนเกิดจากอะไร": "ฝนเกิดจากการที่น้ำในแหล่งน้ำต่างๆ ได้รับความร้อนจากดวงอาทิตย์ แล้วระเหยกลายเป็นไอน้ำลอยขึ้นไปใน อากาศ ไอน้ำเหล่านี้จะรวมตัวกันเป็นละอองน้ำเล็กๆ และรวมตัวกันเป็นก้อน เมฆ เมื่อเมฆมีขนาดใหญ่ขึ้นจนไม่สามารถอุ้มน้ำไว้ได้ น้ำก็จะตกลงมาเป็นฝน",
  "อุทกภัยเกิดจากอะไร": "อุทกภัยมักเกิดจากน้ำท่วมซึ่งแบ่งเป็น2ลักษณะคือน้ำท่วมขังล้นตลิ่ง และน้ำท่วมฉับพลัน อุทกภัยมีหลายสาเหตุ ทั้งเกิดจากมนุษย์และจากธรรมชาติ โดยสาเหตุหลักๆ ได้แก่ ฝนตกหนักต่อเนื่องเป็นเวลานาน พายุหมุนเขตร้อน ร่องความกดอากาศต่ำ ลมมรสุม น้ำทะเล แผ่นดินไหว เขื่อนพัง และกิจกรรมของมนุษย์ เช่นตัดไม้ทำลายป่า การขยายเมืองเข้าไปในพื้นที่ลุ่มต่ำ",
  "สาเหตุการเกิดอุทกภัยในเชียงรายปีพ.ศ. 2567": "มีสาเหตุมาจากหลายปัจจัย คือ การระบายน้ำของเขื่อนกั้นน้ำโขงในจีนทำให้ ระดับแม่น้ำโขงสูงกว่าค่าปกติทำให้แม่น้ำกกไหลลงแม่น้ำโขงไม่ได้จึงทำให้เกิดแม่น้ำโขงหนุน และผลพวงจากหางพายุไต้ฝุ่นยางิททำให้มีฝนตกหนักมากบริเวณต้นลำน้ำกกในฝั่งสหภาพเมียนมาจึงไม่สามารถเข้าถึงข้อมูลข่าวสารเพื่อแจ้งเตือนภัยได้ การพัฒนเมืองรอบลำน้ำกกทำให้เกิดการลุกล้ำ น้ำ ผนวกกับฝนตกหนักในพื้นที่จนทำให้น้ำไหลเข้าท่วมพื้นที่ในจังหวัดเชียงราย",
  "คู่มือการรับมืออุทกภัย": "กดแทบล่างอันที่สามได้เลยครับ",
  "ระดับแม่น้ำกก": "กดแทบล่างอันแรกได้เลยครับ",
  "ระดับแม่น้ำสาย": "กดแทบล่างอันแรกได้เลยครับ",
  "สามารถดูสภาพอากาศได้ที่ไหน?": "แทบล่างขวาสุดครับ",
};

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
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        {
          id: (Date.now() + 1).toString(),
          text: MOCK_ANSWERS[msg] || "ขออภัย ขณะนี้ยังไม่มีข้อมูลสำหรับคำถามนี้ค่ะ",
          from: 'bot'
        }
      ]);
    }, 800);
  };

  // // Auto-scroll to bottom when new message arrives
  // useEffect(() => {
  //   flatListRef.current?.scrollToEnd({ animated: true });
  // }, [messages]);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View
          style={[
            styles.messageRow,
            item.from === 'user' ? styles.userRow : styles.botRow
          ]}
        >
          {item.from === 'bot' && (
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.profileImage}
            />
          )}
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
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.headerRow}>
          <Ionicons
            name="chatbubbles"
            size={44}
            color="#ffffffff"
            style={styles.chatbubblesIcon}
          />
          <View style={styles.headerTextBox}>
            <ThemedText variant='bold' style={styles.headerTitle}>
              น้องต้นน้ำ
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              เพื่อช่วยเหลือและให้ข้อมูลเกี่ยวกับภัยพิบัติและการเตรียมความพร้อม
            </ThemedText>
          </View>
        </View>
      }
      ListFooterComponent={
        <>
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
            <TouchableOpacity onPress={() => sendMessage()} style={styles.sendButton}>
              <Ionicons name="send" size={22} color="#fff" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <View style={styles.suggestedContainer}>
            {QUESTION_GROUPS.map((group, groupIdx) => (
              <View key={groupIdx} style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  {group.icon && (
                    <Ionicons name={group.icon as any} size={18} color="#1976d2" style={{ marginRight: 6 }} />
                  )}
                  {group.label && (
                    <ThemedText variant='bold' style={{ color: '#1976d2', fontSize: 15 }}>
                      {group.label}
                    </ThemedText>
                  )}
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
        </>
      }
      contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 4 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    marginTop: 10,
    backgroundColor: '#326a95',
    gap: 12,
    borderRadius: 12,
  },
  headerTextBox: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
  },
  headerTitle: {
    color: '#ffffffff',
    fontSize: 24,
  },
  headerSubtitle: {
    color: '#ffffffff',
    fontSize: 15,
    opacity: 0.85,
    marginTop: 2,
    marginLeft: 2,
    marginRight: 10,
  },
  chatContainer: {
    elevation: 2,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  botRow: {
    justifyContent: 'flex-start',
  },
  profileImage: {
    width: 40,
    height: 32,
    borderRadius: 12,
    marginRight: 8,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 14,
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
    marginLeft: 10,
    marginBottom: 50,
  },
  suggestedChip: {
    backgroundColor: '#ffffffff',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#494949ff',
    marginBottom: 1,
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
