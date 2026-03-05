# 🧺 LaundryMate Frontend

A comprehensive **React Native (Expo)** mobile application for managing laundry business operations. LaundryMate provides a complete solution for laundry shop owners to manage orders, customers, services, cloth types, pricing, and more — all with a beautiful, theme-aware UI supporting both light and dark modes.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Module Descriptions](#module-descriptions)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Localization](#localization)
- [Theming](#theming)
- [API Integration](#api-integration)
- [Contributing](#contributing)

---

## ✨ Features

- **Authentication System** — Login, Registration, and OTP Verification with mobile number-based authentication
- **Dashboard** — Central hub for business overview and quick navigation
- **Order Management** — Create, edit, and manage laundry orders with customer selection, service assignment, and cloth type categorization
- **Customer Management** — Full customer listing with A-Z alphabetical rail navigation, search, and customer creation
- **Service Management** — Add, edit, and toggle active status for laundry services (e.g., Washing, Dry Cleaning, Ironing)
- **Cloth Type Management** — Define and manage cloth types (e.g., Silk Saree, Cotton Shirt) with active/inactive status
- **Base Price Configuration** — Set and manage pricing for service-cloth type combinations
- **Dark/Light Theme** — Automatic theme detection with full dark mode support across all screens
- **Multi-language Support** — Internationalization (i18n) with English and Gujarati translations
- **Custom Drawer Navigation** — Collapsible menu sections for Business, Customers, and Reports
- **Reusable Components** — Shared UI components including dropdowns, inputs, buttons, modals, and containers

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React Native** | Cross-platform mobile framework |
| **Expo** | Development platform & build tooling |
| **React Navigation** | Drawer & stack navigation |
| **i18next / react-i18next** | Internationalization |
| **expo-localization** | Device locale detection |
| **AsyncStorage** | Persistent local storage |
| **react-native-reanimated** | Smooth animations |
| **@expo/vector-icons** | Material Icons & Ionicons |

---

## 📁 Project Structure

```
LaundryMateFrontend/
├── index.ts                          # App entry point (registerRootComponent)
├── App.tsx                           # Root application component
├── babel.config.js                   # Babel configuration with Reanimated plugin
├── src/
│   ├── api/                          # API layer
│   │   ├── api.ts                    # Base URL & endpoint definitions
│   │   └── auth.api.ts              # Authentication API functions
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── common/                   # Shared base components
│   │   │   ├── Container.tsx         # Safe area wrapper component
│   │   │   ├── Input.tsx             # Styled text input component
│   │   │   ├── PrimaryButton.tsx     # Primary action button
│   │   │   ├── Text.tsx              # Custom themed text (CustomText)
│   │   │   ├── SubText.tsx           # Secondary/subtitle text
│   │   │   └── CommonDropdown.tsx    # Reusable dropdown selector
│   │   ├── Drawers/                  # Navigation drawers
│   │   │   └── CustomDrawer.tsx      # Main app drawer with collapsible sections
│   │   └── Modals/                   # Modal dialogs
│   │       ├── AddEditService.tsx    # Add/Edit service modal
│   │       └── AddEditClothTypes.tsx # Add/Edit cloth type modal
│   │
│   ├── context/                      # React Context providers
│   │   └── AuthContext.tsx           # Authentication state & logout handler
│   │
│   ├── data/                         # Static data & enumerations
│   │   └── enum/
│   │       └── ScreenName.ts        # Screen name constants for navigation
│   │
│   ├── localization/                 # Internationalization (i18n)
│   │   ├── i18n/
│   │   │   └── i18n.config.ts       # i18next initialization & language switching
│   │   └── translation/
│   │       ├── index.ts             # Translation barrel export
│   │       ├── en.tsx               # English translations
│   │       └── gu.tsx               # Gujarati translations
│   │
│   ├── screens/                      # Application screens
│   │   ├── Authentication/           # Auth flow screens
│   │   │   ├── LoginScreen.tsx       # User login with credentials
│   │   │   ├── RegisterScreen.tsx    # New user registration
│   │   │   └── OtpVerificationScreen.tsx # 6-digit OTP verification
│   │   ├── Dashboard/                # Main dashboard
│   │   │   └── ProfileScreen.tsx     # User profile screen
│   │   ├── Customers/                # Customer management
│   │   │   └── CustomerListScreen.tsx # Customer listing with A-Z navigation
│   │   ├── ClothTypes/               # Cloth type management
│   │   │   └── ClothTypesListing.tsx # Cloth types listing screen
│   │   └── ManageOrders/             # Order management
│   │       └── AddEditOrderScreen.tsx # Create/edit order form
│   │
│   └── theme/                        # Theming
│       └── color.ts                  # LightTheme & DarkTheme color definitions
```

---

## 📦 Module Descriptions

### 🔐 `src/screens/Authentication/`
The **Authentication module** handles the complete user onboarding flow:

- **`LoginScreen.tsx`** — Provides a login form with username/password fields, a "Forgot Password" link, Face ID/biometric login option, and a link to the registration screen. Styled with the app's primary blue (`#137fec`) accent color.
- **`RegisterScreen.tsx`** — Collects user details (username, mobile number, email, password) and triggers an OTP request to the user's mobile number before proceeding to verification. Includes full form validation with error alerts.
- **`OtpVerificationScreen.tsx`** — A 6-digit OTP input screen with auto-focus progression between input fields, a 30-second countdown timer for resend functionality, and backspace navigation. On successful verification, completes the registration via the API.

### 📊 `src/screens/Dashboard/`
The **Dashboard module** serves as the main landing area after authentication:

- **`ProfileScreen.tsx`** — Displays user profile information within the shared `Container` component. Currently a placeholder for expanded profile management features.

### 📋 `src/screens/ManageOrders/`
The **Order Management module** handles the full order lifecycle:

- **`AddEditOrderScreen.tsx`** — A comprehensive order creation/editing form featuring customer selection via a searchable dropdown (`CommonDropdown`), an "Add Customer" quick-action button, service selection, and cloth type assignment. Includes a help link and a scrollable form layout with proper keyboard avoidance.

### 👥 `src/screens/Customers/`
The **Customer module** provides customer relationship management:

- **`CustomerListScreen.tsx`** — A performant customer listing screen with an **A-Z alphabetical rail** on the right side for quick scrolling, a floating letter popup indicator, and full dark/light theme support. Designed for shops with large customer bases.

### 👔 `src/screens/ClothTypes/`
The **Cloth Types module** manages garment categories:

- **`ClothTypesListing.tsx`** — Lists all defined cloth types (e.g., Silk Saree, Cotton Shirt, Denim Jeans). Works in conjunction with the `AddEditClothTypes` modal for CRUD operations.

### 🧩 `src/components/`
The **Components module** contains all reusable UI building blocks:

#### `common/` — Base Components
- **`Container.tsx`** — A `SafeAreaView` wrapper that provides consistent padding and theme-aware background colors across all screens.
- **`Input.tsx`** — A styled `TextInput` with label support, themed borders, and consistent spacing.
- **`PrimaryButton.tsx`** — A themed action button used for form submissions and primary CTAs.
- **`CustomText.tsx`** — A themed `Text` component for headings and primary content.
- **`SubText.tsx`** — A themed `Text` component for secondary/descriptive content.
- **`CommonDropdown.tsx`** — A configurable dropdown selector with search functionality, left icon support, and theme integration. Used for customer selection, service selection, etc.

#### `Drawers/` — Navigation
- **`CustomDrawer.tsx`** — The main application drawer featuring:
  - App branding header with laundry service icon
  - User profile section with avatar
  - Collapsible menu sections: **Business** (Manage Business, Cloth Types, Services, Base Price), **Customers**, and **Reports**
  - Individual navigation items: Dashboard, Orders, Profile, Settings
  - Logout functionality via `AuthContext`

#### `Modals/` — Dialog Components
- **`AddEditService.tsx`** — A bottom-sheet style modal for creating/editing laundry services. Includes a text input for the service name and an active status toggle switch to control order availability.
- **`AddEditClothTypes.tsx`** — A modal for creating/editing cloth types with name input and active status toggle. Mirrors the service modal pattern for UI consistency.

### 🌐 `src/api/`
The **API module** centralizes all backend communication:

- **`api.ts`** — Defines the base URL (`http://192.168.29.62:8000/api`) and all API endpoint paths for authentication (login, register, OTP request).
- **`auth.api.ts`** — Contains async functions (`otpRequestApi`, `registerApi`) that make HTTP requests to the authentication endpoints.

### 🔄 `src/context/`
The **Context module** manages global application state:

- **`AuthContext.tsx`** — Provides authentication state (logged-in user, token) and actions (login, logout) to the entire component tree via React Context API.

### 🌍 `src/localization/`
The **Localization module** enables multi-language support:

- **`i18n.config.ts`** — Initializes `i18next` with language resources, detects device locale via `expo-localization`, persists language preference in `AsyncStorage`, and supports RTL layout for languages like Arabic.
- **`translation/en.tsx`** — English translation strings for all UI labels.
- **`translation/gu.tsx`** — Gujarati (ગુજરાતી) translation strings.

### 🎨 `src/theme/`
The **Theme module** provides consistent visual styling:

- **`color.ts`** — Exports `LightTheme` and `DarkTheme` objects containing color tokens: `background`, `surface`, `text`, `subText`, `border`, `primary`, and more. Used throughout the app via `useColorScheme()`.

### 📝 `src/data/`
The **Data module** contains static definitions:

- **`ScreenName.ts`** — An enum defining all screen route names (Dashboard, Orders, Profile, Customers, Services, ClothTypes, BasePrice, etc.) to prevent magic strings in navigation calls.

---

## 🚀 Installation

### Prerequisites

- **Node.js** >= 16.x
- **npm** or **yarn**
- **Expo CLI** (`npx expo` or globally installed)
- **Expo Go** app on your mobile device (for development)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/AbhayMalsatar/LaundryMateFrontend.git
cd LaundryMateFrontend

# 2. Install dependencies
npm install
# or
yarn install

# 3. Start the Expo development server
npx expo start
```

---

## 📱 Usage

### Running the App

```bash
# Start with Expo Go
npx expo start

# Start for iOS simulator
npx expo start --ios

# Start for Android emulator
npx expo start --android

# Start in web browser
npx expo start --web
```

### App Flow

1. **Launch** → The app opens to the **Login Screen**
2. **Register** → New users can register with username, mobile, email, and password
3. **OTP Verification** → A 6-digit OTP is sent to the registered mobile number
4. **Dashboard** → After authentication, users land on the main dashboard
5. **Drawer Navigation** → Access all modules via the side drawer:
   - **Orders** → View, create, and manage laundry orders
   - **Customers** → Browse and manage customer database
   - **Business** → Configure services, cloth types, and base pricing
   - **Profile / Settings** → Manage account and app preferences

---

## ⚙️ Configuration

### API Base URL

Update the backend API URL in `src/api/api.ts`:

```typescript
export const baseUrl = "http://YOUR_SERVER_IP:8000/api";
```

### Default Language

Modify the default language in `src/localization/i18n/i18n.config.ts`:

```typescript
const fallbackLang = 'en'; // Change to 'en' for English or 'gu' for Gujarati
```

### Environment Variables

| Variable | Location | Description |
|---|---|---|
| `baseUrl` | `src/api/api.ts` | Backend API server URL |
| `APP_LANGUAGE` | AsyncStorage | Persisted user language preference |

---

## 🌍 Localization

The app supports multiple languages via `i18next`:

| Language | Code | File |
|---|---|---|
| English | `en` | `src/localization/translation/en.tsx` |
| Gujarati | `gu` | `src/localization/translation/gu.tsx` |

### Adding a New Language

1. Create a new translation file in `src/localization/translation/` (e.g., `hi.tsx`)
2. Export it from `src/localization/translation/index.ts`
3. Register it in `src/localization/i18n/i18n.config.ts` under `resources`

```typescript
// src/localization/translation/hi.tsx
export default {
  hello: "नमस्ते, आप कैसे हैं",
  welcome: "हमारे एप्लिकेशन में आपका स्वागत है!",
  // ... all keys
};
```

### Changing Language at Runtime

```typescript
import { changeAppLanguage } from './src/localization/i18n/i18n.config';

await changeAppLanguage('en'); // Switches to English
await changeAppLanguage('gu'); // Switches to Gujarati
```

---

## 🎨 Theming

The app automatically adapts to the device's color scheme:

| Token | Light Theme | Dark Theme |
|---|---|---|
| `background` | White/Light gray | Dark navy/black |
| `surface` | Light surface | Dark surface |
| `text` | Dark text | Light text |
| `subText` | Gray | Muted gray |
| `border` | Light border | Dark border |
| `primary` | `#137fec` | `#137fec` |

Theme is consumed in components via:

```typescript
const scheme = useColorScheme();
const theme = scheme === "dark" ? DarkTheme : LightTheme;
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines

- Use TypeScript for all new files
- Follow the existing component structure (themed styles, `useColorScheme` hook)
- Add translations for all user-facing strings in both `en.tsx` and `gu.tsx`
- Use `ScreenName` enum for navigation route names
- Keep components reusable and place shared ones in `src/components/common/`

---

## 📄 License

This project is open source. Please check the repository for license details.

---

<p align="center">
  Built with ❤️ using React Native & Expo
</p>
