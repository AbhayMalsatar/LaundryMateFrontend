import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { LightTheme as lightColors } from "../../theme/color";
import { DarkTheme as darkColors } from "../../theme/color";

import DashboardScreen from "../../screens/DashboardScreen";
import OrdersScreen from "../../screens/OrderScreen";
import ProfileScreen from "../../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function DashBoardBottomTabs() {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? darkColors : lightColors;

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 72,
            backgroundColor: colors.surface,
            borderTopWidth: 0,
            elevation: 10,
          },
          tabBarLabelStyle: { fontSize: 11, marginBottom: 6 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="home"
                size={26}
                color={focused ? colors.primary : colors.tabInactive}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="list-alt"
                size={26}
                color={focused ? colors.primary : colors.tabInactive}
              />
            ),
          }}
        />

        {/* EMPTY SLOT */}
        <Tab.Screen
          name="Spacer"
          component={DashboardScreen}
          options={{
            tabBarButton: () => <View style={{ width: 70 }} />,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="person"
                size={26}
                color={focused ? colors.primary : colors.tabInactive}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="settings"
                size={26}
                color={focused ? colors.primary : colors.tabInactive}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <View style={styles.fabContainer}>
        <TouchableOpacity style={[styles.fab, {backgroundColor: scheme == "dark" ? colors.primary : styles.fab.backgroundColor}]}>
          <MaterialIcons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});
