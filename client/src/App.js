import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import Post from "./pages/Posts/Post";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import { AuthProvider } from "./contexts/UserContext";
import Login from "./pages/Login/Login";
import Profile from "./components/Profile/Profile";
import { ToastContainer } from "react-toastify";
import { useMemo } from "react";
import Create from "./pages/Create/Create";

function App() {
  const loginPage = useMemo(() => <Login />, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/posts"} element={<Posts />} />
          <Route exact path={"/posts/:id"} element={<Post />} />
          <Route path={"/signin"} element={loginPage} />
          <Route path={"/signup"} element={loginPage} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/create"} element={<Create />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
