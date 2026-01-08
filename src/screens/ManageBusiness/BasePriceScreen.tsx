import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LightTheme, DarkTheme } from "../..//theme/color";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AddEditClothTypes from "../../components/Modals/AddEditClothTypes";
import AddEditService from "../../components/Modals/AddEditService";
import { ScreenName } from "../../data/enum/ScreenName";
import { DrawerNavProp } from "../../data/types/DrawerParmList";

type Item = {
  id: string;
  name: string;
  service: string;
  price: string;
  archived:boolean,
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

const DATA: Item[] = [
  {
    id: "1",
    name: "Men's Shirt",
    service: "Wash & Iron",
    price: "₹5.00",
    archived: false,
    icon: "pricetags",
    color: "#137fec",
  },
  {
    id: "2",
    name: "Silk Dress",
    service: "Dry Clean",
    price: "₹15.00",
    archived: false,
    icon: "pricetags",
    color: "#9333ea",
  },
  {
    id: "3",
    name: "T-Shirt",
    service: "Wash & Fold",
    price: "₹2.50",
    archived: false,
    icon: "pricetags",
    color: "#137fec",
  },
  {
    id: "4",
    name: "Duvet Cover",
    service: "Ironing",
    price: "₹8.00",
    archived: false,
    icon: "pricetags",
    color: "#ea580c",
  },
  {
    id: "5",
    name: "Business Suit",
    service: "Dry Clean",
    price: "₹20.00",
    archived: true ,
    icon: "pricetags",
    color: "#9333ea",
  },
];

const BasePriceScreen = () => {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? DarkTheme : LightTheme;
  const navigation = useNavigation<DrawerNavProp>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const renderItem = ({ item }: { item: Item }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: item.archived ? 0.6 : 1,
        },
      ]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: colors.background }]}
      >
        <Ionicons name="pricetags" size={28} color={colors.primary} />
      </View>

      <View style={styles.nameContainer}>
        <Text
          style={[
            styles.name,
            {
              color: item.archived ? colors.subText : colors.text,
              textDecorationLine: item.archived ? "line-through" : "none",
            },
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          style={[
            {
             color:colors.subText,
              textDecorationLine: item.archived ? "line-through" : "none",
            },
          ]}
          numberOfLines={1}
        >
          {item.service}
        </Text>

        {item.archived && (
          <Text style={[styles.archivedText, { color: colors.muted }]}>
            Archived
          </Text>
        )}
      </View>

      <View style={styles.actions}>
         <Text
          style={[
            styles.name,
            {
              color: item.archived ? colors.subText : colors.text,
              textDecorationLine: item.archived ? "line-through" : "none",
            },
          ]}
          numberOfLines={1}
        >
          {item.price}
        </Text>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={20} color={colors.subText} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="delete" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.iconBtn}
        >
          <Ionicons name="menu" size={28} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>Base Prices</Text>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="search" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search */}

      {/* List */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => {
          navigation.navigate(ScreenName.AddEditBasePrice as never);
        }}
      >
        <MaterialIcons name="add" size={26} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BasePriceScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  searchBox: {
    margin: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },

  image: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 12,
  },

  nameContainer: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  archivedText: {
    fontSize: 12,
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
});
