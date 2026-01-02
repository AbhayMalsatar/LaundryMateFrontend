import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { StatusBar } from "expo-status-bar";
import { LightTheme, DarkTheme } from "../../theme/color";
import Container from "../../components/common/Container";
import PrimaryButton from "../../components/common/PrimaryButton";
import SubText from "../../components/common/SubText";
import { otpRequestApi, registerApi } from "../../api/auth.api";
import { useNavigation } from "@react-navigation/native";

const OTP_LENGTH = 6;

export default function OtpVerificationScreen({ route }: any) {
  const scheme = useColorScheme();
  const navigation = useNavigation();
  const colors = scheme === "dark" ? DarkTheme : LightTheme;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const { mobile, isRegister, formData } = route.params;

  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    let interval: any;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (value: string, index: number) => {
    if (!value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const otpCode = otp.join("");
      if (otpCode.length < OTP_LENGTH) {
        alert("Please enter the complete OTP.");
        return;
      }
      if (isRegister) {
        console.log(formData);
        const res = await registerApi({ ...formData, otp: otpCode } as any);
        console.log(res);
        if (res && res.data.status === 201) {
          Alert.alert("Success", "Registration successful!");
          navigation.navigate("Login" as never);
        } else {
          alert("Registration failed. Please try again.");
        }
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred during Registration."
      );
    }
  };

  const handleResendOtp = async () => {
    try {
      if (canResend) {
        setOtp(Array(OTP_LENGTH).fill(""));
        setTimer(30);
        setCanResend(false);
        const res = await otpRequestApi(mobile);
        if (res.status === 200) {
          Alert.alert("Success", "OTP sent to your mobile number");
        }
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred while resending OTP."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.background }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar style={scheme === "dark" ? "light" : "dark"} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <Container style={styles.container}>
          <View
            style={[styles.iconBox, { backgroundColor: colors.primary + "20" }]}
          >
            <MaterialIcons name="lock-open" size={36} color={colors.primary} />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            Enter Verification Code
          </Text>

          <Text style={[styles.subtitle, { color: colors.subText }]}>
            We have sent a 6-digit code to
          </Text>

          <Text style={[styles.mobile, { color: colors.text }]}>
            +91 95106 59029
          </Text>

          {/* OTP Inputs */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputs.current[index] = ref;
                }}
                value={digit}
                keyboardType="number-pad"
                maxLength={1}
                style={[
                  styles.otpInput,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                    color: colors.text,
                  },
                ]}
                onChangeText={(value) => handleChange(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handleBackspace(digit, index);
                  }
                }}
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* Resend */}
          <SubText>
            Didn’t receive the code?{" "}
            <Text
              style={{ color: colors.primary, fontWeight: "700" }}
              onPress={handleResendOtp}
            >
              Resend
            </Text>
          </SubText>

          <Text style={styles.timer}>Resend available in {timer}s</Text>

          {/* Verify Button */}
          <PrimaryButton
            style={styles.button}
            onPress={handleVerify}
            title="Verify Now"
          />
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  iconBox: {
    height: 64,
    width: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  mobile: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6,
    marginBottom: 30,
  },
  otpRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },
  otpInput: {
    height: 52,
    width: 44,
    borderRadius: 12,
    borderWidth: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  resendText: {
    fontSize: 13,
  },
  timer: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 6,
    marginBottom: 30,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
