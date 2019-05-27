import React from "react";
import moment from "moment";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getSeleniumJobsCount, getSoapJobsCount } from "../../actions";
import { Manager, Target, Popper } from "react-popper";

// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import FormControl from "@material-ui/core/FormControl";

// core components
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";

// @material-ui icons
import FilterList from "@material-ui/icons/FilterList";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
// import CardFooter from "components/Card/CardFooter.jsx";

// style for this view
import headerLinksStyle from "../../assets/jss/material-dashboard-pro-react/components/headerLinksStyle";
import SpinnerComponent from '../../views/spinner/spinner.jsx';

class HeaderAdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      jobName: "",
      buildReference: "",
      environment: "",
      rangeStartStartDateTime: undefined,
      rangeEndStartDateTime: undefined,
       loading:false
    };
    this.advancedSearchHandler = this.advancedSearchHandler.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps) {
      this.setState({ jobName: newProps.jobname.label });
    }
    if(newProps.seleniumReducer || newProps.soapReducer){
      this.setState({loading:false})
    }
  }

  advancedSearchHandler(e) {
    this.setState({loading : true})
    e.preventDefault();
    const searchData = {};
    if (this.state.jobName !== "") {
      searchData["jobName"] = this.state.jobName;
    }
    if (this.state.buildReference !== "") {
      searchData["buildReference"] = this.state.buildReference;
    }
    if (this.state.environment !== "") {
      searchData["environment"] = this.state.environment;
    }
    if (this.state.rangeStartStartDateTime) {
      searchData["rangeStartStartDateTime"] = new Date(
        this.state.rangeStartStartDateTime
      ).toISOString();
    }
    if (this.state.rangeEndStartDateTime) {
      searchData["rangeEndStartDateTime"] = new Date(
        this.state.rangeEndStartDateTime
      ).toISOString();
    }
    searchData["refresh"] = false;
    searchData["rangeFrom"] = 0;
    searchData["rangeCount"] = 5;
    this.props.getSeleniumJobsCount(searchData);
    this.props.getSoapJobsCount(searchData);
  }

  handleStartDateChange(e, date) {
    this.setState({
      rangeStartStartDateTime: e.valueOf()
    });
  }
  handleEndDateChange(e, date) {
    this.setState({
      rangeEndStartDateTime: e.valueOf()
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  advancedSearchClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  canBeSubmitted() {
    const {
      buildReference,
      environment,
      rangeStartStartDateTime,
      rangeEndStartDateTime
    } = this.state;
    return (
      buildReference.length > 0 ||
      environment.length > 0 ||
      rangeStartStartDateTime !== undefined ||
      rangeEndStartDateTime !== undefined
    );
  }

  render() {
  const custom ={
    spinner:{
      position: "absolute",
      top: "250px",
      left: "0px",
      bottom: "0px",
      right: "0px",
      zIndex: 6

      }
    }
    const isEnabled = this.canBeSubmitted();
    // console.log(isEnabled,this.state.buildReference.length,this.state.environment.length,"isEnabled")

    const { classes, rtlActive } = this.props;
    const { open } = this.state;
    const { loading } = this.state;
    const spinner = loading ? (
      <div style={custom.spinner}>
        <SpinnerComponent></SpinnerComponent>
      </div>
    ) : null

    const managerClasses = classNames({
      [classes.managerClasses]: true
    });
    const customStyle = {
      form: {
        padding: "10px"
      },
      headingColor: {
        color: "#000"
      },
      card: {
        boxShadow: "none",
        borderRadius: "0px"
      },
      advanceSeacrchBtn: {
        width: "100%",
        fontSize: "10px",
        marginBottom: "15px"
      }
    };
    return (
      <Manager className={managerClasses}>
        {spinner}
        <Target>
          <Button
            style={customStyle.advanceSeacrchBtn}
            color="success"
            aria-label="Dashboard"
            justIcon
            aria-owns={open ? "menu-list1" : null}
            aria-haspopup="true"
            onClick={this.advancedSearchClick}
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            muiClasses={{
              label: rtlActive ? classes.labelRTL : ""
            }}
          >
            <FilterList
              className={
                classes.headerLinksSvg +
                " " +
                (rtlActive
                  ? classes.links + " " + classes.linksRTL
                  : classes.links)
              }
            />
            <Hidden mdUp>
              <span
                onClick={this.advancedSearchClick}
                className={classes.linkText}
              >
                {rtlActive ? "لوحة القيادة" : "Dashboard"}
              </span>
            </Hidden>
            Advanced Search
          </Button>
        </Target>
        <Popper placement="bottom-start" eventsEnabled={open}>
          {/* <ClickAwayListener> */}
          <Grow in={open} id="menu-list1" style={{ transformOrigin: "0 0 0" }}>
            <Paper className={classes.dropdown} elevation={2}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card style={customStyle.card}>
                    <CardHeader color="success" icon>
                      <CardIcon color="success">
                        <FilterList />
                      </CardIcon>
                      <h4 style={customStyle.headingColor}>Advanced Search</h4>
                    </CardHeader>
                    <CardBody>
                      <form style={customStyle.form}>
                        <CustomInput
                          name="buildReference"
                          labelText="Build Number"
                          id="buildReference"
                          formControlProps={{
                            fullWidth: true,
                            position: "static"
                          }}
                          inputProps={{
                            onChange: this.onChange,
                            type: "text",
                            name: "buildReference"
                          }}
                          value={this.state.buildReference}
                          onChange={this.onChange}
                        />
                        <CustomInput
                          labelText="Environment"
                          id="environment"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: this.onChange,
                            type: "text",
                            name: "environment"
                          }}
                          value={this.state.environment}
                          onChange={this.onChange}
                        />

                        <br />
                        <FormControl fullWidth>
                          <Datetime
                            closeOnSelect={true}
                            inputProps={{
                              name: "rangeStartStartDateTime",
                              onChange: this.handleStartDateChange,
                              placeholder: "Start Datetime"
                            }}
                            formatDate={date =>
                              moment(date).format("YYYY-MM-DD")
                            }
                            value={this.state.rangeStartStartDateTime}
                            onChange={this.handleStartDateChange}
                          />
                        </FormControl>

                        <br />

                        <FormControl fullWidth>
                          <Datetime
                            closeOnSelect={true}
                            inputProps={{
                              name: "rangeEndStartDateTime",
                              placeholder: "End Datetime",
                              onChange: this.handleEndDateChange
                            }}
                            formatDate={date =>
                              moment(date).format("YYYY-MM-DD")
                            }
                            value={this.state.rangeEndStartDateTime}
                            onChange={this.handleEndDateChange}
                          />
                        </FormControl>
                        <br />
                        <div className={classes.center}>
                          <Button
                            color="logoBlue"
                            onClick={this.advancedSearchHandler}
                            disabled={!isEnabled}
                          >
                            Search
                          </Button>
                        </div>
                      </form>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </Paper>
          </Grow>
          {/* </ClickAwayListener> */}
        </Popper>
      </Manager>
    );
  }
}

HeaderAdvancedSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool,
  getSeleniumJobsCount: PropTypes.func.isRequired,
  getSoapJobsCount: PropTypes.func.isRequired
};

//Mapping the component to current state
function mapStateToProps({ seleniumReducer, soapReducer }) {
  return { seleniumReducer, soapReducer };
}

export default withStyles(headerLinksStyle)(
  connect(
    mapStateToProps,
    {
      getSeleniumJobsCount,
      getSoapJobsCount
    }
  )(HeaderAdvancedSearch)
);
