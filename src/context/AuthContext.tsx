import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  console.log("trihggerr")
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true); // ✅ boolean
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (token: string) => {
    if (token) {
      await AsyncStorage.setItem("token", token);
      setIsAuthenticated(true);
    }
    
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
