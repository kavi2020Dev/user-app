import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { FontFamily } from "@/constants/fonts";
import { Theme } from "@/constants/theme";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

type Size = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}: ButtonProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        styles[size],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <Text
            style={[
              styles.text,
              styles[`${variant}Text`],
              styles[`${size}Text`],
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}


const createStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",       
    },

    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    icon: {
      marginHorizontal: 6,
    },

    text: {
     fontFamily: FontFamily.medium
    },

    disabled: {
      opacity: 0.6,
    },

    // ===== Variants =====
    primary: {
      backgroundColor: theme.primary,
    },
    primaryText: {
      color: "#fff",
    },

    secondary: {
      backgroundColor: theme.primary,
    },
    secondaryText: {
      color: "#fff",
    },

    outline: {
      borderWidth: 1,
      borderColor: theme.primary,
      backgroundColor: "transparent",
    },
    outlineText: {
      color: theme.primary,
    },

    ghost: {
      backgroundColor: "transparent",
    },
    ghostText: {
      color: theme.primary,
    },

    danger: {
      backgroundColor: theme.error,
    },
    dangerText: {
      color: "#fff",
    },

    // ===== Sizes =====
    sm: {
      height: 36,
      paddingHorizontal: 14,
    },
    smText: {
      fontSize: 14,
    },

    md: {
      height: 48,
      paddingHorizontal: 18,
    },
    mdText: {
      fontSize: 16,
    },

    lg: {
      height: 56,
      paddingHorizontal: 22,
    },
    lgText: {
      fontSize: 18,
    },
  });