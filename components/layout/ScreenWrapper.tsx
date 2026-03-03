import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";

interface ScreenWrapperProps {
  children: React.ReactNode;
  scroll?: boolean;          
  contentStyle?: ViewStyle;  
}

export default function ScreenWrapper({
  children,
  scroll = true,
  contentStyle,
}: ScreenWrapperProps) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        {scroll ? (
          <ScrollView
            contentContainerStyle={[
              {
                flexGrow: 1,
                padding: 16,
              },
              contentStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View
            style={[
              {
                flex: 1,
                padding: 16,
                paddingBottom: Platform.OS === "android" ? 60 : 40,
              },
              contentStyle,
            ]}
          >
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}