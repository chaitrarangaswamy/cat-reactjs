import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import Apps from "@material-ui/icons/Apps";
import Assignment from "@material-ui/icons/Assignment";
import BrightnessHigh from "@material-ui/icons/BrightnessHigh";
import BrightnessLow from "@material-ui/icons/BrightnessLow";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
// import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

import { connect } from "react-redux";
import { getSeleniumJobsCount, getSoapJobsCount } from "../../actions";
// import moment from "moment";

import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import _ from "underscore";

class DashboardJobsCount extends React.Component {
  constructor() {
    super();

    this.state = {
      seleniumCount: 0,
      soapuiCount: 0,
      jobsCount: "",
      releaseCount: ""
    };
  }

  componentDidMount() {
    this.datacalc(this.props.projectData);
  }

  componentWillReceiveProps(newProps) {
    this.datacalc(newProps.projectData);
  }

  datacalc(data) {
    if (data !== null) {
      let seleniumArray = [],
        soapuiArray = [];
      this.setState({ jobsCount: data.length });
      let release;
      _.each(data, obj => {
        if (obj.jobType === "selenium") {
          seleniumArray.push(obj.jobType);
        }
        this.setState({ seleniumCount: seleniumArray.length });

        if (obj.jobType === "soapui") {
          soapuiArray.push(obj.jobType);
        }
        this.setState({ soapuiCount: soapuiArray.length });
      });

      release = _.uniq(data, "release");
      this.setState({ releaseCount: release.length });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="logoBlue" stats icon>
                <CardIcon color="logoBlue">
                  <Assignment />
                </CardIcon>
                <p className={classes.cardCategory}>Number of releases count</p>
                <h3 className={classes.cardTitle}>{this.state.releaseCount}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  For current Date
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Apps />
                </CardIcon>
                <p className={classes.cardCategory}>Number of Jobs count</p>
                <h3 className={classes.cardTitle}>{this.state.jobsCount}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  For current Date
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  {/* <CheckCircle /> */}
                  <BrightnessHigh />
                </CardIcon>
                <p className={classes.cardCategory}>Number of Selenium jobs</p>
                <h3 className={classes.cardTitle}>
                  {this.state.seleniumCount}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  For current Date
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <BrightnessLow />
                </CardIcon>
                <p className={classes.cardCategory}>Number of SoapUI jobs</p>
                <h3 className={classes.cardTitle}>{this.state.soapuiCount}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  For current Date
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

DashboardJobsCount.propTypes = {
  classes: PropTypes.object.isRequired,
  getSeleniumJobsCount: PropTypes.func.isRequired,
  getSoapJobsCount: PropTypes.func.isRequired
};

//Mapping the component to current state
// function mapStateToProps({ seleniumReducer, soapReducer }) {
//   return { seleniumReducer, soapReducer }
// }

export default withStyles(dashboardStyle)(
  connect(
    null,
    {
      getSeleniumJobsCount,
      getSoapJobsCount
    }
  )(DashboardJobsCount)
);
