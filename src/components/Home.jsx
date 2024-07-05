import React, { useState, useEffect } from "react";
import HospitalCard from "./HospitalCard";
import image1 from "../assets/hospital1.svg";
import image2 from "../assets/hospital2.svg";
import image3 from "../assets/hospital3.svg";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Text from "./Text";

const images = [image1, image2, image3];

const randomNumberBetweenZeroAnd = (a) => {
  return Math.floor(Math.random() * a);
};

export default function Home() {

  const [hospitals, setHospitals] = useState([]);
  const [hospitalsLoading, setHospitalsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://equal-yoke-touted-vein-production.pipeops.app/api/hospital/all")
      .then((res) => {
        if (res.status !== 200) {
          console.log(res.statusText);
          return;
        }
        setHospitals(res.data);
        setTimeout(() => {
          setHospitalsLoading(false);
        }, 400);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>

      <Text text={"List of all the hospitals"} />

      {hospitalsLoading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="hospital-card-wrapper">
          {hospitals.map((v, i) => (
            <HospitalCard
              key={i}
              props={{
                name: v.name,
                desc: v.description,
                address: v.address,
                image: images[randomNumberBetweenZeroAnd(3)],
                link: v._id,
                data: v,
              }}
            />
          ))}
        </div>
      )}
      <div className="hospital-card-wrapper"></div>
    </div>
  );
}
