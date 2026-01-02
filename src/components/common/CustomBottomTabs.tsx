import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, { ComponentType, ReactNode } from "react";
import { LightTheme, DarkTheme } from "../../theme/color";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialIconsIconName } from "@react-native-vector-icons/material-icons";

const Tab = createBottomTabNavigator();

type tabListItem = {
    name:string;
    screen:ComponentType<any>;
    iconName:MaterialIconsIconName;
    options:ReactNode
}
type Props = {
    tabList:tabListItem[];
    fabButtonOnPress:VoidFunction,
    isFabButtonShow:boolean
}

export default function CustomBottomTabs({ tabList = [], fabButtonOnPress=()=>{} , isFabButtonShow = false}:Props) {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? DarkTheme : LightTheme;

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
        {tabList?.map((val) => (
          <Tab.Screen
            name={val?.name}
            component={val?.screen}
            options={{
              tabBarIcon: val?.options ? ({ focused }) => (val?.options): ({ focused }) => (
                <MaterialIcons
                  name={val?.iconName}
                  size={26}
                  color={focused ? colors.primary : colors.tabInactive}
                />
              ),
            }}
          />
        ))}
       
      </Tab.Navigator>
      {isFabButtonShow &&
      <View style={styles.fabContainer}>
        <TouchableOpacity
          onPress={fabButtonOnPress}
          style={[
            styles.fab,
            {
              backgroundColor:
                scheme == "dark" ? colors.primary : styles.fab.backgroundColor,
            },
          ]}
        >
          <MaterialIcons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>}
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
