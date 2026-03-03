import Typography from "@/components/ui/Typography";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function PagesLayout() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) return null;

  if (!user?.isLogin) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity
            onPress={logout}
            style={{ marginRight: 15 }}
          >
            <Typography style={{ color: "red"}}>
              Logout
            </Typography>
          </TouchableOpacity>
        ),
      }}
    />
  );
}