import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
} from "@material-ui/core";
import HospitalTable from "./HospitalTable";
import { NavLink } from 'react-router-dom';


export const HMap = (props) => {
  const [open, setOpen] = React.useState(false);
  const [currentElement, setElement] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const mapRef = React.useRef(null);
  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "9_kBAi8JFEKENJhKGZQvHGjYLz3YIKtttsUEeWgKPWY",
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 28, lng: 77 },
      zoom: 13,
      pixelRatio: window.devicePixelRatio || 1,
    });



    const success = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      map.setCenter({ lat, lng });
      map.setZoom(10);
      const currentMarker = new H.map.Marker({ lat, lng });
      map.addObject(currentMarker);
      currentMarker.addEventListener("tap", () => {
        alert("This is your location");
      });
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      alert(
        "Your browser does not support location tracking, or permission is denied."
      );
    }
    const addMarkerfromData = (platform, data) => {
      let service = platform.getSearchService();
      data.map((ele) =>
        service.geocode(
          {
            q: ele.address,
          },
          (result) => {
            let item = result.items[0];
            const currentGroup = new H.map.Group();
            map.addObject(currentGroup);
            map.setCenter(item.position);
            const currentMarker = new H.map.Marker(item.position);
            // currentMarker.setData(ele);
            currentGroup.addObject(currentMarker);
            currentGroup.addEventListener("tap", () => {
              setElement({ ele });
              handleClickOpen();
              console.log(ele);
            });
          },
          alert
        )
      );
    };
    addMarkerfromData(platform, props.data);

    return () => {
      map.dispose();
    };
  }, [mapRef, props.data]);
  console.log(currentElement);
  return (
    <div>
      <div
        className="map"
        ref={mapRef}
        style={{ height: "100vh", width: "76vw" }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {currentElement.ele ? currentElement.ele.name : null}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentElement.ele ? currentElement.ele.description : null}
          </DialogContentText>
          <HospitalTable props={{ data: currentElement.ele }} />
        </DialogContent>
        <DialogActions>
          <NavLink
            to={`/hospital/profile/${
              currentElement.ele ? currentElement.ele._id : null
            }`}
          >
            <Button variant="outlined" onClick={handleClose} color="primary">
              View Profile
            </Button>
          </NavLink>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
