import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Alert
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import Input from "../components/common/Input";
import PrimaryButton from "../components/common/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import Container from "../components/common/Container";
import { LightTheme, DarkTheme } from "../theme/color";
import { StatusBar } from "expo-status-bar";
import CustomText from "../components/common/Text";
import SubText from "../components/common/SubText";
import { loginApi } from "../api/auth.api";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const scheme = useColorScheme();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {
    try {
      if (!mobile || !password) {
        Alert.alert("Error","Please enter both mobile number and password");
        return;
      }
      const res = await loginApi(mobile, password);
      await login(res.data.token); // ✅ AuthContext
    } catch (err: any) {
      Alert.alert("Error",err?.response?.data?.message || err.message || "An error occurred during login.");
    }
  };

  const handleRegister = () => {
    // Navigate to Register Screen
    navigation.navigate("Register" as never);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <Container>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      
      {/* Header Image */}
      <ImageBackground
        source={require("../assets/images/login/login.png")}
        style={styles.image}
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.overlay}>
          <MaterialIcons name="local-laundry-service" size={32} color="#fff" />
        </View>
      </ImageBackground>

      {/* Text */}
      <CustomText style={[styles.title]}>Welcome Back</CustomText>
      <SubText style={[styles.subtitle]}>
        Log in to manage your laundry operations
      </SubText>

      {/* Mobile Input */}
      <Input
        icon="smartphone"
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />

      {/* Password Input */}
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        icon="lock"
      />
      {/* Forgot Password */}

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <PrimaryButton title="Log In" onPress={handleLogin} icon="login" />

      {/* Footer */}
      <Text style={styles.footer}>
        Don’t have an account?
        <Text style={styles.register} onPress={handleRegister}>
          {" "}
          Register now
        </Text>
      </Text>
    </Container>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    marginBottom: 24,
    marginTop: 64,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
  },

  forgot: {
    alignSelf: "flex-end",
    color: "#137fec",
    marginBottom: 24,
    fontWeight: "500",
  },
  faceBtn: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 8,
  },
  faceText: {
    fontSize: 15,
    fontWeight: "500",
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    color: "#6b7280",
  },
  register: {
    color: "#137fec",
    fontWeight: "700",
  },
});
