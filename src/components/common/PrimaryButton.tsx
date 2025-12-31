import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import MaterialIcons, { MaterialIconsIconName } from "@react-native-vector-icons/material-icons";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "../../theme/color";

type Props = {
  title: string;
  onPress: () => void;
  icon?: MaterialIconsIconName;
  style?: ViewStyle;
};

export default function PrimaryButton({ title, onPress, icon, style,...props }: Props) {
   const scheme = useColorScheme();
    const colors = scheme === "dark" ? DarkTheme : LightTheme;
  return (
    <TouchableOpacity {...props} style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text]}>{title}</Text>
      {icon && <MaterialIcons name={icon} size={20} color="#fff" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#137fec",
    padding: 16,
    borderRadius: 14,
    gap: 8,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
