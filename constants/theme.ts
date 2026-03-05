export type Theme = {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  primary: string;
  error: string;
  inputBackground: string;
  border:string;
  muted:string;
};

export const Colors: Record<"light" | "dark", Theme> = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: "#0a7ea4",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#0a7ea4",
    primary: "#006838",
    error: "#B2060E",
    muted: "#687076",
    inputBackground: "#F3F3F4",
    border : "#687076",
  },

  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: "#fff",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#fff",
    primary: "#006838",
    error: "#B2060E",
    inputBackground: "#2A2A2A",
    border : "#687076",
    muted: "#687076",
  },
};