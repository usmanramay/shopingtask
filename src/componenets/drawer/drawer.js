import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import ListAltIcon from "@material-ui/icons/ListAlt";
import InputIcon from "@material-ui/icons/Input";
import DashboardIcon from "@material-ui/icons/Dashboard";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import history from "../../history";
import store from "../../store/store";
const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  mainIcon: {
    marginLeft: 80
  }
};

class DrawerHeader extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  loggedmeout = evt => {
    evt.preventDefault();
    fetch("/logout")
      .then(function(resp) {
        return resp.json();
      })
      .then(function(data) {
        if (data) {
          history.push("/login");
          store.dispatch({
            type: "user_loggedout_success",
            loggedInUser: null
          });
        }
      });
  };

  render() {
    const { classes,authUser } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <IconButton className={classes.mainIcon} component={Link} to="/">
            <img height="40px" src={'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/shopping-circle-blue-512.png'} alt="logo"></img>
          </IconButton>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <HomeIcon />{" "}
            </ListItemIcon>
            <Link to="/">Home</Link>
          </ListItem>
          {this.props.auth.loggedInUser === "true" ? (
            <ListItem>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <Link to="/profile">Profile</Link>
            </ListItem>
          ) : null}
          {this.props.auth.loggedInUser === "false" ? (
            <ListItem>
              <ListItemIcon>
                <HowToRegIcon />
              </ListItemIcon>
              <Link to="/signup">SignUp</Link>
            </ListItem>
          ) : null}
          {this.props.auth.loggedInUser === "true" && authUser.userType==='Seller'? (
            <ListItem>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <Link to="/postadd">Post An Ad</Link>
            </ListItem>
          ) : null}
          {this.props.auth.loggedInUser === "true" && authUser.userType==='Seller' ? (
            <ListItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <Link to="/dashboard">My Ads</Link>
            </ListItem>
          ) : null}
           <ListItem>
            <ListItemIcon>
              <InputIcon />
            </ListItemIcon>
            {this.props.auth.loggedInUser === "true" ? (
              <Link to="/logout" onClick={this.loggedmeout}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </ListItem>
        </List>
        <Divider />
      </div>
    );
    return (
      <div>
        <IconButton onClick={this.toggleDrawer("left", true)}  color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>

        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

DrawerHeader.propTypes = {
  classes: PropTypes.object.isRequired
};
function storeDatareceiver(store) {
  return {
    auth: store.loginReducer,
    authUser: store.loginReducer.loggeduserdata

  };
}
const connectheader = connect(storeDatareceiver)(DrawerHeader);
export default withStyles(styles)(connectheader);
