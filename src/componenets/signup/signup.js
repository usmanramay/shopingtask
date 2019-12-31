import React, { Component } from "react";

import { Button, Input, TextField, MenuItem } from "@material-ui/core";

import store from "../../store/store";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#3f51b5'
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const userTypes = [
  {
    value: "Seller",
    label: "Seller"
  },
  {
    value: "User",
    label: "User"
  }
];
class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType:"User"
    };
  }

  changehandler = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  dosignup = evt => {
    evt.preventDefault();
    store.dispatch({
      type: "user_sign-up",
      ...this.state
      // username:this.state.name,
      // email:this.state.email,
      // password:this.state.password,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register Here...
            </Typography>
            <form onSubmit={this.dosignup.bind(this)} className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  name="name"
                  onChange={this.changehandler("name")}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  name="email"
                  onChange={this.changehandler("email")}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={this.changehandler("password")}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  select
                  label="Select User Type "
                  margin="normal"
                  variant="outlined"
                  value={this.state.userType}
                  onChange={this.changehandler("userType")}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {userTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(signup);
