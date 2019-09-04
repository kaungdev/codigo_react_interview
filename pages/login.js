import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Router from "next/router";
import storage from "localforage";

import utils from "../utils";

export default class index extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: ""
  };

  onChange = name => event => {
    event.persist();
    this.setState({
      [name]: event.target.value
    });
  };

  doLogin = async () => {
    const { email, password } = this.state;
    const { passed, error } = await utils.doLogin({ email, password });
    if (passed) {
      await storage.setItem("isUserValid", true);
      Router.push("/");
    } else {
      this.setState({ errorMessage: error });
    }
  };

  render() {
    const { email, password, errorMessage } = this.state;

    return (
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={true}
        style={{ backgroundColor: "white" }}
      >
        <DialogTitle id="simple-dialog-title" style={styles.dialogTitle}>
          Hello World Login
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} style={styles.smallMargin}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={this.onChange("email")}
              />
            </Grid>
            <Grid item xs={12} style={styles.smallMargin}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                value={password}
                onChange={this.onChange("password")}
              />
            </Grid>
            <Grid item xs={12} style={styles.smallMargin}>
              <Typography style={styles.error}>{errorMessage}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: 48,
                marginBottom: 32
              }}
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  style={styles.loginButton}
                  onClick={this.doLogin}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

const styles = {
  dialogTitle: { textAlign: "center", marginTop: 8 },
  smallMargin: { marginTop: 8 },
  loginButton: {
    backgroundColor: "#3F3A5F",
    color: "white"
  },
  error: { color: "red" }
};
