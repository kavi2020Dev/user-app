import * as yup from "yup";

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

export type LoginFormData = {
  email: string; 
  password: string;
};

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
  .string()
  .min(6, "Minimum 6 characters")
  .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  .matches(/[0-9]/, "Must contain at least one number")
  .required("Password is required")
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("User name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  agree: yup
    .boolean()
    .oneOf([true], "You must accept Terms & Policy"),  

  password: yup
  .string()
  .min(6, "Minimum 6 characters")
  .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  .matches(/[0-9]/, "Must contain at least one number")
  .required("Password is required"),

 confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});