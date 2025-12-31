import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { LightTheme as lightColors } from "../theme/color";
import { DarkTheme as darkColors } from "../theme/color";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? darkColors : lightColors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* HEADER */}
      <SafeAreaView edges={["top"]} style={{ backgroundColor: colors.surface }}>
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <MaterialIcons name="menu" size={28} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Dashboard</Text>
          <MaterialIcons name="notifications" size={26} color={colors.text} />
        </View>
      </SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* STATS */}
        <View style={styles.row}>
          <StatCard title="Active Orders" value="24" colors={colors} />
          <StatCard title="Today's Revenue" value="$840" colors={colors} />
        </View>

        {/* QUICK ACTIONS */}
        <Text style={[styles.section, { color: colors.text }]}>
          Quick Actions
        </Text>
        <View style={styles.row}>
          <Action icon="add" label="New Order" colors={colors} />
          <Action icon="qr-code-scanner" label="Scan QR" colors={colors} />
          <Action icon="person-add" label="Customer" colors={colors} />
          <Action icon="schedule" label="Schedule" colors={colors} />
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({ title, value, colors }: any) {
  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={{ fontSize: 22, fontWeight: "700", color: colors.text }}>
        {value}
      </Text>
      <Text style={{ color: colors.muted }}>{title}</Text>
    </View>
  );
}

function Action({ icon, label, colors }: any) {
  return (
   <View style={styles.actionItem}>
      <View style={styles.actionBtn}>
        <MaterialIcons name={icon} size={24} color="#fff" />
      </View>
      <Text style={[styles.actionLabel, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "700" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  card: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
  },
  section: { marginTop: 20, fontWeight: "600", marginBottom: 12, fontSize: 16 },
 actionItem: {
  width: "25%",
  alignItems: "center",
  marginBottom: 20,
},
actionBtn: {
  width: 56,
  height: 56,
  borderRadius: 18,
  backgroundColor: "#137fec",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 8,
},
actionLabel: {
  fontSize: 12,
  textAlign: "center",
},

});
