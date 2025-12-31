import { createDrawerNavigator } from "@react-navigation/drawer";
import { useColorScheme, View, Text, StyleSheet } from "react-native";
import { LightTheme as lightColors } from "../theme/color";
import { DarkTheme as darkColors } from "../theme/color"; 
import CustomeDrawer from "../components/Drawers/CustomDrawer";
import CustomerBottomTabs from "../components/bottomTabs/CustomerBottomTabs";
import DashBoardBottomTabs from "../components/bottomTabs/DashboardBottomTabs";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? darkColors : lightColors;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.surface,
          width: 280,
        },
        drawerLabelStyle: { color: colors.text },
      }}
      drawerContent={CustomeDrawer}
    >
      <Drawer.Screen name="Dashboard" component={DashBoardBottomTabs} />
      <Drawer.Screen name="Customers" component={CustomerBottomTabs} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawer: { flex: 1, padding: 24 },
  title: { fontSize: 20, fontWeight: "700" },
  item: { paddingVertical: 14, fontSize: 16 },
});
