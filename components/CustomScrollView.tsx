import { Ionicons } from '@expo/vector-icons';
import type { PropsWithChildren, ReactElement } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_HEIGHT = 120;

type Props = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  iconName?: string;
  headerImage?: ReactElement;
  scrollEnabled?: boolean;
}>;

export default function CustomScrollView({
  children,
  title,
  subtitle,
  iconName = 'water-sharp',
  headerImage,
  scrollEnabled = true,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: 0 },
      { scale: 1 },
    ],
    shadowOpacity: 0.12,
    elevation: 4,
  }));

  return (
    <ThemedView style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: colorScheme === 'light' ? '#326a95' : '#1D3D47',
            ...Platform.select({
              ios: {
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 16,
              },
              android: {
                elevation: 8,
                borderRadius: 16,
              },
            }),
          },
          headerAnimatedStyle,
        ]}
      >
        <View style={styles.headerRow}>
          {iconName && (
            <Ionicons
              name={iconName as any}
              size={44}
              color="#ffffffff"
              style={styles.headerIcon}
            />
          )}
          <View style={styles.headerTextBox}>
            {title && (
              <ThemedText variant="bold" style={styles.headerTitle}>
                {title}
              </ThemedText>
            )}
            {subtitle && (
              <ThemedText style={styles.headerSubtitle}>
                {subtitle}
              </ThemedText>
            )}
            {headerImage}
          </View>
        </View>
      </Animated.View>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
      >
        {children}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Set background to white
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    marginTop: Platform.OS === 'ios' ? 8 : 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    paddingTop: 18,
    paddingBottom: 8,
    width: '100%',
  },
  headerIcon: {
    marginLeft: 12,
    opacity: 0.92,
  },
  headerTextBox: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
  },
  headerTitle: {
    color: '#ffffffff',
    fontSize: 24,
    marginBottom: 2,
  },
  headerSubtitle: {
    color: '#ffffffff',
    fontSize: 15,
    opacity: 0.85,
    fontWeight: '500',
    marginTop: 2,
    marginLeft: 2,
    marginRight: 10,
  },
  headerContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 18,
    zIndex: 2,
  },
  scrollContent: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    gap: 16,
    paddingBottom: 80,
  },
});