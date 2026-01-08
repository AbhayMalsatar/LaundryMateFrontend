import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { LightTheme, DarkTheme } from "../../theme/color"; // adjust path
import { AuthContext } from "../../context/AuthContext";
import { ScreenName } from "../../data/enum/ScreenName";

export default function CustomDrawer({ navigation }: any) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? DarkTheme : LightTheme;
  const { logout } = useContext(AuthContext);

  const [openBusiness, setOpenBusiness] = useState(false);
  const [openCustomers, setOpenCustomers] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <DrawerContentScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <View style={[styles.logo, { backgroundColor: theme.primary }]}>
            <MaterialIcons
              name="local-laundry-service"
              size={22}
              color="#fff"
            />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            Laundry Mate
          </Text>
        </View>

        {/* USER */}
        <View style={[styles.user, { backgroundColor: theme.surface }]}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
          <Text style={[styles.username, { color: theme.text }]}>
            Alex Johnson
          </Text>
        </View>

        <DrawerItem
          icon="dashboard"
          label="Dashboard"
          theme={theme}
          onPress={() => navigation.navigate(ScreenName.Dashboard)}
        />

        <Section title="Operations" theme={theme} />
         <DrawerItem
          icon="people"
          label="Manage Customers"
          theme={theme}
          onPress={() => navigation.navigate(ScreenName.Customers)}
        />

        <Accordion
          title="Manage Business"
          icon="storefront"
          open={openBusiness}
          theme={theme}
          onPress={() => setOpenBusiness(!openBusiness)}
        >
          <SubItem label="Cloth Types" theme={theme}  onPress={() => navigation.navigate(ScreenName.ManageBusiness, {screen:ScreenName.ClothTypes})}/>
          <SubItem label="Services" theme={theme} onPress={() => navigation.navigate(ScreenName.ManageBusiness, {screen:ScreenName.Services})} />
          <SubItem label="Pricing" theme={theme} onPress={() => navigation.navigate(ScreenName.ManageBusiness, {screen:ScreenName.BasePrice})} />
        </Accordion>

         <DrawerItem
          icon="iron"
          label="Manage Orders"
          theme={theme}
          onPress={() => navigation.navigate(ScreenName.OrderList)}
        />


        <Accordion
          title="Reports"
          icon="bar-chart"
          open={openReports}
          theme={theme}
          onPress={() => setOpenReports(!openReports)}
        >
          <SubItem label="Daily Sales" theme={theme} />
          <SubItem label="Monthly Performance" theme={theme} />
          <SubItem label="Financials" theme={theme} />
        </Accordion>

        <Section title="Settings" theme={theme} />

        <DrawerItem
          icon="settings"
          label="App Settings"
          theme={theme}
          onPress={() => navigation.navigate("Settings")}
        />
      </DrawerContentScrollView>

      {/* LOGOUT FIXED AT BOTTOM */}
      <TouchableOpacity
        style={[
          styles.logout,
          { backgroundColor: scheme === "dark" ? "#3f1d1d" : "#fee2e2" },
        ]}
        onPress={logout}
      >
        <Text style={styles.logoutText}>Log Out</Text>
        <MaterialIcons name="logout" size={20} color="#dc2626" />
      </TouchableOpacity>
    </View>
  );
}

/* ------------------ COMPONENTS ------------------ */

const DrawerItem = ({ icon, label, onPress, theme }: any) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <MaterialIcons name={icon} size={22} color={theme.muted} />
    <Text style={[styles.itemText, { color: theme.text }]}>{label}</Text>
  </TouchableOpacity>
);

const Section = ({ title, theme }: any) => (
  <Text style={[styles.section, { color: theme.subText }]}>{title}</Text>
);

const Accordion = ({ title, icon, open, onPress, children, theme }: any) => (
  <View>
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <MaterialIcons name={icon} size={22} color={theme.muted} />
      <Text style={[styles.itemText, { color: theme.text }]}>{title}</Text>
      <MaterialIcons
        name={open ? "expand-less" : "expand-more"}
        size={22}
        color={theme.tabInactive}
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
    {open && <View style={styles.subMenu}>{children}</View>}
  </View>
);

const SubItem = ({ label, onPress, theme }: any) => (
  <TouchableOpacity style={styles.subItem} onPress={onPress}>
    <Text style={[styles.subText, { color: theme.subText }]}>{label}</Text>
  </TouchableOpacity>
);

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  root: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    marginBottom: 16,
  },

  logo: {
    height: 44,
    width: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  title: { fontSize: 18, fontWeight: "700" },

  user: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
  },

  avatar: { height: 42, width: 42, borderRadius: 21, marginRight: 12 },
  username: { fontWeight: "600", fontSize: 15 },

  section: {
    marginTop: 18,
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
  },

  itemText: { marginLeft: 14, fontSize: 15, fontWeight: "500" },

  subMenu: { paddingLeft: 48 },
  subItem: { paddingVertical: 8 },
  subText: { fontSize: 13 },

  logout: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
  },

  logoutText: { color: "#dc2626", fontWeight: "700" },
});
