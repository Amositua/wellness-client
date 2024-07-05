import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { TextField, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Context } from "../Store";
import image from "../assets/authenticate.svg";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation

export default function AlertDialogSlide(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const [cookies, setCookie] = useCookies(["token"]);
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {}, []);

  const verifyLogin = async () => {
    try {
      const response = await axios.post("https://equal-yoke-touted-vein-production.pipeops.app/api/user/login", {
        email,
        password,
      });
      if (response.status !== 200) {
        setError(response.data.message);
        return;
      }
      setCookie("token", response.data.token, { path: "/" });
      dispatch({
        type: "LOGIN",
        payload: { isAuth: true, userData: response.data.user },
      });
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const onEmailInputChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

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
            {error && (
              <div className="create-form-element">
                <Alert severity="error">{error}</Alert>
              </div>
            )}
            <div className="create-form-element">
              <TextField
                value={email}
                onChange={onEmailInputChange}
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
            </div>
            <div className="create-form-element">
              <TextField
                value={password}
                onChange={onPasswordInputChange}
                label="Password"
                variant="outlined"
                type="password"
              />
            </div>
            <div className="create-form-element">
              <Button onClick={verifyLogin} color="primary">
                Login
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
