import { Colors, Theme } from "@/constants/theme";
import { useColorScheme } from "react-native";

export const useTheme = (): Theme => {
  const scheme = useColorScheme() ?? "light";
  return Colors[scheme];
};