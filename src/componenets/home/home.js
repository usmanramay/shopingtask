import React, { Component } from "react";
import homeimg from "../../images/olxhome.PNG";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import store from "../../store/store";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    objectFit: "cover"
  },
  root: {
    flexGrow: 1,
    marginTop: 20,
    width: "99%"
  },
  paper: {
    height: 140,
    width: 100
  },
  btn: {
    display: "flex",
    alignItems: "center"
  },
  container: {
    maxWidth: "1140px",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    marginTop: "10px"
  },
  title: {
    marginLeft: "133px",
    marginBottom: "12px"
  }
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: "16",
      fetchdata: []
    };
  }

  componentDidMount() {
    store.dispatch({
      type: "load_ads"
    });
  }

  render() {
    let { classes,authUser } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <img src={homeimg}></img>
        </div>
        <Grid container className={classes.root}>
          <div className={classes.title}>
            <Typography variant="h5" component="p">
              Products
            </Typography>
          </div>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {this.props.ads.data.ads.length === 0 ||
              this.props.ads.data.ads.length === undefined ? (
                <CircularProgress size={50} thickness={5} />
              ) : (
                this.props.ads.data.ads.map(data => (
                  // this.state.fetchdata.map((data)=>(
                  <React.Fragment>
                    <Grid item>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="adds images"
                            className={classes.media}
                            height="140"
                            image={data.imgpath}
                            title={data.title}
                          />
                          <CardContent>
                            <Typography variant="h5" component="p">
                              Rs:{data.price}
                            </Typography>
                            <Typography gutterBottom component="p">
                              {data.title}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Typography
                            style={{ flex: 1 }}
                            variant="caption"
                            gutterBottom
                          >
                            {data.address}
                          </Typography>
                          <Button
                            className={classes.btn}
                            size="small"
                            color="primary"
                          >
                            <ShoppingCart /> Buy
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </React.Fragment>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
function storeDatareceiver(storedata) {
  return {
    authUser: storedata.loginReducer.loggeduserdata,
    ads: storedata.postaddReducer
  };
}
const connectheader = connect(storeDatareceiver)(Home);

export default withStyles(styles)(connectheader);
