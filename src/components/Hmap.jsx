import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "green",
  },
}));

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

    // const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // const ui = H.ui.UI.createDefault(map, defaultLayers);

    const success = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      map.setCenter({ lat, lng });
      map.setZoom(10);
      const currentMarker = new H.map.Marker({ lat, lng });
      map.addObject(currentMarker);
      currentMarker.addEventListener("tap", (event) => {
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
      data.forEach((ele) =>
        service.geocode(
          {
            q: ele.address,
          },
          (result) => {
            if (result.items && result.items.length > 0) {
              let item = result.items[0];
              if (item && item.position) {
                const currentGroup = new H.map.Group();
                map.addObject(currentGroup);
                map.setCenter(item.position);
                const currentMarker = new H.map.Marker(item.position);
                currentGroup.addObject(currentMarker);
                currentGroup.addEventListener("tap", (evt) => {
                  setElement(ele); // corrected this line
                  handleClickOpen();
                  console.log(ele);
                });
              }
            } else {
              console.error("No position found for address:", ele.address);
            }
          },
          (e) => {
            console.error("Geocode error:", e);
          }
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
          {currentElement.name || ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentElement.description || ""}
          </DialogContentText>
          <HospitalTable props={{ data: currentElement }} />
        </DialogContent>
        <DialogActions>
          <NavLink
            to={`/hospital/profile/${currentElement._id || ""}`}
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
