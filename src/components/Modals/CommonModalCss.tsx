import { StyleSheet } from "react-native";

export const ModalStyles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    maxHeight: "150%",
  },
  dragHandleWrapper: {
    alignItems: "center",
    paddingVertical: 10,
  },
  dragHandle: {
    width: 48,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#9ca3af",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  body: {
    padding: 20,
    gap: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },
  input: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  switchCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  switchSub: {
    fontSize: 13,
    marginTop: 4,
  },
  footer: {
    padding: 20,
    gap: 12,
  },
  saveButton: {
    height: 56,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  cancelBtn: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "500",
  },
});