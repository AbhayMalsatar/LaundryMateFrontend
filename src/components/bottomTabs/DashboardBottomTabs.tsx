import {
  View,
} from "react-native";

import DashboardScreen from "../../screens/Dashboard/DashboardScreen";
import ProfileScreen from "../../screens/Dashboard/ProfileScreen";
import OrderScreen from "../../screens/Dashboard/OrderScreen";
import { ScreenName } from "../../data/enum/ScreenName";
import { TabListItem } from "../../data/types/TabListItem";
import CustomBottomTabs from "../common/CustomBottomTabs";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavProp } from "../../data/types/DrawerParmList";

const DashBoardBottomTabsData:TabListItem[] = [
  {name:ScreenName.Home, screen:DashboardScreen, iconName:"home", options:""},
  {name:ScreenName.Orders, screen:OrderScreen, iconName:"list-alt", options:""},
  {name:ScreenName.Spacer, screen:DashboardScreen, iconName:"home", options:<View style={{ width: 70 }} />},
  {name:ScreenName.Profile, screen:ProfileScreen, iconName:"person", options:""},
  {name:ScreenName.Setting, screen:ProfileScreen, iconName:"settings", options:""},
]

const DashboardBottomTabs = () => {
  const navigate = useNavigation<DrawerNavProp>();
  const handleOnCustomerFabButtonClick = () => {
    navigate.navigate(ScreenName.Customers, {"screen":ScreenName.AddCustomer})
  }
  return (
   <CustomBottomTabs tabList={DashBoardBottomTabsData} fabButtonOnPress={()=>{}} isFabButtonShow={true} />
  )
}

export default DashboardBottomTabs

