import React, { Component } from "react";
import {
  Paper,
  Divider,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import "./postadd.css";
import { withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import store from "../../store/store";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: "60%",
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
    width: "80%"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});
const provinces = [
  {
    value: "punjab",
    label: "Punjab"
  },
  {
    value: "sindh",
    label: "Sindh"
  },
  {
    value: "balochistan",
    label: "Balochistan"
  },
  {
    value: "azadkashmir",
    label: "Azad Kashmir"
  }
];
const category = [
  {
    value: "mobile",
    label: "mobile"
  },
  {
    value: "bike",
    label: "bike"
  },
  {
    value: "vehicle",
    label: "vehicle"
  },
  {
    value: "animals",
    label: "animals"
  },
  {
    value: "kids",
    label: "kids"
  },
  {
    value: "jobs",
    label: "jobs"
  }
];

class postadd extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      category: "",
      description: "",
      name: "",
      phone: "",
      province: "",
      address: "",
      price: "",
      image: null
    };
  }
  fileselectedHandler = name => evt => {
    this.setState({
      [name]: evt.target.files[0]
    });
  };

  onChangehandler = name => evt => {
    this.setState({
      [name]: evt.target.value
    });
  };
  onSubmithandler = evt => {
    evt.preventDefault();
    store.dispatch({
      type: "post_Add",
      ...this.state
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" color="primary">
            Submit an Ad
          </Typography>

          <form onSubmit={this.onSubmithandler} className={classes.form}>
            <Divider />
            <TextField
              className={classes.fields}
              onChange={this.onChangehandler("title")}
              label="Ad Title*"
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              select
              label="Select Category"
              helperText="select the category of you product. "
              margin="normal"
              variant="outlined"
              value={this.state.category}
              onChange={this.onChangehandler("category")}
            >
              {category.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <br />

            <Divider />
            <TextField
              className={classes.fields}
              label="Ad Description*"
              multiline
              onChange={this.onChangehandler("description")}
              rows="4"
              margin="normal"
              variant="outlined"
            />
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              onChange={this.fileselectedHandler("image")}
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                style={{ marginBottom: "15px" }}
                variant="contained"
                color="primary"
                component="span"
                className={classes.button}
              >
                <AddIcon />
                Add Sample images
              </Button>
            </label>
            <Divider />
            <TextField
              className={classes.fields}
              label="Price*"
              margin="normal"
              required
              variant="outlined"
              onChange={this.onChangehandler("price")}
            />

            <Divider />

            <TextField
              className={classes.fields}
              label="Name*"
              margin="normal"
              variant="outlined"
              onChange={this.onChangehandler("name")}
              required
            />

            <TextField
              className={classes.fields}
              label="Phone number*"
              margin="normal"
              variant="outlined"
              onChange={this.onChangehandler("phone")}
              required
            />
            <Divider />
            <TextField
              className={classes.fields}
              label="Address*"
              margin="normal"
              variant="outlined"
              onChange={this.onChangehandler("address")}
              required
            />
            <Divider />
            <TextField
              select
              label="Province "
              helperText="By clicking 'Submit' you confirm 
          that you have carefully read and 
          understood all the facts."
              margin="normal"
              variant="outlined"
              value={this.state.province}
              onChange={this.onChangehandler("province")}
            >
              {provinces.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Divider />
            <br />

            <Button type="submit" fullWidth variant="contained" color="primary">
              postadd
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(postadd);
