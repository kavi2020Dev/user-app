import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Typography from "@/components/ui/Typography";

export default function Dashboard() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
          <Text style={{ color: "red", fontWeight: "600" }}>
            Logout
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Typography style={styles.text}>Under Maintenance</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    
    justifyContent: "center",  
    alignItems: "center",       
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});