import { View, Text } from 'react-native'
import React from 'react'
import { TabListItem } from '../../data/types/TabListItem'
import { ScreenName } from '../../data/enum/ScreenName'
import CustomBottomTabs from '../common/CustomBottomTabs'
import ClothTypeScreen from '../../screens/ManageBusiness/ClothTypeScreen'
import ServiceScreen from '../../screens/ManageBusiness/ServiceScreen'
import BasePriceScreen from '../../screens/ManageBusiness/BasePriceScreen'
import AddEditBasePrice from '../../screens/ManageBusiness/AddEditBasePrice'


const MangaeBusinessTabsData:TabListItem[] = [
  {name:ScreenName.ClothTypes, screen:ClothTypeScreen, iconName:"checkroom", options:""  },
  {name:ScreenName.Services, screen:ServiceScreen, iconName:"iron", options:""},
  {name:ScreenName.BasePrice, screen:BasePriceScreen, iconName:"currency-rupee", options:"" }
]


const ManageBusinessBottomTabs = () => {
  return (  
     <CustomBottomTabs tabList={MangaeBusinessTabsData} fabButtonOnPress={()=>{}} isFabButtonShow={false} />
  )
}

export default ManageBusinessBottomTabs