import type { PropsWithChildren, ReactElement } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import Animated, {
  useAnimatedStyle,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_HEIGHT = 120;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  scrollable?: boolean; // control scroll behavior
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  scrollable = true, // default scrollable true
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const bottom = useBottomTabOverflow();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: 0,
        },
        {
          scale: 1,
        },
      ],
      shadowOpacity: 0.12,
      elevation: 4,
    };
  });

  const ContentWrapper = scrollable
    ? Animated.ScrollView
    : View; // fallback to non-scroll

  return (
    <ThemedView style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: '#326a95',
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
        <View style={styles.headerContent}>{headerImage}</View>
      </Animated.View>

      <ContentWrapper
        style={styles.scrollContent}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {children}
      </ContentWrapper>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Force white background
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
