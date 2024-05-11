import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import Post from "./pages/Posts/Post";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import { useEffect, useMemo, useCallback, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Login from "./pages/Login/Login";

function App() {
  const [user, setUser] = useState(null);
  const loginPage = useMemo(() => <Login />, []);

  const login = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      login,
    }),
    [user, login]
  );

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
  }, []);

  return (
    <UserContext.Provider value={{ contextValue }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/posts"} element={<Posts />} />
          <Route exact path={"/posts/:id"} element={<Post />} />
          <Route path={"/signin"} element={loginPage} />
          <Route path={"/signup"} element={loginPage} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
