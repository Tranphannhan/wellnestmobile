import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';

// ✅ Hạn chế strict ref typing để tránh lỗi TS liên quan đến LegacyRef
const NoRippleButton = forwardRef<any, BottomTabBarButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Pressable
        {...rest}
        ref={ref}
        android_ripple={null}
        style={({ pressed }) => ({
          opacity: 1,
          display: 'flex',
          alignItems: 'center',
        })}
      >
        {children}
      </Pressable>
    );
  }
);

NoRippleButton.displayName = 'NoRippleButton';

export default NoRippleButton;
