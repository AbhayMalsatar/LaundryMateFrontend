import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View
} from "react-native";
import RecentCustomersScreen from "../../screens/Customers/RecentCustomerScreen";
import CustomerListScreen from "../../screens/Customers/CustomerListScreen";
import AddCustomerScreen from "../../screens/Customers/AddCustomerScreen";
import { ScreenName } from "../../data/enum/ScreenName";
import { TabListItem } from "../../data/types/TabListItem";
import CustomBottomTabs from "../common/CustomBottomTabs";
import { DrawerNavProp } from "../../data/types/DrawerParmList";
import { useNavigation } from "@react-navigation/native";


const CustomerBottomTabsData:TabListItem[] = [
  {name:ScreenName.RecentCustomer, screen:RecentCustomersScreen, iconName:"history", options:""  },
  {name:ScreenName.AddCustomer, screen:AddCustomerScreen, iconName:"list-alt", options:<View style={{ width: 70 }}/>},
  {name:ScreenName.CustomerList, screen:CustomerListScreen, iconName:"contacts", options:"" },
]

const CustomerBottomTabs = () => {
  const navigate = useNavigation<DrawerNavProp>();
  const handleOnCustomerFabButtonClick = () => {
    navigate.navigate(ScreenName.Customers, {"screen":ScreenName.AddCustomer})
  }
  return (
   <CustomBottomTabs tabList={CustomerBottomTabsData} fabButtonOnPress={handleOnCustomerFabButtonClick} isFabButtonShow={true} />
  )
}

export default CustomerBottomTabs