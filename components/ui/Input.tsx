import React, { forwardRef } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { FontFamily } from "@/constants/fonts";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      containerStyle,
      inputStyle,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const theme:any = useTheme();
    const styles = createStyles(theme, !!error);

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={styles.inputContainer}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            placeholderTextColor={theme.muted}
            style={[styles.input, inputStyle]}
            {...props}
          />

          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

export default Input;


const createStyles = (theme: any, hasError: boolean) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: hasError ? 8 : 16,
    },

    label: {
      marginBottom:3,
      fontSize: 16,
      color: theme.text,
      fontFamily: FontFamily.medium,
    },

    inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,             
    borderWidth: 1,
    borderColor: hasError ? theme.error : theme.border,
    borderRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: theme.inputBackground,
},

input: {
  flex: 1,
  fontSize: 16,
  color: theme.text,
  fontFamily: FontFamily.regular,
  paddingTop: 3,
  paddingBottom:0,
  textAlignVertical: "center", 
},
    icon: {
      marginHorizontal: 4,
    },

    error: {
      marginTop: 6,
      fontSize: 14,
      color: theme.error,
      fontFamily: FontFamily.regular,
    },
  });