import { Slot } from 'expo-router';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Kanit-Regular': require('@/assets/fonts/Kanit-Regular.ttf'),
      'Kanit-Bold': require('@/assets/fonts/Kanit-Bold.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
