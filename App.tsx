import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import i18n from './src/localization/i18n/i18n.config';


export default function App() {

  return (
    <SafeAreaProvider>
     <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
