import { View, Text, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useTheme} from '@/hooks/use-theme'
import Typography from "@/components/ui/Typography";
import Input from "@/components/ui/Input";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import { registerSchema, RegisterFormData} from "@/utils/schema/auth.schema";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";
import { Theme } from "@/constants/theme";

export default function RegisterPage() {
 const theme = useTheme();
 const styles = createStyles(theme);
 const [isShow, setIsShow] = useState<boolean>(false);
 // context
 const {register, isLoading} = useAuth()

 const { control, handleSubmit, formState: { errors, isSubmitting }} = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  const onSubmit = async(data: RegisterFormData) => {
    try {
     await register(data);
     router.replace("/(auth)/login");  
    } catch (error) {
     console.log(error);
   }
  };
  
  return (
   <ScreenWrapper>
     <Typography variant="h2" style={styles.title}>Get Started</Typography>
     <Typography variant="body" style={styles.subTitle}>Join Us and be part of the change!</Typography>
    
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
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="User name"
            placeholder="Enter your name"
            keyboardType="default"
            autoCapitalize="none"
            leftIcon={<Ionicons name="mail-outline" size={21} />}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.name?.message}
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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Confirm Password"
            placeholder="Enter your confirm password"
            secureTextEntry
            leftIcon={<Ionicons name="lock-closed-outline" size={21} />}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.confirmPassword?.message}
          />
        )}
      />

      <Controller
       control={control}
       name="agree"
       render={({ field: { onChange, value } }) => (
       <View style={styles.checkboxContainer}>
       <Ionicons
         name={value ? "checkbox" : "square-outline"}
         size={22}
         color={theme.primary}
         onPress={() => onChange(!value)}
       />

      <Typography style={styles.checkboxText}>I agree to{" "}
       <Typography style={styles.span} weight="medium">Terms</Typography>
        {" "}&{" "}
       <Typography style={styles.span} weight="medium">Privacy Policy</Typography>
      </Typography>
      </View>
     )}
  />
      <Button
        title="Register"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading || isSubmitting}
        style={{ marginTop: 10 }}/>

      <Typography style={styles.footerText} weight="medium">Already have an account ? 
      <Typography style={styles.span} weight="medium" onPress={() => router.push("/login")}>{" "}Log in</Typography>   
      </Typography>   

     </ScreenWrapper>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    title:{
     color: theme.primary,  
     fontFamily: "Poppins_700Bold",
    },
    subTitle : {
     color:theme.icon,
     marginBottom:25
   }, 
   checkboxContainer : {
    flexDirection: "row",
    alignItems: "center",
    marginBottom:15
   },
   checkboxText: {
     marginLeft: 8,
     fontSize:15
   },
   span : {
    color: theme.primary,
    fontSize:15
   },
   footerText : {
    marginTop:10,
    textAlign:'center'
   }
  });



