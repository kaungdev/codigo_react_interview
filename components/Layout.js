import React, { Component, Children } from "react";

import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import storage from "localforage";
import Router from "next/router";

export default class Layout extends Component {
  buildAppBar = () => (
    <AppBar position="static">
      <Toolbar>
        <Typography style={{ color: "white", fontSize: 24 }}>
          Hello World Website
        </Typography>
        <div style={{ flex: 1 }} />
        <Button style={{ color: "white" }} onClick={this.doLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );

  doLogout = async () => {
    await storage.setItem("isUserValid", false);
    Router.push("/login");
  };

  render() {
    return (
      <div>
        {this.buildAppBar()}
        {this.props.margin ? (
          <Grid container style={{ marginTop: 48, marginBottom: 48 }}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              {this.props.children}
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        ) : (
          <div>{this.props.children}</div>
        )}
      </div>
    );
  }
}
