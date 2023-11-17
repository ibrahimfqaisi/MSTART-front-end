import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import "./App.css";

import Profile from "./Components/Profile/Profile";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import ExploreDeals from "./Components/ExploreDealsCards/ExploreDeals";
import CreatedDeals from "./Components/CreatedDealsCards/CreatedDeals";
import AcceptedDeals from "./Components/AcceptedDeals/AcceptedDeals";
import UsersGrid from "./Components/Admin/UsersGrid/UsersGrid";
import AddAdmin from "./Components/Admin/AddAdmin";
import ClaimedDeals from "./Components/Admin/ClaimedDeals/ClaimedDeals";
import DealsGrid from "./Components/Admin/DealsGrid/DealsGrid";

function App() {
  return (
    <>
      <NavBar />
      <div className="min-height-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ExploreDeals" element={<ExploreDeals />} />
          <Route path="/CreatedDeals" element={<CreatedDeals />} />
          <Route path="/AcceptedDeals" element={<AcceptedDeals />} />
          <Route path="/admin/UsersGrid" element={<UsersGrid />} />
          <Route path="/admin/AddAdmin" element={<AddAdmin />} />
          <Route path="/admin/ClaimedDeals" element={<ClaimedDeals />} />
          <Route path="/admin/DealsGrid" element={<DealsGrid />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
