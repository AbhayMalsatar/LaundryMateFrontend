import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AppStack from "../stack/AppStack";
import AuthStack from "../stack/AuthStack";

export default function AppNavigator() {
  const { isAuthenticated } = useContext(AuthContext);
  return  isAuthenticated ? <AppStack/> : <AuthStack/>;
}
