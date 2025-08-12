import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols'; // không cần SymbolViewProps nữa
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

/**
 * Mapping SF Symbols -> MaterialIcons
 * Dựa trên https://icons.expo.fyi để chọn icon đúng.
 */
const MAPPING = {
  'house.fill': 'home',               // Trang chủ
  'search.circle.fill': 'search', // Tra cứu nổi bật
  'qrcode': 'qr-code-2',              // Mã QR
  'hammer.fill': 'build',            // Thủ công
  'person.crop.circle': 'person',    // Tài khoản
} as const;


type IconSymbolName = keyof typeof MAPPING;
type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

/**
 * A unified icon component that uses SF Symbols on iOS
 * and Material Icons on Android and web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight, // optional: currently unused
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const materialName: MaterialIconName = MAPPING[name];

  return <MaterialIcons color={color} size={size} name={materialName} style={style} />;
}
