import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LightTheme, DarkTheme } from "../../theme/color";
import CommonDropdown from "../../components/common/CommonDropdown";

const customers = [
  { label: "John Doe - (555) 012-3456", value: "1" },
  { label: "Alice Smith - (555) 987-6543", value: "2" },
  { label: "Robert Johnson - (555) 456-7890", value: "3" },
  { label: "Emily Davis - (555) 123-4567", value: "4" },
  { label: "Michael Wilson - (555) 234-5678", value: "5" },
];

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

export default function AddEditOrderScreen() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  const [customer, setCustomer] = useState<string | null>(null);
  const [dateVisible, setDateVisible] = useState(false);
  const [timeVisible, setTimeVisible] = useState(false);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      {/* ================= HEADER ================= */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="close" size={24} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>
          New Order
        </Text>

        <TouchableOpacity>
          <Text style={[styles.help, { color: theme.primary }]}>Help</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* ================= CUSTOMER ================= */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Customer Details
        </Text>

        <View style={styles.section}>
           <Text style={[styles.label, { color: theme.subText }]}>
            Select Customer
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <CommonDropdown
              labelField={"label"}
              style={{flexDirection: "row"}}
              valueField={"value"}
              label="Select Customer"
              placeholder="Choose existing customer..."
              data={customers}
              value={customer}
              onChange={(item) => setCustomer(item.value)}
              theme={theme}
              leftIcon="person-outline"
              searchPlaceholder="Search customer..."
            />
            <TouchableOpacity
              style={[
                styles.addCustomerBtn,
                { backgroundColor: theme.primary + "15" },
              ]}
            >
              <MaterialIcons
                name="person-add"
                size={22}
                color={theme.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= PICKUP ================= */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Pickup Schedule
        </Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.inputBox,
              { backgroundColor: theme.inputBg, borderColor: theme.border },
            ]}
            onPress={() => setDateVisible(true)}
          >
            <Text style={{ color: pickupDate ? theme.text : theme.subText }}>
              {pickupDate ? pickupDate.toDateString() : "Select Pickup Date"}
            </Text>
            <MaterialIcons
              name="calendar-today"
              size={18}
              color={theme.subText}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.inputBox,
              { backgroundColor: theme.inputBg, borderColor: theme.border },
            ]}
            onPress={() => setTimeVisible(true)}
          >
            <Text style={{ color: pickupTime ? theme.text : theme.subText }}>
              {pickupTime
                ? pickupTime.toLocaleTimeString()
                : "Select Pickup Time"}
            </Text>
            <MaterialIcons name="schedule" size={18} color={theme.subText} />
          </TouchableOpacity>
        </View>

        {/* ================= DIVIDER ================= */}
        <View style={[styles.dividerBig, { backgroundColor: theme.border }]} />

        {/* ================= ORDER ITEMS ================= */}
        <View style={styles.orderHeader}>
          <Text style={[styles.sectionTitleSmall, { color: theme.text }]}>
            Order Items
          </Text>
          <Text style={{ color: theme.subText }}>2 Items</Text>
        </View>

        <OrderItemCard theme={theme} />
        <OrderItemCard theme={theme} />

        <TouchableOpacity
          style={[styles.addItem, { borderColor: theme.border }]}
        >
          <MaterialIcons
            name="add-circle-outline"
            size={22}
            color={theme.primary}
          />
          <Text style={{ color: theme.primary, fontWeight: "700" }}>
            Add Another Item
          </Text>
        </TouchableOpacity>

        {/* ================= NOTES ================= */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Notes</Text>

        <TextInput
          multiline
          numberOfLines={3}
          placeholder="Special instructions (e.g. heavy starch, stain on collar)..."
          placeholderTextColor={theme.subText}
          style={[
            styles.textArea,
            {
              backgroundColor: theme.inputBg,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
        />

        {/* ================= TOTAL ================= */}
        <View
          style={[
            styles.totalCard,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Row label="Subtotal (3 items)" value="$22.00" theme={theme} />
          <Row label="Tax (5%)" value="$1.10" theme={theme} />

          <View style={[styles.line, { backgroundColor: theme.border }]} />

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>
              Total Amount
            </Text>
            <Text style={[styles.totalValue, { color: theme.primary }]}>
              $23.10
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ================= FOOTER ================= */}
      <View
        style={[
          styles.footer,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: theme.primary }]}
        >
          <Text style={styles.saveText}>Save Order</Text>
          <MaterialIcons name="check" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ================= PICKERS ================= */}
      <DateTimePickerModal
        isVisible={dateVisible}
        mode="date"
        onConfirm={(d) => {
          setPickupDate(d);
          setDateVisible(false);
        }}
        onCancel={() => setDateVisible(false)}
      />

      <DateTimePickerModal
        isVisible={timeVisible}
        mode="time"
        onConfirm={(t) => {
          setPickupTime(t);
          setTimeVisible(false);
        }}
        onCancel={() => setTimeVisible(false)}
      />
    </SafeAreaView>
  );
}

/* ================= ORDER ITEM ================= */

const OrderItemCard = ({ theme }: any) => (
  <View
    style={[
      styles.itemCard,
      { backgroundColor: theme.card, borderColor: theme.border },
    ]}
  >
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
        style={[styles.smallDropdown]}
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
        style={[styles.smallDropdown]}
      />

    <View style={[styles.line, { backgroundColor: theme.border }]} />

    <View style={styles.qtyRow}>
      <View style={styles.qtyBox}>
        <TouchableOpacity style={styles.qtyBtn}>
          <Ionicons name="remove" size={14} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "700", color: theme.text }}>2</Text>
        <TouchableOpacity
          style={[styles.qtyBtn, { backgroundColor: theme.primary }]}
        >
          <Ionicons name="add" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ fontSize: 12, color: theme.subText }}>$5.00/ea</Text>
        <Text style={{ fontSize: 18, fontWeight: "700", color: theme.text }}>
          $10.00
        </Text>
      </View>
    </View>
  </View>
);

/* ================= HELPERS ================= */

const Row = ({ label, value, theme }: any) => (
  <View style={styles.rowBetween}>
    <Text style={{ color: theme.subText }}>{label}</Text>
    <Text style={{ color: theme.text, fontWeight: "600" }}>{value}</Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1 },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  iconBtn: { width: 40 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  help: { fontWeight: "700" },

  section: { paddingHorizontal: 16, marginBottom: 12 },
  sectionTitle: { fontSize: 20, fontWeight: "700", padding: 16 },
  sectionTitleSmall: { fontSize: 20, fontWeight: "700" },

  label: { fontSize: 12, fontWeight: "600", marginBottom: 6 },

  addCustomerBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  row: { flexDirection: "row", gap: 12, paddingHorizontal: 16 },
  inputBox: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dividerBig: {
    height: 1,
    margin: 16,
    borderRadius: 2,
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  itemCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },

  line: { height: 1, marginVertical: 12 },

  qtyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
  },

  addItem: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  textArea: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    textAlignVertical: "top",
  },

  totalCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: { fontSize: 18, fontWeight: "700" },
  totalValue: { fontSize: 22, fontWeight: "700" },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    padding: 16,
  },

  saveBtn: {
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  dropdown: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  smallDropdown: {
    flex: 1,
    height: 42,
    marginVertical: 4,
    borderRadius: 12,
    // paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

  dropdownContainer: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },

  searchInput: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    margin: 10,
    fontSize: 14,
  },

  itemContainer: {
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 4,
    paddingVertical: 12,
  },
});
