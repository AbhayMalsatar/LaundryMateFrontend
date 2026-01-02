import { MaterialIconsIconName } from "@react-native-vector-icons/material-icons";
import { ComponentType, ReactNode } from "react";

export type TabListItem = {
    name:string;
    screen:ComponentType<any>;
    iconName:MaterialIconsIconName;
    options:ReactNode;
}