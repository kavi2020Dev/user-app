import Typography from "@/components/ui/Typography";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import React, { useCallback } from "react";

export default function PagesLayout() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  // Loading state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <Typography style={{ color: "red" }}>
              Logout
            </Typography>
          </TouchableOpacity>
        ),
      }}
    />
  );
}