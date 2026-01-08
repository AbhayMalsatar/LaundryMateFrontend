import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { LightTheme } from "../../theme/color";
import { ModalStyles } from "./CommonModalCss";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, active: boolean) => void;
  theme: typeof LightTheme;
};

const AddEditService = ({ visible, onClose, onSave, theme }: Props) => {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
  const styles = ModalStyles;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.4}
      style={styles.modal}
      useNativeDriver
      avoidKeyboard={false} // 🔴 VERY IMPORTANT
      swipeDirection={["down"]}
      onSwipeComplete={onClose}
      propagateSwipe
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : undefined}
        >
          <View
            style={[
              styles.container,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            {/* Drag Handle */}
            <View style={styles.dragHandleWrapper}>
              <View style={styles.dragHandle} />
            </View>

            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
              <Text style={[styles.title, { color: theme.text }]}>
                Add Services
              </Text>

              <TouchableOpacity onPress={onClose}>
                <MaterialIcons name="close" size={26} color={theme.subText} />
              </TouchableOpacity>
            </View>

            {/* Body */}
            <View style={styles.body}>
              {/* Input */}
              <Text style={[styles.label, { color: theme.subText }]}>
                SERVICES NAME
              </Text>
              <TextInput
                placeholder="e.g., Washing"
                placeholderTextColor={theme.subText}
                value={name}
                onChangeText={setName}
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
              />

              {/* Active Status */}
              <View
                style={[
                  styles.switchCard,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                  },
                ]}
              >
                <View>
                  <Text style={[styles.switchTitle, { color: theme.text }]}>
                    Active Status
                  </Text>
                  <Text style={[styles.switchSub, { color: theme.subText }]}>
                    Make available for orders
                  </Text>
                </View>

                <Switch
                  value={active}
                  onValueChange={setActive}
                  trackColor={{
                    false: theme.border,
                    true: theme.primary,
                  }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: theme.primary }]}
                onPress={() => onSave(name, active)}
              >
                <MaterialIcons name="save" size={24} color="#fff" />
                <Text style={styles.saveText}>Save Service</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={[styles.cancelText, { color: theme.subText }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddEditService;
