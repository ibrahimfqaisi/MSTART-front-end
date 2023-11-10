import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home"
import NavBar from "./Components/NavBar"
import  Profile from "./Components/Profile"
import Signin from "./Components/Signin"
import Signup from "./Components/Signup"

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />


        {/* ... */}
      </Routes>;
    </>
  );
}

export default App;
