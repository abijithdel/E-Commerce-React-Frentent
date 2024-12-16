import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Signup from "./components/Signup/Sign-up";
import Signin from "./components/Signin/Signin";
import Home from "./components/Home/Home";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
