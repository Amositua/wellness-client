import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { TextField, Paper, InputAdornment } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Context } from "../Store";
import image from "../assets/hospital_register.svg";
import { Navigate } from "react-router-dom";
import AccountCircle from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import AddressIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";

export default function AlertDialogSlide(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [beds, setBeds] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(undefined);
  const [cookies, setCookie] = useCookies(["token"]);
  const [state, dispatch] = useContext(Context);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {}, []);

  const verifyLogin = () => {
    if (
      email === "" ||
      password === "" ||
      name === "" ||
      address === "" ||
      telephone === "" ||
      description === ""
    )
      return setError("Please fill the required fields");

    axios
      .post(
        "https://equal-yoke-touted-vein-production.pipeops.app/api/hospital/register",
        {
          email,
          password,
          name,
          location,
          address,
          telephone,
          beds,
          description,
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }
        setCookie("token", response.data.token, { path: "/" });
        dispatch({
          type: "HOSPITAL_REGISTER",
          payload: {
            isAuth: true,
            hospitalData: response.data.hospital,
            isHospital: true,
          },
        });
        setRedirect(true);
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          setError(err.response.data.message);
      });
  };

  const onEmailInputChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordInputChange = (event) => {
    setPassword(event.target.value);
  };
  const onNameInputChange = (event) => {
    setName(event.target.value);
  };
  const onLocationInputChange = (field, value) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      [field]: value,
    }));
  };
  const onAddressInputChange = (event) => {
    setAddress(event.target.value);
  };
  const onTelephoneInputChange = (event) => {
    setTelephone(event.target.value);
  };
  const onBedsInputChange = (event) => {
    setBeds(event.target.value);
  };
  const onDescriptionInputChange = (event) => {
    setDescription(event.target.value);
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <div>
      <div className="absolute-center">
        <Paper
          style={{ borderRadius: "10px", padding: "20px 10px" }}
          variant="outlined"
        >
          <div className="create-form">
            <div className="create-form-element">
              <img src={image} alt="create svg" style={{ width: "25vw" }} />
            </div>
            {error ? (
              <div className="create-form-element">
                <Alert severity="error">{error}</Alert>
              </div>
            ) : null}
            <div className="create-form-element">
              <div className="hospital-register-input-wrapper">
                <TextField
                  value={email}
                  onChange={onEmailInputChange}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  type="email"
                />
                <TextField
                  value={password}
                  onChange={onPasswordInputChange}
                  label="Password"
                  variant="outlined"
                  type="password"
                />
              </div>
            </div>
            <div className="create-form-element">
              <div className="hospital-register-input-wrapper">
                <TextField
                  value={name}
                  onChange={onNameInputChange}
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  value={address}
                  onChange={onAddressInputChange}
                  label="Address"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AddressIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="create-form-element">
              <div className="hospital-register-input-wrapper">
                <TextField
                  value={telephone}
                  onChange={onTelephoneInputChange}
                  label="Telephone"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  value={description}
                  onChange={onDescriptionInputChange}
                  label="Description"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreateIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="create-form-element">
              <div className="hospital-register-input-wrapper">
                <TextField
                  value={beds}
                  onChange={onBedsInputChange}
                  label="Beds"
                  variant="outlined"
                  type="number"
                />
                <TextField
                  value={location.latitude}
                  onChange={(e) =>
                    onLocationInputChange("latitude", e.target.value)
                  }
                  label="Latitude"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationSearchingIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigator.geolocation.getCurrentPosition(
                              (pos) =>
                                setLocation({
                                  latitude: pos.coords.latitude,
                                  longitude: pos.coords.longitude,
                                }),
                              (e) => setError(e.message),
                              {
                                enableHighAccuracy: true,
                                timeout: 5000,
                                maximumAge: 0,
                              }
                            )
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  value={location.longitude}
                  onChange={(e) =>
                    onLocationInputChange("longitude", e.target.value)
                  }
                  label="Longitude"
                  variant="outlined"
                  type="number"
                />
              </div>
            </div>
            <div className="create-form-element">
              <Button onClick={verifyLogin} color="primary">
                Register
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
