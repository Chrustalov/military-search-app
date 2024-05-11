import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const UserContext = createContext({
    user: null,
    login: () => {},
    logout : () => {},
    isCompany: false,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isCompany, setIsCompany] = useState(false);

    const login = useCallback((newUser) => {
      setUser(newUser);
      setIsCompany(newUser.role === "organization");
    }, []);

    const logout = useCallback(() => {
      setUser(null);
      setIsCompany(false);
      localStorage.removeItem("appState");
    }, []);

    useEffect(() => {
      if (user) {
        localStorage.setItem("appState", JSON.stringify(user));
      }
    }, [user]);

    useEffect(() => {
      const savedState = localStorage.getItem("appState");
      if (savedState) {
        login(JSON.parse(savedState));
      }
    }, [login]);



    return <UserContext.Provider value={{user, login, isCompany, logout}}>
        {children}
        </UserContext.Provider>;
}

export const useUser = () => {
    return useContext(UserContext);;
}