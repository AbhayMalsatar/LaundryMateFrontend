import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, useColorScheme } from "react-native";
import CustomerBottomTabs from "../components/BottomTabs/CustomerBottomTabs";
import DashBoardBottomTabs from "../components/BottomTabs/DashboardBottomTabs";
import CustomeDrawer from "../components/Drawers/CustomDrawer";
import { ScreenName } from "../data/enum/ScreenName";
import { DarkTheme as darkColors, LightTheme as lightColors } from "../theme/color";
import ManageBusinessBottomTabs from "../components/BottomTabs/ManageBusinessBottomTabs";

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
      <Drawer.Screen name={ScreenName.Dashboard} component={DashBoardBottomTabs} />
      <Drawer.Screen name={ScreenName.Customers} component={CustomerBottomTabs} />
      <Drawer.Screen name={ScreenName.ManageBusiness} component={ManageBusinessBottomTabs} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawer: { flex: 1, padding: 24 },
  title: { fontSize: 20, fontWeight: "700" },
  item: { paddingVertical: 14, fontSize: 16 },
});
