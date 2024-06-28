/* eslint-disable no-unused-vars */
import React from "react";
import { HMap } from "./Hmap";
import HospitalCards from "./HospitalCard";
import { Paper, Typography, Button } from "@material-ui/core";
import image from "../assets/map.svg";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const API_URL = "https://equal-yoke-touted-vein-production.pipeops.app/api/hospital/all";
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch(API_URL);
    const res = await response.json();
    setData(res);
    setLoading(false);
    console.log(res);
  };
  if (loading) return "Loading...";
  return (
    <div className="dashboard-outer-wrapper">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={image} alt="dash" style={{ width: "42vw" }} />
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
            margin: "30px 0px 0px 0px",
            color: "black",
          }}
          display="block"
        >
          Welcome to Wellness!
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 80,
        }}
      >
        <Link to="/map">
          <Button variant="outlined" color="secondary">
            Open Map
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
