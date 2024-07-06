// import React, { useEffect, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import { NavLink } from "react-router-dom";
// import { Context } from "../Store";
// import { useCookies } from "react-cookie";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function ButtonAppBar() {
//   const classes = useStyles();
//   const [cookies, setCookie] = useCookies(["token"]);
//   const [state, dispatch] = useContext(Context);

//   useEffect(() => {
//     console.log(window.location.pathname.includes("hospital"));
//   }, []);

//   const handleClick = () => {
//     setCookie("token", "", { path: "/", expires: 0 });
//     window.location = "/";
//   };

//   return (
//     <div className={classes.root + " nav-wrapper"}>
//       <AppBar
//         position="static"
//         style={{ backgroundColor: state.isHospital ? "#b23d10" : "#4573b9" }}
//       >
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="menu"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             <NavLink to="/">Wellness</NavLink>
//           </Typography>
//           <NavLink to="/map">
//             <Button color="inherit">View Map</Button>
//           </NavLink>
//           |
//           <NavLink to="/hospital/all">
//             <Button color="inherit">All Hospitals</Button>
//           </NavLink>
//           |
//           {state.isAuth ? (
//             <NavLink
//               to={
//                 state.isHospital
//                   ? `/hospital/dashboard/${state.hospitalData._id}`
//                   : `/user/profile/${state.userData._id}`
//               }
//             >
//               <Button color="inherit">
//                 Logged in as{" "}
//                 {state.isHospital
//                   ? state.hospitalData.name
//                   : state.userData.name}
//               </Button>
//             </NavLink>
//           ) : (
//             <NavLink to="/user/auth">
//               <Button color="inherit">Login as User</Button>{" "}
//             </NavLink>
//           )}
//           {state.isHospital ? <>|</> : null}
//           {state.isHospital ? (
//             <NavLink to={`/hospital/profile/edit/${state.hospitalData._id}`}>
//               <Button color="inherit">Edit Profile</Button>
//             </NavLink>
//           ) : null}
//           |
//           {state.isAuth ? (
//             <Button onClick={handleClick} color="inherit">
//               Logout
//             </Button>
//           ) : (
//             <NavLink to="/hospital/auth">
//               <Button color="inherit">Login as Hospital</Button>{" "}
//             </NavLink>
//           )}
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

import React, { useEffect, useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { Context } from "../Store";
import { useCookies } from "react-cookie";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import logo from "../../src/assets/logo2.png"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  logo: {
    marginRight: theme.spacing(1),
    height: '60px',
    width: '70px'
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [cookies, setCookie] = useCookies(["token"]);
  const [state, dispatch] = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    console.log(window.location.pathname.includes("hospital"));
  }, []);

  const handleClick = () => {
    setCookie("token", "", { path: "/", expires: 0 });
    window.location = "/";
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItems = () => (
    <>
      <MenuItem onClick={handleMenuClose}>
        <NavLink to="/map" className={classes.navLink}>
          <Button color="inherit">View Map</Button>
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <NavLink to="/hospital/all" className={classes.navLink}>
          <Button color="inherit">All Hospitals</Button>
        </NavLink>
      </MenuItem>
      {state.isAuth ? (
        <MenuItem onClick={handleMenuClose}>
          <NavLink
            to={
              state.isHospital
                ? `/hospital/dashboard/${state.hospitalData._id}`
                : `/user/profile/${state.userData._id}`
            }
            className={classes.navLink}
          >
            <Button color="inherit">
              Logged in as{" "}
              {state.isHospital
                ? state.hospitalData.name
                : state.userData.name}
            </Button>
          </NavLink>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMenuClose}>
          <NavLink to="/user/auth" className={classes.navLink}>
            <Button color="inherit">Login as User</Button>
          </NavLink>
        </MenuItem>
      )}
      {state.isHospital && (
        <MenuItem onClick={handleMenuClose}>
          <NavLink to={`/hospital/profile/edit/${state.hospitalData._id}`} className={classes.navLink}>
            <Button color="inherit">Edit Profile</Button>
          </NavLink>
        </MenuItem>
      )}
      {state.isAuth ? (
        <MenuItem onClick={handleMenuClose}>
          <Button onClick={handleClick} color="inherit">
            Logout
          </Button>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMenuClose}>
          <NavLink to="/hospital/auth" className={classes.navLink}>
            <Button color="inherit">Login as Hospital</Button>
          </NavLink>
        </MenuItem>
      )}
    </>
  );

  return (
    <div className={classes.root + " nav-wrapper"}>
      <AppBar
        position="static"
        style={{ backgroundColor: state.isHospital ? "#b23d10" : "#4573b9" }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <div className={classes.flex}>
          <img src={logo} alt="Logo" className={classes.logo} />
            <NavLink to="/" className={classes.navLink}>Wellness</NavLink>
          </div>
          
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {renderMenuItems()}
              </Menu>
            </>
          ) : (
            <>
              <NavLink to="/map" className={classes.navLink}>
                <Button color="inherit">View Map</Button>
              </NavLink>
              |
              <NavLink to="/hospital/all" className={classes.navLink}>
                <Button color="inherit">All Hospitals</Button>
              </NavLink>
              |
              {state.isAuth ? (
                <NavLink
                  to={
                    state.isHospital
                      ? `/hospital/dashboard/${state.hospitalData._id}`
                      : `/user/profile/${state.userData._id}`
                  }
                  className={classes.navLink}
                >
                  <Button color="inherit">
                    Logged in as{" "}
                    {state.isHospital
                      ? state.hospitalData.name
                      : state.userData.name}
                  </Button>
                </NavLink>
              ) : (
                <NavLink to="/user/auth" className={classes.navLink}>
                  <Button color="inherit">Login as User</Button>
                </NavLink>
                
              )}
              {state.isHospital ? <>|</> : null}
              {state.isHospital ? (
                <NavLink to={`/hospital/profile/edit/${state.hospitalData._id}`} className={classes.navLink}>
                  <Button color="inherit">Edit Profile</Button>
                </NavLink>
              ): null}
              |
              {state.isAuth ? (
                <Button onClick={handleClick} color="inherit">
                  Logout
                </Button>
              ) : (
                <NavLink to="/hospital/auth" className={classes.navLink}>
                  <Button color="inherit">Login as Hospital</Button>
                </NavLink>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
