import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header";
import Signup from "./components/Signup/Sign-up";
import Signin from "./components/Signin/Signin";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import AddProduct from "./components/Admin/AddProduct/AddProduct";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import CreatePoster from "./components/Admin/CreatePoster/CreatePoster";
import OneProduct from "./components/OneProduct/OneProduct";
import Cart from "./components/Cart/Cart";
import Account from "./components/Account/Account";
import Address from "./components/Address/Address";
import AllUsers from "./components/Admin/AllUsers/AllUsers";
import AllOrders from "./components/AllOrders/AllOrders";
import Orders from "./components/Orders/Orders";
import AdminOrders from "./components/Admin/Orders/Orders";
import AllProducts from "./components/Admin/AllProducts/AllProducts";
import AllPoster from "./components/Admin/AllPoster/AllPoster";
import EditProduct from "./components/Admin/EditProduct/EditProduct";
import Search from "./components/Search/Search";
import EditUser from "./components/EditUser/EditUser";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPass from "./components/ResetPass/ResetPass";
import Footer from "./components/Footer/Footer";
import { isLogin, cartCount } from "./AppContext";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  const [islogin, setLogin] = useState(false);
  const [Count, setCount] = useState(0);
  return (
    <>
      <isLogin.Provider value={{ islogin, setLogin }}>
        <cartCount.Provider value={{ Count, setCount }}>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/createposter" element={<CreatePoster />} />
            <Route path="/product/:id" element={<OneProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/address" element={<Address />} />
            <Route path="/allusers" element={<AllUsers />} />
            <Route path="/order/:user_id/:product_id" element={<Orders />} />
            <Route path="/your-orders" element={<AllOrders />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/all-posters" element={<AllPoster />} />
            <Route path="/edit-product/:produc_id" element={<EditProduct />} />
            <Route path="/search/:quarry" element={<Search />} />
            <Route path="/edit-user" element={<EditUser />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPass />} />
            <Route
              path="*"
              element={
                <Error data={{ error: 404, message: "Page Not Found" }} />
              }
            />
          </Routes>
          <Footer />
        </cartCount.Provider>
      </isLogin.Provider>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;