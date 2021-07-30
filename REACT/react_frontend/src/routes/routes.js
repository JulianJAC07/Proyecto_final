import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link,Redirect} from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Padre from "../components/Padre";
import Contador from "../components/ejercicio/Contador/Contador";
import Login from "../pages/Login";
import ListarUsuarios from "../pages/Usuarios";

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
}));

// let auth;
// auth = true;

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route {...rest}>{auth ? <Component /> : <Redirect to="/login" />}</Route>
//   );
// };

let auth = true;

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}> {auth ? <Component /> : <Redirect to="/login" />} </Route>
  )
}

const Routes = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
                {" "}
                Home{" "}
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link
                to="/counter"
                style={{ color: "#FFF", textDecoration: "none" }}
              >
                {" "}
                Contador{" "}
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link
                to="/login"
                style={{ color: "#FFF", textDecoration: "none" }}
              >
                {" "}
                Login{" "}
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link
                to="/listarUsuarios"
                style={{ color: "#FFF", textDecoration: "none" }}
              >
                {" "}
                Listar usuarios{" "}
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <Switch>
        <Route exact path="/" component={Padre} />
        <Route path="/counter">
          <Contador />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        { <Route path="/listarUsuarios">
          <ListarUsuarios />
        </Route> }
        { <PrivateRoute exact path="/listarUsuarios" component={ListarUsuarios} /> }
        <PrivateRoute exact path="/**" component={ListarUsuarios} />
      </Switch>
    </Router>
  );
};

export default Routes;