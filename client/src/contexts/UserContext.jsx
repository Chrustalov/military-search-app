import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const UserContext = createContext({
    user: null,
    login: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = useCallback((newUser) => {
      setUser(newUser);
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

    return <UserContext.Provider value={{user, login}}>
        {children}
        </UserContext.Provider>;
}

export const useUser = () => {
    return useContext(UserContext);;
}