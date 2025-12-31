import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TextInput,
  TouchableOpacity,
  PanResponder,
  Image,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LightTheme as lightColors } from "../../theme/color";
import { DarkTheme as darkColors } from "../../theme/color";
import { DrawerActions, useNavigation } from "@react-navigation/native";

type Customer = {
  id: string;
  name: string;
  phone: string;
  status?: "Ready" | "Overdue";
  subtitle: string;
  initials?: string;
  avatar?: string;
};

const RECENT: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "+1 555-0123",
    status: "Ready",
    subtitle: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTjLC3cv6jLmihwYkDW00Vo4Y4tLBOWNCXpF28Pzi51NcEEkZ1s1dpL4P54kzshJXSkvfcoabfqZQVBGie6Ltdxch8DH5MeJsrFw5xZhlGy4iGpmswhuHUlvpcyNYZ1gLCOhLzjc1vZlGklWNBZTGFLZcKRtMaKGXDMLb_Hqzil7DHs4MK3emjHmcrNXrJohVhY3VRYWZ2Xz0LOp3lpdXRtpW1cuCFBQTcxdYPqLuVxtX-DTXEWcC9T93DF3dRVAdOEXF_w7tqZEeH",
  },
  {
    id: "2",
    name: "Alice Smith",
    phone: "+1 555-0199",
    subtitle: "Last Visit: 2 days ago",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6KXSb8rz1QJnnm9flQY2PRkvjcrJjpp0xU1zsX2653Ib8Ns0uGjyDFKboGRKtVUhtQFKJXeuZ2l5VjAsfVHPvvbHl47pz-R64hV4pKYDn6qRp8eB9sHlqp_i2N_Q42rbGDIyXXDddLEbCHk5mhqNSAZGdxvYNeIWXdUxMN8q3ikRWmdFW4Rx6ettkGtfFA2hYui6hnRcW7xGPECBelRjcITk1Cbu3NmjHILwcRm0Lnpn4rW7Y5ZypjKeUJt_bmTzzFrpyXvyMAXqg",
  },
  {
    id: "3",
    name: "Robert Jones",
    phone: "+1 555-0922",
    subtitle: "Outstanding Balance",
    status: "Overdue",
    initials: "RJ",
  },
];

const AZ: Customer[] = [
  {
    id: "4",
    name: "Amanda S. Stiles",
    phone: "+1 555-9821",
    subtitle: "New Customer",
    initials: "AS",
  },
  {
    id: "5",
    name: "Brian O'Conner",
    phone: "+1 555-1122",
    subtitle: "Inactive",
  },
  {
    id: "6",
    name: "Catherine Zeta-W.",
    phone: "+1 555-8888",
    subtitle: "VIP",
    initials: "CW",
  },
];

const ALPHABETS = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

/* Generate MANY customers */
const generateCustomers = (): Customer[] => {
  const names = [
    "Amit Shah",
    "Brian Cox",
    "Charlie Puth",
    "David Warner",
    "Emily Rose",
    "Farah Khan",
    "George Smith",
    "Harry Styles",
    "Ishaan Patel",
    "John Cena",
    "Kevin Hart",
    "Leo Messi",
    "Max Dio",
    "Nora Fatehi",
    "Olivia Pope",
    "Peter Parker",
    "Quincy Adams",
    "Robert Downey",
    "Steve Rogers",
    "Tony Stark",
    "Uma Thurman",
    "Victor Hugo",
    "Will Smith",
    "Xavier Woods",
    "Yash Raj",
    "Zayn Malik",
  ];

  return Array.from({ length: 120 }).map((_, i) => {
    const name = names[i % names.length];
    return {
      id: String(i),
      name,
      phone: "+1 555-" + (1000 + i),
      subtitle: "Active",
      initials: getInitials(name),
    };
  });
};
const buildSections = (customers: Customer[]) => {
  const map: Record<string, Customer[]> = {};

  customers.forEach((c) => {
    const key = c.name[0].toUpperCase();
    if (!map[key]) map[key] = [];
    map[key].push(c);
  });

  return Object.keys(map)
    .sort()
    .map((letter) => ({
      title: letter,
      data: map[letter],
    }));
};

export default function CustomerListScreen() {
  const scheme = useColorScheme();
  const [listTop, setListTop] = useState(0);
  const isDark = scheme === "dark";
  const styles = getStyles(isDark, listTop);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const sectionListRef = React.useRef<SectionList<Customer>>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const customers = useMemo(() => generateCustomers(), []);
  const sections = useMemo(() => buildSections(customers), [customers]);

  /* Scroll logic */
  const sectionIndexMap = useMemo(() => {
    const map: Record<string, number> = {};
    sections.forEach((section, index) => {
      map[section.title] = index;
    });
    return map;
  }, [sections]);

  const scrollToLetter = (letter: string) => {
    try {
      const index = sectionIndexMap[letter];
      if (index && index !== -1) {
        sectionListRef.current?.scrollToLocation({
          sectionIndex: index,
          itemIndex: 1,
          animated: true,
        });
      }
    } catch (err) {
      // console.error(err);
    }
  };

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    sectionListRef.current?.scrollToLocation({
      sectionIndex: Math.max(0, info.highestMeasuredFrameIndex),
      itemIndex: 0,
      animated: true,
    });

    setTimeout(() => {
      sectionListRef.current?.scrollToLocation({
        sectionIndex: Math.max(0, info.highestMeasuredFrameIndex),
        itemIndex: 0,
        animated: true,
      });
    }, 50);
  };

  /* Touch drag logic */
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      const itemHeight = 14;
      const relativeY = gesture.moveY - listTop;
      const index = Math.floor(relativeY / itemHeight);

      if (index < 0 || index >= ALPHABETS.length) return;

      const letter = ALPHABETS[index];

      // ✅ Prevent crash for missing sections
      if (sectionIndexMap[letter] === undefined) return;

      setActiveLetter(letter);
      scrollToLetter(letter);
    },
    onPanResponderRelease: () => setActiveLetter(null),
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <MaterialIcons name="menu" size={24} color={styles.icon.color} />
          </TouchableOpacity>
        
          <Text style={styles.title}>Customers</Text>
        </View>


        {/* SEARCH */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <MaterialIcons name="search" size={22} color={styles.muted.color} />
            <TextInput
              placeholder="Search name, ID, or phone..."
              placeholderTextColor={styles.placeholder.color}
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.filterBtn}>
            <MaterialIcons name="tune" size={22} color={styles.muted.color} />
          </TouchableOpacity>
        </View>
      </View>

      <SectionList
        ref={sectionListRef}
        onLayout={(e) => setListTop(e.nativeEvent.layout.y)}
        sections={sections}
        onScrollToIndexFailed={onScrollToIndexFailed}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <CustomerRow customer={item} isDark={isDark} />
        )}
      />

      {/* A–Z RAIL */}
      <View style={styles.azRail} {...panResponder.panHandlers}>
        {ALPHABETS.map((l) => (
          <View
            key={l}
            style={[styles.azItem, activeLetter === l && styles.azItemActive]}
          >
            <Text style={styles.azText}>{l}</Text>
          </View>
        ))}
      </View>

      {/* POPUP BUBBLE */}
      {activeLetter && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>{activeLetter}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function CustomerRow({
  customer,
  isDark,
}: {
  customer: Customer;
  isDark: boolean;
}) {
  return (
    <TouchableOpacity
      style={[
        stylesRow.row,
        { backgroundColor: isDark ? "#101922" : "#ffffff" },
      ]}
    >
      {/* Avatar */}
      {customer.avatar ? (
        <Image source={{ uri: customer.avatar }} style={stylesRow.avatar} />
      ) : (
        <View style={stylesRow.initials}>
          <Text style={stylesRow.initialsText}>{customer.initials}</Text>
        </View>
      )}

      {/* Info */}
      <View style={{ flex: 1 }}>
        <View style={stylesRow.nameRow}>
          <Text
            style={[
              stylesRow.name,
              { color: isDark ? darkColors.text : lightColors.text },
            ]}
          >
            {customer.name}
          </Text>
          {customer.status && (
            <View
              style={[
                stylesRow.badge,
                customer.status === "Ready"
                  ? stylesRow.ready
                  : stylesRow.overdue,
              ]}
            >
              <Text style={stylesRow.badgeText}>{customer.status}</Text>
            </View>
          )}
        </View>
        <Text style={stylesRow.sub}>
          {customer.phone} • {customer.subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

/* ---------------- STYLES ---------------- */

const getStyles = (dark: boolean, atozTop: number) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: dark ? "#101922" : "#f6f7f8" },
    header: { paddingHorizontal: 16, paddingTop: 16 },
    headerRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    title: {
      fontSize: 25,
      paddingBottom: 3,
      fontWeight: "700",
      marginVertical: 8,
      color: dark ? "#fff" : "#0f172a",
    },
    iconBtn: { padding: 8 },
    addBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#137fec",
      justifyContent: "center",
      alignItems: "center",
    },
    searchRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
    searchBox: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: dark ? "#1e293b" : "#fff",
      borderRadius: 16,
      paddingHorizontal: 12,
    },
    input: { flex: 1, padding: 10, color: dark ? "#fff" : "#000" },
    filterBtn: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: dark ? "#1e293b" : "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    bottomNav: {
      height: 72,
      flexDirection: "row",
      borderTopWidth: 1,
      borderColor: "#e2e8f0",
      backgroundColor: dark ? "#020617" : "#fff",
      paddingTop: 8,
    },
    icon: { color: dark ? "#94a3b8" : "#64748b" },
    muted: { color: dark ? "#94a3b8" : "#64748b" },
    placeholder: { color: dark ? "#64748b" : "#94a3b8" },
    sectionHeader: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      backgroundColor: dark ? "#020617" : "#e2e8f0",
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: "700",
      color: dark ? "#94a3b8" : "#475569",
    },
    azRail: {
      position: "absolute",
      right: 6,
      top: atozTop + 50, // ✅ starts with list
      bottom: 40,
      justifyContent: "center",
      backgroundColor: dark ? "#020617" : "#f1f5f9",
      borderRadius: 16,
      paddingHorizontal: 4,
    },
    azItem: {
      top: 6, // ✅ starts with listTop
      paddingVertical: 2,
      alignItems: "center",
    },
    azItemActive: {
      backgroundColor: "#137fec",
      borderRadius: 10,
    },
    azText: {
      fontSize: 10,
      fontWeight: "600",
      color: "#64748b",
    },
    popup: {
      position: "absolute",
      right: 60,
      top: "40%",
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: "#137fec",
      justifyContent: "center",
      alignItems: "center",
    },
    popupText: {
      fontSize: 28,
      fontWeight: "700",
      color: "#fff",
    },
  });

const stylesRow = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", padding: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  initials: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fde68a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  initialsText: { fontWeight: "700", color: "#92400e" },
  nameRow: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontSize: 16, fontWeight: "600" },
  sub: { fontSize: 13, color: "#64748b" },
  badge: { paddingHorizontal: 8, borderRadius: 12 },
  ready: { backgroundColor: "#dcfce7" },
  overdue: { backgroundColor: "#fee2e2" },
  badgeText: { fontSize: 11, fontWeight: "600" },
  actionBtn: { marginLeft: 8 },
});
