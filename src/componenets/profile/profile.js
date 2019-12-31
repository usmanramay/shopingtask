import React, { Component } from "react";
import {
  Paper,
  TextField,
 
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      maxWidth: "50%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  fields: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  form: {
    maxWidth: "60%"
  },
  input: {
    display: "none"
  },
  img:{
    margin:'auto',
    display:'flex',
    justifyContent:'center',
    marginBottom:'30px'
  }
});

class profile extends Component {
 

  render() {
    const { classes,authUser } = this.props;
    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
        
          <form onSubmit={this.onSubmithandler} className={classes.form}>
            <img
              src="http://cyrusindia.com/hrpanel/mriAssets2016/me1.png"
              width="140px"
              className={classes.img}
            />
             <TextField
              className={classes.fields}
              label="User Type"
              margin="normal"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              value={authUser && authUser.userType}
            />
            <TextField
              className={classes.fields}
              label="name"
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                readOnly: true,
              }}
              value={authUser && authUser.name}
            />
             <TextField
              className={classes.fields}
              label="Email"
              margin="normal"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              value={authUser && authUser.email}

            />
           
          </form>
        </Paper>
      </div>
    );
  }
}
function storeDatareceiver(storedata) {
  return {
    authUser: storedata.loginReducer.loggeduserdata,
  };
}
const connectheader = connect(storeDatareceiver)(profile);

export default withStyles(styles)(connectheader);
