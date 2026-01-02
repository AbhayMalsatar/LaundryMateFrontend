import { View, Text, StyleSheet, Image, Animated, useColorScheme } from "react-native";
import { useContext, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import Container from "../../components/common/Container";
import CustomText from "../../components/common/Text";
import SubText from "../../components/common/SubText";

export default function SplashScreen() {
  const progress = useRef(new Animated.Value(0)).current;
  const { isAuthenticated } = useContext(AuthContext);
  const scheme = useColorScheme();

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated) {
        navigation.navigate('Login' as never);
      } else {
        navigation.navigate('Login' as never);
      }
    }, 2000);
  }, []);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.3, // 30%
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, []);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Container style={styles.container}>

      <StatusBar style={"auto"} />

      {/* Decorative Bubbles */}
      <View style={[styles.bubble, styles.bubbleTop]} />
      <View style={[styles.bubble, styles.bubbleBottom]} />

      {/* Logo */}
      <View style={styles.logoWrapper}>
        <View style={styles.glow} />
        <View style={styles.logoBox}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logoImage}
          />
          <View style={styles.iconOverlay}>
            <MaterialIcons
              name="local-laundry-service"
              size={60}
              color="#fff"
            />
          </View>
        </View>
      </View>

      {/* Branding */}
      <CustomText style={styles.title}>LaundryMate</CustomText>
      <SubText style={styles.subtitle}>Automating your wash</SubText>

      {/* Progress */}
      <View style={styles.progressWrapper}>
        <View style={styles.progressHeader}>
          <Text style={styles.loadingText}>Loading resources...</Text>
          <Text style={styles.percent}>30%</Text>
        </View>

        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.progressFill, { width: widthInterpolated }]}
          />
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  bubble: {
    position: "absolute",
    borderRadius: 200,
  },
  bubbleTop: {
    width: 260,
    height: 260,
    backgroundColor: "rgba(19,127,236,0.08)",
    top: -80,
    left: -80,
  },
  bubbleBottom: {
    width: 320,
    height: 320,
    backgroundColor: "rgba(19,127,236,0.12)",
    bottom: -100,
    right: -120,
  },

  logoWrapper: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    width: 160,
    height: 160,
    backgroundColor: "rgba(19,127,236,0.2)",
    borderRadius: 80,
  },
  logoBox: {
    width: 128,
    height: 128,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(19,127,236,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 40,
  },

  progressWrapper: {
    width: "80%",
    position: "absolute",
    bottom: 60,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 12,
    color: "#9ca3af",
  },
  percent: {
    fontSize: 12,
    fontWeight: "700",
    color: "#137fec",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#137fec",
    borderRadius: 10,
  },

  version: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 12,
    color: "#9ca3af",
  },
});
