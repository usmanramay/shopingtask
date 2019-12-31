import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import { connect } from "react-redux";
import history from "../../history";
import store from "../../store/store";
import DrawerHeader from "../drawer/drawer";
import { withStyles } from "@material-ui/core/styles";
import { Translate } from "react-localize-redux";
import LanguageToggle from "./languageToggle";
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    borderLeft: "1px solid blue"
  },
  headerBtn: {
    display: "flex",
    alignItems: "center"
  }
});

class header extends Component {
  loggedmeout = evt => {
    evt.preventDefault();
    fetch("http://185.189.50.173:8000/logout")
      .then(function(resp) {
        return resp.json();
      })
      .then(function(data) {
        if (data) {
          history.push("/login");
          store.dispatch({
            type: "user_loggedout_success",
            loggedInUser: "false"
          });
        }
      });
  };
  render() {
    const { classes, authUser } = this.props;
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <DrawerHeader />
            <IconButton component={Link} to="/">
              <img
                src={
                  "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/shopping-circle-blue-512.png"
                }
                height="40px"
                alt="logo"
              ></img>
            </IconButton>
            <Typography style={{ flex: 1 }} variant="h6" color="inherit" noWrap>
              <Translate id="appName.title" />
              {/* Pakistan's Largest Marketplace */}
              {/* </Translate> */}
            </Typography>
            <div className={classes.headerBtn}>
              <LanguageToggle />

              <Button
                className={classes.button}
                component={Link}
                to="/"
                color="primary"
              >
                <Translate id="headerButton.homeTitle">Home</Translate>
              </Button>

              {this.props.auth.loggedInUser === "false" ? (
                <Button
                  className={classes.button}
                  component={Link}
                  to="/signup"
                  color="primary"
                >
                  <Translate id="headerButton.signUpTitle">signup</Translate>
                </Button>
              ) : null}
              {this.props.auth.loggedInUser === "true" &&
              authUser.userType === "Seller" ? (
                <Button
                  className={classes.button}
                  component={Link}
                  to="/postadd"
                  color="primary"
                >
                  <Translate id="headerButton.postAdTitle">Post Ad</Translate>
                </Button>
              ) : null}
              {this.props.auth.loggedInUser === "true" &&
              authUser.userType === "Seller" ? (
                <Button
                  className={classes.button}
                  component={Link}
                  to="/dashboard"
                  color="primary"
                >
                  <Translate id="headerButton.myAdsTitle">My Ads</Translate>
                </Button>
              ) : null}
              {this.props.auth.loggedInUser === "true" ? (
                <Button
                  className={classes.button}
                  component={Link}
                  to="/profile"
                  color="primary"
                >
                  <Translate id="headerButton.profileTitle">Profile</Translate>
                </Button>
              ) : null}
              {this.props.auth.loggedInUser === "true" ? (
                <Button
                  className={classes.button}
                  to="/logout"
                  onClick={this.loggedmeout}
                  color="primary"
                >
                  <Translate id="headerButton.logoutTitle">logout</Translate>
                </Button>
              ) : (
                <Button
                  className={classes.button}
                  component={Link}
                  to="/login"
                  color="primary"
                >
                  <Translate id="headerButton.signInTitle">Login</Translate>
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
function storeDatareceiver(store) {
  return {
    auth: store.loginReducer,
    authUser: store.loginReducer.loggeduserdata
  };
}
const connectheader = connect(storeDatareceiver)(header);

export default withStyles(styles)(connectheader);
