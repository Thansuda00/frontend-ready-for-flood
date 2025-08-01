import type { PropsWithChildren, ReactElement } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_HEIGHT = 120;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [1.12, 1, 0.98]),
        },
      ],
      shadowOpacity: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [0.18, 0.12, 0.04]),
      elevation: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [8, 4, 1]),
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <Animated.View
          style={[
            styles.header,
            {
              backgroundColor: colorScheme === 'light' ? '#e3f2fd' : '#1D3D47',
              shadowColor: colorScheme === 'light' ? '#1976d2' : '#000',
              ...Platform.select({
                ios: {
                  shadowOffset: { width: 0, height: 4 },
                  shadowRadius: 16,
                },
                android: {
                  elevation: 8,
                },
              }),
            },
            headerAnimatedStyle,
          ]}
        >
          <View style={styles.headerContent}>
            {headerImage}
          </View>
          {/* Decorative SVG wave at the bottom of the header */}
          <Svg
            height={36}
            width="100%"
            viewBox="0 0 360 36"
            style={styles.wave}
            preserveAspectRatio="none"
          >
            <Path
              d="M0 18 Q90 36 180 18 T360 18 V36 H0 Z"
              fill={colorScheme === 'light' ? '#e3f2fd' : '#1D3D47'}
              opacity={0.95}
            />
          </Svg>
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'visible',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 8 : 0,
    marginBottom: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    position: 'relative',
  },
  headerContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 0,
    zIndex: 2,
  },
  wave: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 16,
    overflow: 'visible',
  },
});
