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
import RecentCustomersScreen from "../../screens/Customers/RecentCustomerScreen";
import CustomerListScreen from "../../screens/Customers/CustomerListScreen";
import AddCustomerScreen from "../../screens/Customers/AddCustomerScreen";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

const Tab = createBottomTabNavigator();

export type TabParamList = {
  Recent: undefined;
  AddCustomer: undefined;
  CustomerList: undefined;
};

type DrawerParamList = {
  Customers: NavigatorScreenParams<TabParamList>;
  Settings: undefined;
};

type DrawerNavProp = DrawerNavigationProp<DrawerParamList>;

export default function CustomerBottomTabs() {
  const navigate = useNavigation<DrawerNavProp>();
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
          name="Recent"
          component={RecentCustomersScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="history"
                size={26}
                color={focused ? colors.primary : colors.tabInactive}
              />
            ),
          }}
        />

      
        {/* EMPTY SLOT */}
        <Tab.Screen
          name="AddCustomer"
          component={AddCustomerScreen}
          options={{
            tabBarButton: () => <View style={{ width: 70 }} />,
          }}
        />

   

        <Tab.Screen
          name="CustomerList"
          component={CustomerListScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="contacts"
                size={26}
                color={focused ? colors.primary : colors.tabInactive}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <View style={styles.fabContainer}>
        <TouchableOpacity onPress={() => {navigate.navigate("Customers", {"screen":"AddCustomer"})}} style={[styles.fab, {backgroundColor: scheme == "dark" ? colors.primary : styles.fab.backgroundColor}]}>
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
