import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabTwoScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'สวัสดี! ฉันสามารถช่วยอะไรคุณได้บ้าง?', from: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: input, from: 'user' }]);
    setInput('');
    // Simulate bot reply
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { id: (Date.now() + 1).toString(), text: 'ขอบคุณที่ติดต่อมา! ระบบจะตอบกลับเร็วๆ นี้', from: 'bot' }
      ]);
    }, 800);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      {/* ...existing content... */}

      {/* Chatbot Section */}
      <ThemedView style={{ marginTop: 24, marginBottom: 16 }}>
        <ThemedText type="title">ChatBot</ThemedText>
        <View style={{ height: 260, backgroundColor: '#f5fafd', borderRadius: 12, padding: 12, marginVertical: 8 }}>
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={{
                alignSelf: item.from === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === 'user' ? '#2196f3' : '#e3f2fd',
                borderRadius: 16,
                marginVertical: 2,
                padding: 8,
                maxWidth: '80%',
              }}>
                <ThemedText style={{ color: item.from === 'user' ? '#fff' : '#1976d2' }}>{item.text}</ThemedText>
              </View>
            )}
          />
        </View>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="พิมพ์ข้อความ..."
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
              marginRight: 8,
              borderWidth: 1,
              borderColor: '#e3f2fd'
            }}
          />
          <TouchableOpacity onPress={sendMessage} style={{ padding: 8 }}>
            <Ionicons name="send" size={22} color="#2196f3" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
