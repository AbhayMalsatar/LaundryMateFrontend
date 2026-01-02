import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Authentication/LoginScreen";
import SplashScreen from "../screens/Splash/SplashScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import OtpVerificationScreen from "../screens/Authentication/OtpVerificationScreen";

const AuthStack = () => {
  type RootStackParamList = {
    Login: undefined;
    Splash: undefined;
    Register: undefined;
    OtpVerification: undefined;
  };
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, title: "",  }} initialRouteName="Login">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
export default AuthStack;
