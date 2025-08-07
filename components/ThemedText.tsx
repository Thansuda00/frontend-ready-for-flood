import { Text, TextProps } from 'react-native';

type ThemedTextProps = TextProps & {
  variant?: 'header' | 'bold' | 'regular';
};

export function ThemedText({ variant = 'regular', style, children, ...props }: ThemedTextProps) {
  let fontFamily = 'Kanit-Regular';
  if (variant === 'header' || variant === 'bold') {
    fontFamily = 'Kanit-Bold';
  }

  return (
    <Text {...props} style={[{ fontFamily }, style]}>
      {children}
    </Text>
  );
}
