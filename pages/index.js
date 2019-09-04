import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Router from "next/router";
import storage from "localforage";

import Layout from "../components/Layout";
import utils from "../utils";

export default class index extends Component {
  state = {
    spaceList: null,
    errorMessage: ""
  };

  async componentDidMount() {
    const isUserValid = await storage.getItem("isUserValid");
    if (!isUserValid) {
      Router.push("/login");
      return;
    }
    const response = await utils.fetchListings();
    if (response)
      this.setState({
        spaceList: response.data.space_list
      });
    else this.setState({ errorMessage: "Somethings wrong" });
  }

  renderListing = () => {
    const { spaceList } = this.state;
    if (!spaceList) return <div></div>;
    return this.state.spaceList.map(listing => (
      <Grid
        item
        xs={6}
        sm={4}
        md={2}
        key={listing.space_id}
        style={{ padding: 8, maxWidth: 1300 }}
      >
        <Card style={{ height: 300 }}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={listing.space_thumb_image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <div style={{ height: 50 }}>
              <Typography gutterBottom>
                <b>{listing.space_name}</b>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {listing.type_name}
              </Typography>
            </div>
            <div style={{ height: 50 }}></div>
            <Typography inline>$ {listing.base_price}</Typography>
            <Typography inline color="textSecondary">
              {" / Day"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  render() {
    return (
      <Layout margin>
        {!this.state.errorMessage ? (
          <>
            {this.state.spaceList && (
              <div>
                <Typography style={{ color: "red" }}>
                  {this.state.spaceList.length}
                </Typography>
                <Typography inline> listings found</Typography>
              </div>
            )}
            <Grid container></Grid>
            <Grid container>{this.renderListing()}</Grid>
          </>
        ) : (
          <Typography>{this.state.errorMessage}</Typography>
        )}
      </Layout>
    );
  }
}
