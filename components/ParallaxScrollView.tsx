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
          <View style={styles.headerContent}>
            {headerImage}
          </View>
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
    overflow: 'hidden', // Ensure the radius is applied correctly
    marginTop: Platform.OS === 'ios' ? 8 : 0,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    position: 'relative',
    borderBottomLeftRadius: 20, // Add bottom left radius
    borderBottomRightRadius: 20, // Add bottom right radius
    marginLeft: 20,
    marginRight: 20,
  },
  headerContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    paddingTop: 18,
    paddingBottom: 18, // Add padding to center content better
    marginHorizontal: 'auto', // Center horizontally if applicable
    zIndex: 2,
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 16,
    overflow: 'visible',
    marginRight: 20,
  },
});
