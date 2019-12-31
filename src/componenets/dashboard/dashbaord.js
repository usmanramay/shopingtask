import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
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
    marginTop: 50,
    width: "99%"
  },
  paper: {
    height: 140,
    width: 100
  },
  btn: {
    display: "flex",
    alignItems: "center"
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: "16",
      fetchdata: undefined
    };
  }
  componentDidMount() {
    fetch("http://185.189.50.173:8000/ads/userads", {
      method: "GET"
    })
      .then(function(data) {
        return data.json();
      })
      .then(resp => {
        console.log(resp);
        this.setState({
          fetchdata: [...resp]
        });
      });
  }

  render() {
    let { classes } = this.props;

    return (
      <div>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {
                this.state.fetchdata === undefined ? (
                  <CircularProgress size={50} thickness={5} />
                ) :
              this.state.fetchdata.length === 0 ?
              <h3>
                No Ads
              </h3>:
               (
                this.state.fetchdata.map(data => (
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
                          <Edit /> Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
