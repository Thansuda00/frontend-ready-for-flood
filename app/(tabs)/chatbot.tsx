import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'สวัสดีครับ Ai จากน้องต้นน้ำ พี่ๆ สามารถพูดคุยกับน้องต้นน้ำได้เลย น้องพร้อมให้ข้อมูลแล้ว', from: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text: input, from: 'user' }
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
        <Ionicons
          size={220}
          color="#2196f3"
          name="chatbubbles"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <Ionicons name="chatbubbles" size={50} color="#2196f3" style={{ marginRight: 8 }} />
        <View>
          <ThemedText type="title" style={styles.titleText}>น้องต้นน้ำ</ThemedText>
        </View>
      </ThemedView>
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
});
