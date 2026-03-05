import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import Typography from "@/components/ui/Typography";
import Input from "@/components/ui/Input";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { router } from "expo-router";
import { LoginFormData, loginSchema } from "@/utils/schema/auth.schema";
import { useAuth } from "@/context/AuthContext";
import { Theme } from "@/constants/theme";

export default function LoginPage() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [isShow, setIsShow] = useState<boolean>(false);
  // context
  const { isLoading, login, isAuthenticated } = useAuth();

  // Auto redirect if user already logged in
  
   // useEffect(() => {
   //   if (isAuthenticated) {
   //     router.replace("/(pages)/dashboard");
   //   }
   // }, [isAuthenticated]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      router.replace("/(pages)/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenWrapper>
      <Typography variant="h2" style={styles.title}>
        Welcome Back
      </Typography>
      <Typography variant="body" style={styles.subTitle}>
        Login in to continue making a difference.
      </Typography>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Ionicons name="mail-outline" size={21} />}
            value={value}
            onChangeText={(text) => {
              const filtered = text.replace(/[^a-z@.]/g, "");
              onChange(filtered);
            }}
            onBlur={onBlur}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={!isShow}
            leftIcon={<Ionicons name="lock-closed-outline" size={21} />}
            rightIcon={
              <Ionicons
                name={isShow ? "eye-off-outline" : "eye-outline"}
                size={21}
                onPress={() => setIsShow(!isShow)}
              />
            }
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      />

      <Typography style={styles.span} weight="medium">
        Forget password ?
      </Typography>

      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        style={{ marginTop: 10 }}
      />

      <Typography style={styles.footerText} weight="medium">
        New Member ?
        <Typography
          style={styles.span}
          weight="medium"
          onPress={() => router.push("/register")}
        >
          {" "}
          Register now
        </Typography>
      </Typography>
    </ScreenWrapper>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    title: {
      color: theme.primary,
      fontFamily: "Poppins_700Bold",
    },
    subTitle: {
      color: theme.icon,
      marginBottom: 25,
    },
    span: {
      color: theme.primary,
      fontSize: 15,
      textAlign: "right",
      marginBottom: 10,
    },
    footerText: {
      marginTop: 10,
      textAlign: "center",
    },
  });
