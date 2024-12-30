import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Header from "./components/Header/Header";
import Signup from "./components/Signup/Sign-up";
import Signin from "./components/Signin/Signin";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import AddProduct from "./components/Admin/AddProduct/AddProduct";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import CreatePoster from "./components/Admin/CreatePoster/CreatePoster";
import OneProduct from "./components/OneProduct/OneProduct";
import { isLogin } from "./AppContext";
import { ToastContainer } from 'react-toastify';
import "./App.css";

function App() {
  const [islogin,setLogin] = useState(false)
  return (
    <>
      <isLogin.Provider value={{islogin,setLogin}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/createposter" element={<CreatePoster />} />
          <Route path="/product/:id" element={<OneProduct />} />
          <Route path="*" element={<Error data={{error:404,message:'Page Not Found'}} />} />
        </Routes>
      </isLogin.Provider>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
