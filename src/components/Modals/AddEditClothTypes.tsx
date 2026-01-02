import { View, Text, useColorScheme } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Container from "../../components/common/Container";
import { DarkTheme, LightTheme } from "../../theme/color";

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
};

const AddEditClothTypes = ({ show = false, setShow = () => {} }: Props) => {
  const scheme = useColorScheme();

  const colors = scheme === "dark" ? DarkTheme : LightTheme;

  return (
    <Modal
      statusBarTranslucent
      useNativeDriverForBackdrop={true}
      isVisible={show}
      animationIn="slideInUp"
    //   coverScreen={false}
      animationOut="slideOutDown"
      backdropOpacity={0.6}
      onBackdropPress={() => {
        setShow(false);
      }}
      onBackButtonPress={() => {
        setShow(false);
      }}
      style={{ margin: 0 }} // full screen
    >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <View
        style={{
          backgroundColor: 'yellow',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          maxHeight: "92%",
        }}
      >
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        </View>
      </View>
    </Modal>
  );
};

export default AddEditClothTypes;
