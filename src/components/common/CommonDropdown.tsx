import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

type Props = DropdownProps<any> & {
  label?: string;
  placeholder: string;
  data: any[];
  value: any;
  onChange: (item: any) => void;
  theme: any;
  leftIcon?: string;
  searchPlaceholder?: string;
  height?: number;
};

const CommonDropdown = ({
  label,
  placeholder,
  data,
  value,
  onChange,
  theme,
  leftIcon,
  searchPlaceholder = "Search...",
  height = 52,
  style,
  ...rest
}: Props) => {
  return (
  
      <Dropdown
        style={[
          styles.dropdown,
          {
            height,
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },style
        ]}
        containerStyle={[
          styles.dropdownContainer,
          {
            backgroundColor: theme.background,
            borderColor: theme.border,
          },
        ]}
        inputSearchStyle={[
          styles.searchInput,
          {
            backgroundColor: theme.background,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        itemContainerStyle={[
          styles.itemContainer,
          { backgroundColor: theme.surface },
        ]}
        itemTextStyle={{ color: theme.text }}
        activeColor={theme.primary + "25"}
        data={data}
        search
        searchPlaceholder={searchPlaceholder}
        placeholder={placeholder}
        value={value}
        placeholderStyle={{ color: theme.subText }}
        selectedTextStyle={{
          color: theme.text,
        }}
        onChange={onChange}
        renderLeftIcon={() =>
          leftIcon ? (
            <MaterialIcons
              name={leftIcon as any}
              size={20}
              color={theme.subText}
              style={{ marginRight: 8 }}
            />
          ) : null
        }
        renderRightIcon={() => (
          <MaterialIcons
            name="expand-more"
            size={24}
            color={theme.subText}
          />
        )}
        {...rest}
      />
  );
};

export default CommonDropdown;

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    alignItems: "center",

    // clear separation from background
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },

  dropdownContainer: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 8,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },

  searchInput: {
    borderRadius: 12,
    marginLeft:10,
    marginRight:10,
  },

  itemContainer: {
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 4
  },
});
