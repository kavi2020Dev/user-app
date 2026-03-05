import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginFormData, RegisterFormData } from "@/utils/schema/auth.schema";
import Toast from "react-native-toast-message";

const STORAGE_KEY = "APP_USER";

interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
  isLogin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user?.isLogin;

  const showSnackbar = (type: "success" | "error", message: string) => {
    Toast.show({
      type,
      text1: message,
      position: "bottom",
    });
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.log("Load user error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login
  const login = async (data: LoginFormData): Promise<void> => {
    try {
      setIsLoading(true);

      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);

      if (!storedUser) {
        throw new Error("User not found");
      }

      const parsedUser: User = JSON.parse(storedUser);

      const isValid =
        parsedUser.email === data.email &&
        parsedUser.password === data.password;

      if (!isValid) {
        throw new Error("Invalid email or password");
      }

      const updatedUser: User = {
        ...parsedUser,
        isLogin: true,
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);

      showSnackbar("success", "Login successful");
    } catch (error: unknown) {
      if (error instanceof Error) {
        showSnackbar("error", error.message);
      } else {
        showSnackbar("error", "Login failed");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register
  const register = async (data: RegisterFormData): Promise<void> => {
    try {
      setIsLoading(true);

      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);

        if (parsedUser.email === data.email) {
          throw new Error("Email already registered");
        }
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        password: data.password,
        isLogin: false,
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

      showSnackbar("success", "Account created successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        showSnackbar("error", error.message);
      } else {
        showSnackbar("error", "Registration failed");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);

      if (!storedUser) return;

      const parsedUser: User = JSON.parse(storedUser);

      const updatedUser: User = {
        ...parsedUser,
        isLogin: false,
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);

      showSnackbar("success", "Logged out successfully");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
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