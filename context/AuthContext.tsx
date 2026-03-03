import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginFormData, RegisterFormData } from "@/utils/schema/auth.schema";
import Toast from "react-native-toast-message";

interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  agree?: boolean;
  isLogin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data : LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isExitingUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    isExitingUser();
  }, []);

  // Login
 const login = async (data: LoginFormData): Promise<void> => {
  try {
    setIsLoading(true);

    const storedUser = await AsyncStorage.getItem("user");

    if (!storedUser) {
      throw new Error("User not found");
    }

    const parsedUser: User = JSON.parse(storedUser);

    if (
      parsedUser.email !== data.email ||
      parsedUser.password !== data.password
    ) {
      throw new Error("Invalid email or password");
    }

    const updatedUser: User = {
      ...parsedUser,
      isLogin: true,
    };

    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    Toast.show({
      type: "success",
      text1: "Login Successfully..!",
      position: "bottom",
    });

  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: error.message || "Login failed",
      position: "bottom",
    });

    throw error;
  } finally {
    setIsLoading(false);
  }
};

  // Register
  const register = async (data: RegisterFormData) => {
  try {
    setIsLoading(true);

    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      isLogin: false,
    };

    await AsyncStorage.setItem("user", JSON.stringify(newUser));

    Toast.show({
      type: "success",
      text1: "User created Successfully..!",
      position: "bottom",
    });

  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Registration failed",
      position: "bottom",
    });

    throw error;   
  } finally {
    setIsLoading(false);
  }
};
  // Logout
  const logout = async () => {
  const storedUser = await AsyncStorage.getItem("user");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    const updatedUser = {
      ...parsedUser,
      isLogin: false,
    };
    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }
};

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
