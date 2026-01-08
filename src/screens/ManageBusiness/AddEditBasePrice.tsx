import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LightTheme, DarkTheme } from "../../theme/color";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenName } from "../../data/enum/ScreenName";
import { DrawerNavProp } from "../../data/types/DrawerParmList";
import CommonDropdown from "../../components/common/CommonDropdown";

const clothTypes = [
  { label: "Men's Shirt", value: "shirt" },
  { label: "Trousers", value: "trousers" },
  { label: "Jacket", value: "jacket" },
];

const services = [
  { label: "Wash & Iron", value: "wash_iron" },
  { label: "Dry Clean", value: "dry_clean" },
  { label: "Steam Only", value: "steam" },
];

export default function AddEditBasePrice() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? DarkTheme : LightTheme;
  const navigation = useNavigation<DrawerNavProp>();

  const [clothType, setClothType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(true);

  const onSave = () => {
    const data = { clothType, serviceType, price, active };
    console.log("Saved:", data);
    navigation.navigate(ScreenName.ManageBusiness, {screen:ScreenName.BasePrice});
  };

  return (
    <SafeAreaView  style={{ flex: 1, backgroundColor: theme.background }}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER */}
      <View
        style={[
          styles.header,
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.headerBtn, { color: theme.primary }]}>
            Cancel
          </Text>
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Add Base Price
        </Text>

        <TouchableOpacity onPress={onSave}>
          <Text style={[styles.headerBtn, { color: theme.primary }]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* DETAILS */}
        <Section title="Details" theme={theme} />

        <CommonDropdown
          label=""
          labelField={"label"}
          valueField={"value"}
          placeholder="Cloth"
          data={clothTypes}
          value={""}
          search={false}
          onChange={(item: any) => {}}
          theme={theme}
          leftIcon="checkroom"
        />

       <CommonDropdown
        label=""
        labelField={"label"}
        valueField={"value"}
        placeholder="Service"
        data={services}
        value={""}
        search={false}
        onChange={(item: any) => {}}
        theme={theme}
        leftIcon="iron"
      />

        {/* PRICING */}
        <Section title="Pricing" theme={theme} />

        <View>
          <Text style={[styles.label, { color: theme.text }]}>
            Base Price
          </Text>

          <View
            style={[
              styles.priceInput,
              { backgroundColor: theme.inputBg },
            ]}
          >
            <Text style={[styles.currency, { color: theme.subText }]}>
              ₹
            </Text>

            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              placeholderTextColor={theme.subText}
              keyboardType="decimal-pad"
              style={[styles.priceField, { color: theme.text }]}
            />
          </View>

          <Text style={[styles.helper, { color: theme.subText }]}>
            Base price before any discounts or surcharges.
          </Text>
        </View>

        {/* SETTINGS */}
        <Section title="Settings" theme={theme} />

        <View
          style={[
            styles.switchCard,
            { backgroundColor: theme.inputBg },
          ]}
        >
          <View>
            <Text style={[styles.switchTitle, { color: theme.text }]}>
              Active Status
            </Text>
            <Text style={[styles.switchSub, { color: theme.subText }]}>
              Enable this price for new orders
            </Text>
          </View>

          <Switch
            value={active}
            onValueChange={setActive}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor="#fff"
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FOOTER */}
      <View
        style={[
          styles.footer,
          { backgroundColor: theme.surface, borderTopColor: theme.border },
        ]}
      >
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: theme.primary }]}
          onPress={onSave}
        >
          <Text style={styles.saveText}>Save Entry</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, theme }: any) {
  return (
    <Text style={[styles.section, { color: theme.muted }]}>
      {title.toUpperCase()}
    </Text>
  );
}

function Dropdown({ label, value, placeholder, theme, onPress }: any) {
  return (
    <View>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>

      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.dropdown,
          { backgroundColor: theme.inputBg },
        ]}
      >
        <Text
          style={{
            color: value ? theme.text : theme.subText,
            fontSize: 16,
          }}
        >
          {value || placeholder}
        </Text>

        <MaterialIcons
          name="keyboard-arrow-down"
          size={26}
          color={theme.subText}
        />
      </TouchableOpacity>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderBottomWidth: 1,
  },
  headerBtn: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  content: {
    padding: 16,
    gap: 20,
  },
  section: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  dropdown: {
    height: 54,
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceInput: {
    height: 54,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  currency: {
    fontSize: 18,
    marginRight: 6,
  },
  priceField: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
  },
  helper: {
    fontSize: 12,
    marginTop: 6,
  },
  switchCard: {
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  switchSub: {
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  saveBtn: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
