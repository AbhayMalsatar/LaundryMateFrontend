import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
  KeyboardAvoidingView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LightTheme, DarkTheme } from "../../theme/color";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from 'react-native-modal';


const AddCustomerScreen = () => {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? DarkTheme : LightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView  behavior={"padding"}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity>
          <Text style={[styles.headerAction, { color: colors.subText }]}>
            Cancel
          </Text>
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Add Customer
        </Text>

        <TouchableOpacity>
          <Text style={[styles.headerSave, { color: colors.primary }]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View
            style={[
              styles.avatarWrapper,
              {
                borderColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              }}
              style={styles.avatar}
            />

            <TouchableOpacity
              style={[
                styles.cameraBadge,
                { backgroundColor: colors.primary },
              ]}
            >
              <MaterialIcons name="camera-alt" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={[styles.uploadText, { color: colors.primary }]}>
            Upload Photo
          </Text>
        </View>

        {/* ================= BASIC INFO ================= */}
        <Section title="Basic Info" required colors={colors}>
          <Input
            label="Customer Name"
            required
            icon="person"
            placeholder="e.g. John Doe"
            colors={colors}
          />
          <Input
            label="Short Name"
            required
            icon="badge"
            placeholder="e.g. John"
            colors={colors}
          />
          <Input
            label="Phone Number"
            required
            icon="phone"
            placeholder="(555) 000-0000"
            keyboardType="phone-pad"
            colors={colors}
          />
        </Section>

        {/* ================= CONTACT DETAILS ================= */}
        <Section title="Contact Details" colors={colors}>
          <Input
            label="Email Address"
            icon="email"
            placeholder="john@example.com"
            keyboardType="email-address"
            colors={colors}
          />
        </Section>

        {/* ================= ADDRESS ================= */}
        <Section title="Address" required colors={colors}>
          <Input
            label="Street Address"
            required
            icon="home"
            placeholder="123 Laundry St."
            colors={colors}
          />

          <Input
            label="Apt, Suite, etc."
            optional
            icon="apartment"
            placeholder="Apt 4B"
            colors={colors}
          />

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label="City"
                required
                icon="location-city"
                placeholder="New York"
                colors={colors}
              />
            </View>
            <View style={styles.col}>
              <Input
                label="Zip Code"
                required
                icon="markunread-mailbox"
                placeholder="10001"
                keyboardType="number-pad"
                colors={colors}
              />
            </View>
          </View>
        </Section>

        {/* ================= NOTES ================= */}
        <Section title="Notes" colors={colors}>
          <View
            style={[
              styles.textAreaWrapper,
              {
                backgroundColor: colors.inputBg,
                borderColor: colors.border,
              },
            ]}
          >
            <MaterialIcons name="notes" size={20} color={colors.muted} />
            <TextInput
              multiline
              placeholderTextColor={colors.muted}
              style={[styles.textArea, { color: colors.text }]}
            />
          </View>
        </Section>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddCustomerScreen;

/* ================= COMPONENTS ================= */

const Section = ({ title, required, colors, children }: any) => (
  <View style={{ marginBottom: 28 }}>
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {title}
      </Text>

      {required && (
        <Text
          style={[
            styles.requiredBadge,
            {
              backgroundColor: colors.border,
              color: colors.subText,
            },
          ]}
        >
          Required *
        </Text>
      )}
    </View>
    {children}
  </View>
);

const Input = ({
  label,
  required,
  optional,
  icon,
  colors,
  ...props
}: any) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={[styles.label, { color: colors.subText }]}>
      {label}
      {optional && (
        <Text style={{ color: colors.muted }}> (Optional)</Text>
      )}
    </Text>

    <View
      style={[
        styles.inputWrapper,
        {
          backgroundColor: colors.inputBg,
          borderColor: colors.border,
        },
      ]}
    >
      <MaterialIcons name={icon} size={20} color={colors.muted} />
      <TextInput
        {...props}
        placeholderTextColor={colors.muted}
        style={[styles.input, { color: colors.text }]}
      />
    </View>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: { fontSize: 18, fontWeight: "700" },
  headerAction: { fontSize: 16 },
  headerSave: { fontSize: 16, fontWeight: "700" },

  content: { padding: 20, paddingBottom: 80 },

  avatarSection: { alignItems: "center", marginBottom: 32 },

  avatarWrapper: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: { width: 64, height: 64, borderRadius: 32 },

  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  uploadText: { marginTop: 10, fontSize: 14, fontWeight: "600" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitle: { fontSize: 16, fontWeight: "700" },

  requiredBadge: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: "600",
  },

  label: { fontSize: 13, marginBottom: 6, fontWeight: "600" },

  inputWrapper: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
  },

  textAreaWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },

  textArea: {
    flex: 1,
    minHeight: 120,
    fontSize: 15,
    textAlignVertical: "top",
  },

  row: { flexDirection: "row", gap: 12 },
  col: { flex: 1 },
});
