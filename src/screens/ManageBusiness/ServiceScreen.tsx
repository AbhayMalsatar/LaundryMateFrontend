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

type Services = {
  id: string;
  name: string;
  archived?: boolean;
};

const DATA: Services[] = [
  {
    id: "1",
    name: "Ironing",
  },
  {
    id: "2",
    name: "Dry Clean",
  },
  {
    id: "3",
    name: "Washing",
  },
  {
    id: "4",
    name: "Petrol Washing",
  },
  {
    id: "5",
    name: "Roll Polish",
    archived: true,
  },
];

const ServiceScreen = () => {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? DarkTheme : LightTheme;
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const renderItem = ({ item }: { item: Services }) => (
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
        <MaterialIcons name="iron" size={35} color={colors.primary} />
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

        {item.archived && (
          <Text style={[styles.archivedText, { color: colors.muted }]}>
            Archived
          </Text>
        )}
      </View>

      <View style={styles.actions}>
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
      <AddEditService
        onClose={() => {
          setOpenModal(false);
        }}
        onSave={() => {}}
        theme={colors}
        visible={openModal}
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.iconBtn}
        >
          <Ionicons name="menu" size={28} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>Services</Text>

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
          setOpenModal(true);
        }}
      >
        <MaterialIcons name="add" size={26} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ServiceScreen;

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
