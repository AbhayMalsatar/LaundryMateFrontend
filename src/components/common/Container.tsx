import { View, StyleSheet, useColorScheme } from "react-native";
import { ReactNode } from "react";
import { LightTheme, DarkTheme } from "../../theme/color";
import { StatusBar } from "expo-status-bar";

type ContainerProps = {
  children: ReactNode;
  style?: any;
};

export default function AppView({ children, style }: ContainerProps) {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? DarkTheme : LightTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }, style]}>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});