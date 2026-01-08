import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  useColorScheme,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerNavProp } from "../../data/types/DrawerParmList";
import { LightTheme, DarkTheme } from "../../theme/color";
import { ScreenName } from "../../data/enum/ScreenName";

/* ================= STATUS CONFIG ================= */

const STATUS_CONFIG: Record<
  string,
  { bg: string; text: string; icon: keyof typeof MaterialIcons.glyphMap }
> = {
  Pending: {
    bg: "#fff7ed",
    text: "#f97316",
    icon: "schedule",
  },
  Processing: {
    bg: "#eff6ff",
    text: "#2563eb",
    icon: "local-laundry-service",
  },
  Ready: {
    bg: "#ecfdf5",
    text: "#16a34a",
    icon: "check-circle",
  },
  Completed: {
    bg: "#f3f4f6",
    text: "#4b5563",
    icon: "done-all",
  },
};

const STATUS = ["Pending", "Processing", "Ready", "Completed"];

/* ================= SCREEN ================= */

const OrderListScreen = () => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? DarkTheme : LightTheme;
  const navigation = useNavigation<DrawerNavProp>();

  const [statusModal, setStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={26} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>Orders</Text>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="search" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* ================= SEARCH ================= */}
      {/* <View style={styles.searchWrap}>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: theme.inputBg, borderColor: theme.border },
          ]}
        >
          <Ionicons name="search" size={18} color={theme.subText} />
          <TextInput
            placeholder="Search by name or order #..."
            placeholderTextColor={theme.subText}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= SUMMARY ================= */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            
          <SummaryCard label="Pending" value="12" dot="#fb923c" theme={theme} />
          <SummaryCard label="In Progress" value="5" highlight theme={theme} />
          <SummaryCard label="Ready" value="8" dot="#22c55e" theme={theme} />
        </ScrollView>

        {/* ================= ORDERS ================= */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Today
          </Text>

          <OrderCard
            theme={theme}
            name="John Doe"
            order="#LND-402"
            price="$45.00"
            time="10:00 AM"
            details="5 shirts, 2 trousers • Dry Clean"
            status={selectedStatus}
            onStatusPress={() => setStatusModal(true)}
          />
              <OrderCard
            theme={theme}
            name="John Doe"
            order="#LND-402"
            price="$45.00"
            time="10:00 AM"
            details="5 shirts, 2 trousers • Dry Clean"
            status={selectedStatus}
            onStatusPress={() => setStatusModal(true)}
          />
              <OrderCard
            theme={theme}
            name="John Doe"
            order="#LND-402"
            price="$45.00"
            time="10:00 AM"
            details="5 shirts, 2 trousers • Dry Clean"
            status={selectedStatus}
            onStatusPress={() => setStatusModal(true)}
          />
              <OrderCard
            theme={theme}
            name="John Doe"
            order="#LND-402"
            price="$45.00"
            time="10:00 AM"
            details="5 shirts, 2 trousers • Dry Clean"
            status={selectedStatus}
            onStatusPress={() => setStatusModal(true)}
          />
              <OrderCard
            theme={theme}
            name="John Doe"
            order="#LND-402"
            price="$45.00"
            time="10:00 AM"
            details="5 shirts, 2 trousers • Dry Clean"
            status={selectedStatus}
            onStatusPress={() => setStatusModal(true)}
          />
              <OrderCard
            theme={theme}
            name="John Doe"
            order="#LND-402"
            price="$45.00"
            time="10:00 AM"
            details="5 shirts, 2 trousers • Dry Clean"
            status={selectedStatus}
            onStatusPress={() => setStatusModal(true)}
          />
              <OrderCard
            theme={theme}
            name="John Doe"
            order="#LND-402"
            price="$45.00"
            time="10:00 AM"
            details="5 shirts, 2 trousers • Dry Clean"
            status={selectedStatus}
            onStatusPress={() => setStatusModal(true)}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ================= FAB ================= */}
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate(ScreenName.AddEditOrder as never)
      }}
        style={[styles.fab, { backgroundColor: theme.primary }]}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.fabText}>New Order</Text>
      </TouchableOpacity>

      {/* ================= STATUS MODAL ================= */}
      {/* ================= STATUS MODAL (SIMPLE) ================= */}
      <Modal transparent visible={statusModal} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setStatusModal(false)}
        >
          <View
            style={[
              styles.modalBox,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.subText }]}>
              Update Status
            </Text>

            <View
              style={[styles.modalDivider, { backgroundColor: theme.border }]}
            />

            {STATUS.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.modalItemSimple,
                  {
                    borderColor:
                      item === selectedStatus ? theme.primary : "transparent",
                    backgroundColor:
                      item === selectedStatus ? theme.card : "transparent",
                  },
                ]}
                onPress={() => {
                  setSelectedStatus(item);
                  setStatusModal(false);
                }}
              >
                <Text style={[styles.modalItemText, { color: theme.text }]}>
                  {item}
                </Text>

                {item === selectedStatus && (
                  <Ionicons name="checkmark" size={18} color={theme.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default OrderListScreen;

/* ================= COMPONENTS ================= */

const OrderCard = ({
  theme,
  name,
  order,
  price,
  time,
  details,
  status,
  onStatusPress,
}: any) => {
  const cfg = STATUS_CONFIG[status];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.cardTop}>
        <View style={styles.cardLeft}>
          <View style={styles.avatar}>
            <MaterialIcons
              name="local-laundry-service"
              size={20}
              color={theme.primary}
            />
          </View>

          <View>
            <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
            <Text style={[styles.orderId, { color: theme.primary }]}>
              {order}
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={[styles.price, { color: theme.text }]}>{price}</Text>
          <Text style={[styles.time, { color: theme.subText }]}>{time}</Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.cardBottom}>
        <Text style={[styles.details, { color: theme.subText }]}>
          {details}
        </Text>

        <TouchableOpacity
          style={[
            styles.statusBtn,
            {
              backgroundColor: cfg.bg,
              borderColor: cfg.text,
            },
          ]}
          onPress={onStatusPress}
        >
          <MaterialIcons name={cfg.icon} size={16} color={cfg.text} />
          <Text style={[styles.statusText, { color: cfg.text }]}>{status}</Text>
          <MaterialIcons name="expand-more" size={18} color={cfg.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SummaryCard = ({ label, value, dot, highlight, theme }: any) => (
  <View
    style={[
      styles.summaryCard,
      {
        backgroundColor: highlight ? theme.primary : theme.card,
        borderColor: theme.border,
      },
    ]}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {dot && <View style={[styles.dot, { backgroundColor: dot }]} />}
      <Text
        style={[
          styles.summaryLabel,
          { color: highlight ? "#e0f2fe" : theme.subText },
        ]}
      >
        {label}
      </Text>
    </View>
    <Text
      style={[styles.summaryValue, { color: highlight ? "#fff" : theme.text }]}
    >
      {value}
    </Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1 },

  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 32, fontWeight: "700" },

  searchWrap: { padding: 16 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: { marginLeft: 8, flex: 1 },

  summaryCard: {
    width: 140,
    marginLeft: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  summaryLabel: { fontSize: 12, fontWeight: "600" },
  summaryValue: { fontSize: 22, fontWeight: "700", marginTop: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },

  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },

  card: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between" },
  cardLeft: { flexDirection: "row", gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#e0f2fe",
    justifyContent: "center",
    alignItems: "center",
  },
  name: { fontSize: 16, fontWeight: "600" },
  orderId: { fontSize: 12, fontWeight: "600", marginTop: 4 },
  price: { fontSize: 16, fontWeight: "700" },
  time: { fontSize: 12 },

  divider: { height: 1, marginVertical: 12 },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: { fontSize: 13, flex: 1, marginRight: 8 },

  statusBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: { fontSize: 12, fontWeight: "700" },

  fab: {
    position: "absolute",
    bottom: 24,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 6,
  },
  fabText: { color: "#fff", fontWeight: "700" },

 modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.45)", // darker dim
  justifyContent: "center",
  alignItems: "center",
},

  modalBox: {
  width: 260,
  borderRadius: 16,
  borderWidth: 1,
  padding: 16,
  elevation: 8, // Android
  shadowColor: "#000", // iOS
  shadowOpacity: 0.15,
  shadowRadius: 12,
},

  modalTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },

  modalItemText: {
    fontSize: 14,
    fontWeight: "600",
  },
  modalDivider: {
  height: 1,
  marginBottom: 10,
},

modalItemSimple: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 12,
  paddingHorizontal: 8,
  borderRadius: 10,
  borderWidth: 1,
  marginBottom: 4,
},

});
