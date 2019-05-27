import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
// import classnames from 'classnames';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
// import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";

import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle";

import { signIn, get_user } from "../../actions";
import logo from "../../assets/img/smartCat-icon.png";
import SpinnerComponent from "../spinner/spinner.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: "",
      password: "",
      errors: {},
      loading: false
    };
    this.logInHandler = this.logInHandler.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  logInHandler(e) {
    this.setState({ loading: true });
    e.preventDefault();
    const logInData = {};
    if (this.state.email !== "") {
      logInData["email"] = this.state.email;
    }
    if (this.state.password !== "") {
      logInData["password"] = this.state.password;
    }
    this.props.signIn(logInData, () => {
      this.props.get_user();
      this.props.history.push("/dashboard");
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
    this.props.get_user();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors.apiError) {
      this.setState({ errors: nextProps.errors.apiError });
      this.setState({ loading: false });
    }
  }

  canBeSubmitted() {
    const { email, password } = this.state;
    return email.length > 0 && password.length > 0;
  }

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    const isEnabled = this.canBeSubmitted();
    const custom = {
      catIcon: {
        marginBottom: "5px"
      },
      titlefontSize: {
        fontSize: "23px"
      },
    };
    if (loading) {
      return <SpinnerComponent />;
    } else {
      return (
        <div className={classes.content}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={6} md={4}>
                <form className="custom-style-login-form">
                  <Card login className={classes[this.state.cardAnimaton]}>
                    <CardHeader
                      className={`${classes.cardHeader} ${classes.textCenter}`}
                      color = "logoBlue"
                    >
                      <GridContainer>
                        <GridItem xs={2} sm={2} md={2} lg={2}>
                          <span style={custom.catIcon}>
                            <img src={logo} alt="..." />
                          </span>
                        </GridItem>
                        <GridItem xs={8} sm={8} md={8} lg={8}>
                          <h4
                            className={classes.cardTitle}
                            style={custom.titlefontSize}
                          >
                            CAT Portal
                          </h4>
                        </GridItem>
                      </GridContainer>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        name="email"
                        labelText="User id (format: yourid@allegiantair.com)"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.onChange,
                          type: "text",
                          name: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                        value={this.state.email}
                        onchange={this.onChange}
                      />
                      <CustomInput
                        name="password"
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.onChange,
                          name: "password",
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOutline
                                className={classes.inputAdornmentIcon}
                              />
                            </InputAdornment>
                          )
                        }}
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                    </CardBody>
                    {errors.message && (
                      <div
                        className="invalid-feedback"
                        style={{ textAlign: "center", color: "red" }}
                      >
                        {errors.message}
                      </div>
                    )}
                    <CardFooter className={classes.justifyContentCenter}>
                      <div>
                        <Button
                          color="warning"
                          simple
                          size="lg"
                          block
                          type="submit"
                          onClick={this.logInHandler}
                          disabled={!isEnabled}
                        >
                          LOG IN
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </form>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      );
    }
  }
}

LoginPage.propTypes = {
  classes: propTypes.object.isRequired,
  signIn: propTypes.func.isRequired,
  get_user: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

function mapStateToProps({ auth, errorMsgs }) {
  return {
    auth,
    errors: errorMsgs
  };
}

export default compose(
  withStyles(loginPageStyle),
  connect(
    mapStateToProps,
    { signIn, get_user }
  )
)(LoginPage);
