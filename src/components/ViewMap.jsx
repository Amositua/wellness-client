import React from "react";
import { HMap } from "./Hmap";
import HospitalCards from "./HospitalCard";
const ViewMap = () => {
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
      
      <div className="dashboard-wrapper">
      <div className="hospital-list-map">
          {/* <Paper variant="elevation"> */}
          {data.map((v, i) => {
            return <HospitalCards props={{ data: v }} key={i} />;
          })}
          {/* </Paper> */}
        </div>
        <HMap data={data} loading={loading} /> 
        
      </div>
  );
};

export default ViewMap;
