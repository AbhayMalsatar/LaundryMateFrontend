import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions, useNavigation } from "@react-navigation/native";

/* ================== DATA TYPES & DUMMY DATA ================== */

type Customer = {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  avatar?: string;
  initials?: string;
};

const FILTERS = ["All", "Commercial", "Residential", "VIP"];

const CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    type: "Weekly",
    address: "123 Maple Ave, Apt 4B",
    phone: "+1 (555) 019-2834",
    initials: "SH",
  },
  {
    id: "2",
    name: "Grand Hotel",
    type: "Commercial",
    address: "400 Skyline Blvd",
    phone: "+1 (555) 999-8888",
    initials: "GH",
  },
  {
    id: "3",
    name: "Mike Ross",
    type: "Drop-off",
    address: "88 West St, Suite 200",
    phone: "+1 (555) 123-4567",
    initials: "MR",
  },
  {
    id: "4",
    name: "Alice Chen",
    type: "VIP",
    address: "221B Baker Street",
    phone: "+1 (555) 222-3333",
    initials: "AC",
  },
  {
    id: "1",
    name: "Sarah Jenkins",
    type: "Weekly",
    address: "123 Maple Ave, Apt 4B",
    phone: "+1 (555) 019-2834",
    initials: "SH",
  },
  {
    id: "2",
    name: "Grand Hotel",
    type: "Commercial",
    address: "400 Skyline Blvd",
    phone: "+1 (555) 999-8888",
    initials: "GH",
  },
  {
    id: "3",
    name: "Mike Ross",
    type: "Drop-off",
    address: "88 West St, Suite 200",
    phone: "+1 (555) 123-4567",
    initials: "MR",
  },
  {
    id: "4",
    name: "Alice Chen",
    type: "VIP",
    address: "221B Baker Street",
    phone: "+1 (555) 222-3333",
    initials: "AC",
  },
  {
    id: "1",
    name: "Sarah Jenkins",
    type: "Weekly",
    address: "123 Maple Ave, Apt 4B",
    phone: "+1 (555) 019-2834",
    initials: "SH",
  },
  {
    id: "2",
    name: "Grand Hotel",
    type: "Commercial",
    address: "400 Skyline Blvd",
    phone: "+1 (555) 999-8888",
    initials: "GH",
  },
  {
    id: "3",
    name: "Mike Ross",
    type: "Drop-off",
    address: "88 West St, Suite 200",
    phone: "+1 (555) 123-4567",
    initials: "MR",
  },
  {
    id: "4",
    name: "Alice Chen",
    type: "VIP",
    address: "221B Baker Street",
    phone: "+1 (555) 222-3333",
    initials: "AC",
  },
  {
    id: "1",
    name: "Sarah Jenkins",
    type: "Weekly",
    address: "123 Maple Ave, Apt 4B",
    phone: "+1 (555) 019-2834",
    initials: "SH",
  },
  {
    id: "2",
    name: "Grand Hotel",
    type: "Commercial",
    address: "400 Skyline Blvd",
    phone: "+1 (555) 999-8888",
    initials: "GH",
  },
  {
    id: "3",
    name: "Mike Ross",
    type: "Drop-off",
    address: "88 West St, Suite 200",
    phone: "+1 (555) 123-4567",
    initials: "MR",
  },
  {
    id: "4",
    name: "Alice Chen",
    type: "VIP",
    address: "221B Baker Street",
    phone: "+1 (555) 222-3333",
    initials: "AC",
  },
  {
    id: "1",
    name: "Sarah Jenkins",
    type: "Weekly",
    address: "123 Maple Ave, Apt 4B",
    phone: "+1 (555) 019-2834",
    initials: "SH",
  },
  {
    id: "2",
    name: "Grand Hotel",
    type: "Commercial",
    address: "400 Skyline Blvd",
    phone: "+1 (555) 999-8888",
    initials: "GH",
  },
  {
    id: "3",
    name: "Mike Ross",
    type: "Drop-off",
    address: "88 West St, Suite 200",
    phone: "+1 (555) 123-4567",
    initials: "MR",
  },
  {
    id: "4",
    name: "Alice Chen",
    type: "VIP",
    address: "221B Baker Street",
    phone: "+1 (555) 222-3333",
    initials: "AC",
  },
  {
    id: "1",
    name: "Sarah Jenkins",
    type: "Weekly",
    address: "123 Maple Ave, Apt 4B",
    phone: "+1 (555) 019-2834",
    initials: "SH",
  },
  {
    id: "2",
    name: "Grand Hotel",
    type: "Commercial",
    address: "400 Skyline Blvd",
    phone: "+1 (555) 999-8888",
    initials: "GH",
  },
  {
    id: "3",
    name: "Mike Ross",
    type: "Drop-off",
    address: "88 West St, Suite 200",
    phone: "+1 (555) 123-4567",
    initials: "MR",
  },
  {
    id: "4",
    name: "Alice Chen",
    type: "VIP",
    address: "221B Baker Street",
    phone: "+1 (555) 222-3333",
    initials: "AC",
  },
];

export default function RecentCustomers() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const styles = createStyles(isDark);
    const navigation = useNavigation();

  const renderCustomer = ({ item }: { item: Customer }) => {
    return (
      <View style={styles.card}>
        <View style={styles.left}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.initials}>
              <Text style={styles.initialsText}>{item.initials}</Text>
            </View>
          )}

          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.type}</Text>
              </View>
            </View>
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.callBtn}>
          <Ionicons name="call" size={18} color="#137fec" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.iconBtn}>
          <Ionicons name="menu" size={22} color={styles.icon.color} />
        </TouchableOpacity>

        <Text style={styles.title}>Recent Customers</Text>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="search" size={22} color={styles.icon.color} />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <FlatList
        data={FILTERS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <View
            style={[styles.filterChip, index === 0 && styles.filterChipActive]}
          >
            <Text
              style={[
                styles.filterText,
                index === 0 && styles.filterTextActive,
              ]}
            >
              {item}
            </Text>
          </View>
        )}
      />

      {/* Customer List */}
      <FlatList
        data={CUSTOMERS}
        keyExtractor={(item) => item.id}
        renderItem={renderCustomer}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* ================== STYLES ================== */

const createStyles = (dark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: dark ? "#101922" : "#f6f7f8",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
    },
    title: {
      flex: 1,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "700",
      color: dark ? "#fff" : "#0f172a",
    },
    iconBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      color: dark ? "#fff" : "#0f172a",
    },
    filters: {
      paddingHorizontal: 16,
      paddingBottom: 15,
      gap: 12,
    },
    filterChip: {
      height: 36,
      paddingHorizontal: 18,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: dark ? "#334155" : "#e2e8f0",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: dark ? "#1e293b" : "#fff",
    },
    filterChipActive: {
      backgroundColor: "#137fec",
      borderColor: "#137fec",
    },
    filterText: {
      fontSize: 14,
      color: dark ? "#cbd5f5" : "#475569",
      fontWeight: "500",
    },
    filterTextActive: {
      color: "#fff",
    },
    list: {
      padding: 16,
      paddingBottom: 100,
      gap: 12,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderRadius: 16,
      backgroundColor: dark ? "#1e293b" : "#fff",
      borderWidth: 1,
      borderColor: dark ? "#334155" : "#f1f5f9",
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      gap: 12,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
    },
    initials: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: dark ? "#312e81" : "#e0e7ff",
      alignItems: "center",
      justifyContent: "center",
    },
    initialsText: {
      fontSize: 18,
      fontWeight: "700",
      color: dark ? "#c7d2fe" : "#4338ca",
    },
    info: {
      flex: 1,
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    name: {
      fontSize: 16,
      fontWeight: "700",
      color: dark ? "#fff" : "#0f172a",
    },
    badge: {
      backgroundColor: dark ? "#334155" : "#eff6ff",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
    },
    badgeText: {
      fontSize: 11,
      fontWeight: "600",
      color: dark ? "#93c5fd" : "#2563eb",
    },
    address: {
      fontSize: 13,
      color: dark ? "#94a3b8" : "#64748b",
    },
    phone: {
      fontSize: 12,
      marginTop: 4,
      color: dark ? "#64748b" : "#94a3b8",
    },
    callBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#137fec20",
      alignItems: "center",
      justifyContent: "center",
    },
    fab: {
      position: "absolute",
      right: 20,
      bottom: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "#137fec",
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
    },
  });
