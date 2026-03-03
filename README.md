# user-app

# 📱 User App (Expo + TypeScript)

A scalable React Native application built using **Expo Router**, 
with authentication flow, reusable UI components, and form validation.

---

## Tech Stack

- Expo
- React Native
- TypeScript
- Expo Router
- React Hook Form
- Yup (Schema validation)
- Context API (Auth management)
- Custom Theming System


## Authentication Flow

- Auth state is managed using `AuthContext`
- If user is not logged in → redirected to `(auth)` stack
- If logged in → redirected to `(pages)` stack
- Navigation handled using `expo-router`

---

## Login and Register Page Features

The Login page includes:

✅ React Hook Form integration  
✅ Yup schema validation  
✅ Controlled inputs using `Controller`  
✅ Password show/hide toggle  
✅ Loading state on submit  
✅ Theme-based styling  
✅ Navigation after successful login  


## 🎨 Theming System

Custom `useTheme()` hook provides:

- Primary colors
- Text colors
- Icon colors

All components use centralized theme values for consistency.

---

## 🧩 Reusable Components

### 🔹 Input Component
- Label
- Error message
- Left icon
- Right icon
- Secure input support

### 🔹 Button Component
- Loading state
- Custom styles
- Reusable across app

### 🔹 Typography Component
- Variant support (h1, h2, body, etc.)
- Font weight control
- Theme-based coloring

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/kavi2020Dev/user-app.git
cd user-app
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Start Development Server

```
npx expo start
```
---

## 📱 Run On

- Android Emulator
- iOS Simulator
- Expo Go App


## 👨‍💻 Author

Kavi  
Frontend Developer (React / React Native)