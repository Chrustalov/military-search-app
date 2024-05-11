import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import { useEffect, useMemo, useCallback, useState } from 'react';
import { UserContext } from "./contexts/UserContext";


function App() {
  const [user, setUser] = useState(null);
  const login = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    login
  }), [user, login]);

  useEffect(() => {
    if(user){
      localStorage.setItem('appState', JSON.stringify(user));
    }
   
  }, [user]);

  useEffect(() => {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      login(JSON.parse(savedState));
    }
  }, []);

  return (
    <UserContext.Provider value={{contextValue}}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
