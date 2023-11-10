import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home"
import NavBar from "./Components/NavBar"
import  Profile from "./Components/Profile"
import Signin from "./Components/Signin"
import Signup from "./Components/Signup"
import ExploreDeals from "./Components/ExploreDealsCards/ExploreDeals"
import CreatedDeals from "./Components/CreatedDealsCards/CreatedDeals"
import AcceptedDeals from "./Components/AcceptedDeals/AcceptedDeals"
function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ExploreDeals" element={<ExploreDeals />} />
        <Route path="/CreatedDeals" element={<CreatedDeals />} />
        <Route path="/AcceptedDeals" element={<AcceptedDeals />} />



        {/* ... */}
      </Routes>;
    </>
  );
}

export default App;