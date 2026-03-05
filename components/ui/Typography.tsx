import React from "react";
import {
  Text,
  TextProps,
  StyleSheet,
  TextStyle,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { FontFamily } from "@/constants/fonts";
import { Theme } from "@/constants/theme";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "caption"
  | "button";

interface TypographyProps extends TextProps {
  variant?: Variant;
  weight?: "regular" | "medium" | "bold";
  children: React.ReactNode;
}

export default function Typography({
  variant = "body",
  weight = "regular",
  style,
  children,
  ...rest
}: TypographyProps) {
  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        styles[weight],
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      color: theme.text,
    },

    h1: {
      fontSize: 32,
      lineHeight: 40,
    },

    h2: {
      fontSize: 24,
      lineHeight: 32,
    },

    h3: {
      fontSize: 20,
      lineHeight: 28,
    },

    body: {
      fontSize: 16,
      lineHeight: 24,
    },

    caption: {
      fontSize: 12,
      lineHeight: 16,
    },

    button: {
      fontSize: 14,
      textTransform: "uppercase",
    },

    regular: {
      fontFamily: FontFamily.regular,
    },

    medium: {
      fontFamily: FontFamily.medium,
    },
    
    bold: {
      fontFamily: FontFamily.bold,
    },
  });