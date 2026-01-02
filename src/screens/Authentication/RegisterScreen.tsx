import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  useColorScheme,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { StatusBar } from "expo-status-bar";
import Input from "../../components/common/Input";
import PrimaryButton from "../../components/common/PrimaryButton";
import { LightTheme, DarkTheme } from "../../theme/color";
import Container from "../../components/common/Container";
import CustomText from "../../components/common/Text";
import SubText from "../../components/common/SubText";
import { otpRequestApi } from "../../api/auth.api";
import React from "react";

export default function RegisterScreen({ navigation }: any) {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? DarkTheme : LightTheme;

  const [visible, setVisible] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
  });

  const { username, mobile, email, password } = formData;

  /**
   * hanle register user
   * @returns
   */
  const handleRegister = async () => {
    try {
      if (!mobile || !password || !username || !email) {
        Alert.alert("Error", "Please enter all fields");
        return;
      }
      const res = await otpRequestApi(mobile);
      if (res.status === 200) {
        Alert.alert("Success", "OTP sent to your mobile number");

        navigation.navigate("OtpVerification", {
          mobile,
          isRegister: true,
          formData,
        });
      }
    } catch (err: any) {
      Alert.alert( "Error",
        err?.response?.data?.message ||
          err.message ||
          "An error occurred during Registration."
      );
    }
    // Registration logic goes here
  };

  return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={"padding"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 100}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.background,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
          <View style={{ width: 22 }} />
        </View>

        <Container style={styles.container}>
          <StatusBar style={scheme === "dark" ? "light" : "dark"} />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoBox}>
              <MaterialIcons
                name="local-laundry-service"
                size={36}
                color="#137fec"
              />
            </View>

            <CustomText style={styles.title}>Create Account</CustomText>
            <SubText style={styles.subtitle}>
              Manage your laundry business effortlessly. Start your free trial
              today.
            </SubText>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name */}
            <CustomText style={styles.label}>User Name</CustomText>
            <Input
              placeholder="User Name"
              icon="person"
              value={username}
              onChangeText={(text) =>
                setFormData({ ...formData, username: text })
              }
            />

            {/* Mobile */}

            <CustomText style={styles.label}>Mobile Number</CustomText>
            <Input
              placeholder="000 000 0000"
              icon="smartphone"
              value={mobile}
              onChangeText={(text) =>
                setFormData({ ...formData, mobile: text })
              }
              keyboardType="phone-pad"
            />

            {/* Email */}
            <CustomText style={styles.label}>Email Address</CustomText>
            <KeyboardAvoidingView>
              <Input
                icon="email"
                placeholder="name@example.com"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
              />
            </KeyboardAvoidingView>

            {/* Password */}
            <CustomText style={styles.label}>Password</CustomText>

            <Input
              icon="lock"
              placeholder="Create a password"
              secureTextEntry={visible ? false : true}
              endIcon={visible ? "visibility" : "visibility-off"}
              onPressEndIcon={() => setVisible(!visible)}
              value={password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
            />

            {/* Button */}
            <PrimaryButton
              onPress={() => {
                handleRegister();
              }}
              title="Create Account"
            />

            {/* Footer */}
            <Text style={styles.footer}>
              Already have an account?{" "}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("Login")}
              >
                Log in
              </Text>
            </Text>
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    paddingTop: 54,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  logoBox: {
    height: 64,
    width: 64,
    borderRadius: 16,
    backgroundColor: "#137fec20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#111827",
  },

  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#9ca3af",
    marginRight: 10,
    marginTop: 2,
  },
  termsText: {
    fontSize: 13,
    color: "#6b7280",
    flex: 1,
  },
  link: {
    color: "#137fec",
    fontWeight: "600",
  },
  primaryBtn: {
    marginBottom: 20,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#9ca3af",
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    gap: 8,
  },
  socialText: {
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
    marginTop: 10,
  },
});
