import React, { useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import UserAuth from "./components/UserAuth";
import HospitalAuth from "./components/HospitalAuth";
import Navbar from "./components/Navbar";
import HospitalProfile from "./components/HospitalProfile";
import HospitalProfileEdit from "./components/HospitalProfileEdit";
import HospitalDashboard from "./components/HospitalDashboard";
import Dashboard from "./components/Landing";
import ViewMap from "./components/ViewMap";
import { Context } from "./Store";

export default function App() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get("https://equal-yoke-touted-vein-production.pipeops.app/api/checktoken", { withCredentials: true });
        if (res.status === 200) {
          console.log(res.data);
          dispatch({
            type: "VERIFY_AUTH",
            payload: {
              isAuth: true,
              userData: res.data.user,
              isHospital: res.data.isHospital,
              hospitalData: res.data.hospital,
            },
          });
        } else {
          throw new Error(res.error);
        }
      } catch (err) {
        console.error("Authentication check failed:", err);
      }
    };

    checkToken();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/map" element={<ViewMap />} />
        <Route path="/hospital/all" element={<Home />} />
        <Route path="/user/auth" element={<UserAuth />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/hospital/auth" element={<HospitalAuth />} />
        <Route path="/hospital/profile/:id" element={<HospitalProfile />} />
        <Route path="/hospital/dashboard/:id" element={<HospitalDashboard />} />
        <Route path="/hospital/profile/edit/:id" element={<HospitalProfileEdit />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}
