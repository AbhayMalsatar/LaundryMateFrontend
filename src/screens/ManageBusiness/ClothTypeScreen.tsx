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

type ClothItem = {
  id: string;
  name: string;
  image: string;
  archived?: boolean;
};

const DATA: ClothItem[] = [
  {
    id: "1",
    name: "Cotton Shirt",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA3RW2WmWllNdb61dAeAQwvGPchm8HOUtgLga85LmCXaSIL5k6aMw1WFtnqEJWgNgIdhv4r8_5cVXI0STa2-_OSvdBh1YqroPtvpcXyZ79PEBeZD0gbfK8S55xlQURFlOx3DCZ_oktmZB2I1HUAjw7bVweHZcBzz29NOtikhKQiCo6zj8SneN_elgXDBlI_lLvVNGLcEHfghAV8H12ACDc3JrNpfrrJOLiYvAmc7ZKoynNdL1j_XqezyAd_1gapw5t0MXPWZ8sdthYi",
  },
  {
    id: "2",
    name: "Jeans",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgrOm9dqNW4WrYOuASDQHhZeFxdYzJ96X78HAI6GObL9U0f688lS5cGS9zZS9_sqrfuHPneZEOTqTshDLXaOsKXErZPRj-Fc6AH05GALM3ybB6p_VevJGQ78ZYZ_77qmyNTuRPP9JGjLP31UqVMCg0IfnvauE2Z3dKwbctNlPaU7E1Qj9t71vWTmjiA-keIKvwVfMXaSHY4tBpOsDhLmAcGKe9ho-kV1fNGfpQetCieLAbgavQuy1kdJNgFv9F6DPwhxYgZo9kWUbj",
  },
  {
    id: "3",
    name: "King Size Duvet",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMYkL--mqn516o5DIzZqF95Rq-uNdaTXPX6cGTpGhw945dCdY_Ny3kkW4zSpnTag_HmDegKfHCQ9UBXnO_4VkYYtBjB9h0laZow2UALXOIxhmb4QCGtKXksqEwfvm2T3Ib5MkgPPF-sT2jl1p2F4j6qHQEiCUwHd3RtL4Mrsry_Ss3zQjKVoObOGhhCSeDAU0qP5aylpLYJRu0EYAUTTFptMORm_jBS4-pn_BzI5wY3L26WVAvDKtqeecXma0-NSV3R9-UWLW1kSeB",
  },
  {
    id: "4",
    name: "Silk Dress",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOPu863bj5_rd_-wjq-DsqtORrUpU8UUjpBcX1LhC2273R-TAotCxeC2z23UozvOSnnqLZfUxoistXOBSPNcaYbMMpXiOmnH4Z1bNvLbS3hKbIgNHUUHC7gikF9b7zY5AZtpz_BxhZtm7uKCZkmkRgD9Y39rtK4XAvjUDeQSvHaH076VZ1Dpw4KEzAZMXywv4v5zN3H1MdjhxkSmybm5OMP3GkWEdGNFUu-OcZnm4grl9CHU-rb6C2pdokXjDNHivT9DVs1ki7u9KP",
  },
  {
    id: "5",
    name: "Wool Coat",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8l61EkSteDNFjumjfO_-HK3ZfNVbVToEEmZF05vDlqC46Hr-Ac_uNcEYk9W92F7yFW1RtGa37ugnaMbs7r1ySVbN7YFoNSuuoKjhAcXtEwXIL7_cZnOe03eanIftRNUIUXmEutYUKewcliP2J8JjOaJSgyvFyVdcDRqTMplb98hN5-PkQeWem8HRzRhY-jofd-HvllVegpcv7HmwKunotjRD9WF7GLfNjahwOy262izbpI8CYIbhAoD5P6www8YDoURn-Y_7zHSIJ",
    archived: true,
  },
];

const ClothTypesScreen = () => {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? DarkTheme : LightTheme;
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const renderItem = ({ item }: { item: ClothItem }) => (
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
      <Image source={{ uri: item.image }} style={styles.image} />

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
        <AddEditClothTypes setShow={setOpenModal} show={openModal}/>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.iconBtn}
        >
          <Ionicons name="menu" size={28} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>Cloths Type</Text>

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
            setOpenModal(true)
        }}
      >
        <MaterialIcons name="add" size={26} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ClothTypesScreen;

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
});
