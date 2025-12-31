import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { MaterialIcons, MaterialIconsIconName } from "@react-native-vector-icons/material-icons";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "../../theme/color";

type Props = TextInputProps  & {
  endIcon?: MaterialIconsIconName;
  icon: MaterialIconsIconName;
  onPressEndIcon?: () => void;
}

export default function Input({ icon, style,onPressEndIcon, ...props }: Props) {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? DarkTheme : LightTheme;
  return (
    <View style={[styles.wrapper, { backgroundColor: colors.inputBg }]}>
      <MaterialIcons name={icon} size={22} color="#9ca3af" />
      <TextInput
        {...props}
        style={[styles.input, style, { color: colors.text }]}
        placeholderTextColor="#9ca3af"
      />
      {props?.endIcon && <MaterialIcons onPress={onPressEndIcon ? onPressEndIcon : ()=>{}} name={props.endIcon} size={20} color="#9ca3af" />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#111827",
  },
});
