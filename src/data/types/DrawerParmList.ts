import { NavigatorScreenParams } from "@react-navigation/native"
import { ScreenName } from "../enum/ScreenName"
import { TabParmList } from "./TabParmList"
import { DrawerNavigationProp } from "@react-navigation/drawer";

export type DrawerParmList = {
    [ScreenName.Customers]:NavigatorScreenParams<TabParmList>;
    [ScreenName.Dashboard]:NavigatorScreenParams<TabParmList>;
    [ScreenName.ManageBusiness]:NavigatorScreenParams<TabParmList>;
}

export type DrawerNavProp = DrawerNavigationProp<DrawerParmList>;
