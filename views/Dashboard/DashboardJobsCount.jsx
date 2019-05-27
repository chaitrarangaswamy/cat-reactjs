import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import BugReport from "@material-ui/icons/BugReport";
import CheckCircle from "@material-ui/icons/CheckCircle";
import BrightnessHigh from "@material-ui/icons/BrightnessHigh";
import AccessTime from "@material-ui/icons/AccessTime";

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
import * as R from "ramda";
import moment from "moment";

class DashboardJobsCount extends React.Component {
  constructor() {
    super();
    this.initialobj = {
      failedCount: 0,
      passedCount: 0,
      inProgress: 0,
      numberOfJobs: 0
    };
  }

  componentWillReceiveProps(newProps) {
    // console.log(newProps,"newprops")
    if (newProps && newProps.seleniumData && newProps.soapData) {
      //will be used once saopData is available
      this.datacalc(newProps.seleniumData, newProps.soapData);
    }
  }

  datacalc(seleniumData, soapData) {
    var failedCount = 0;
    var passedCount = 0;
    var inProgress = 0;
    var numberOfJobs = 0;
    var passedArray = [];
    var failedArray = [];

    if (seleniumData !== null && soapData !== null) {
      let combinedData = R.concat(seleniumData, soapData);
      // console.log(combinedData,"combinedData")                 //will be used once saopData is available
      numberOfJobs = combinedData.length;
      _.each(combinedData, obj => {
        // console.log(obj,"obj")
        obj.passedCount
          ? passedArray.push(obj.passedCount)
          : passedArray.push(0);
        passedCount = passedArray.reduce((a, b) => a + b, 0);
        obj.failedCount
          ? failedArray.push(obj.failedCount)
          : failedArray.push(0);
        failedCount = failedArray.reduce((a, b) => a + b, 0);
        if (obj.jobStatus && obj.jobStatus === "INPROGRESS") {
          inProgress = inProgress + 1;
        }
      });

      this.initialobj = {
        failedCount: failedCount,
        passedCount: passedCount,
        inProgress: inProgress,
        numberOfJobs: numberOfJobs
      };
    } else {
      this.initialobj = {
        failedCount: failedCount,
        passedCount: passedCount,
        inProgress: inProgress,
        numberOfJobs: numberOfJobs
      };
    }
  }

  renderDateIcon(){
    if(this.props.searchDate !== "jobsearch"){
      return (
        <DateRange />
      )}
      else {
       return(
         <div>
           </div>
       )
      }
    }
  

  render() {
    const { classes } = this.props;
   
     const custom = {
      cardMargin:{
        marginBottom:"0px"
      },
      date:{
        color:"#3b3b3b"
      }

     }

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card style={custom.cardMargin}>
              <CardHeader color="logoBlue" stats icon>
                <CardIcon color="logoBlue">
                  <BrightnessHigh />
                </CardIcon>
                <p className={classes.cardCategory}>Total Number of Test Run</p>
                <h3 className={classes.cardTitle} id="numberOfJobs">
                  {this.initialobj.numberOfJobs}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {this.renderDateIcon()}
                   <strong style={custom.date}>{ this.props.searchDate !== "jobsearch" ? moment(this.props.searchDate).format("DD/MM/YYYY").toString():""}</strong>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card style={custom.cardMargin}>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <AccessTime />
                </CardIcon>
                <p className={classes.cardCategory}>
                  Number of Test Run Inprogress
                </p>
                <h3 className={classes.cardTitle} id="inProgress">
                  {this.initialobj.inProgress}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                   {this.renderDateIcon()}
                    <strong style={custom.date}>{ this.props.searchDate !== "jobsearch" ? moment(this.props.searchDate).format("DD/MM/YYYY").toString():""}</strong>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card style={custom.cardMargin}>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <CheckCircle />
                </CardIcon>
                <p className={classes.cardCategory}>
                  Number of Testcases Passed
                </p>
                <h3 className={classes.cardTitle} id="passedCount">
                  {this.initialobj.passedCount}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {this.renderDateIcon()}
                    <strong style={custom.date}>{ this.props.searchDate !== "jobsearch" ? moment(this.props.searchDate).format("DD/MM/YYYY").toString():""}</strong>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card style={custom.cardMargin}>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <BugReport />
                </CardIcon>
                <p className={classes.cardCategory}>Number Testacases Failed</p>
                <h3 className={classes.cardTitle} id="failedCount">
                  {this.initialobj.failedCount}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  {this.renderDateIcon()}
                   <strong style={custom.date}>{ this.props.searchDate !== "jobsearch" ? moment(this.props.searchDate).format("DD/MM/YYYY").toString():""}</strong>
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
function mapStateToProps({ seleniumReducer, soapReducer }) {
  return { searchDate : seleniumReducer.searchDate }
}

export default withStyles(dashboardStyle)(
  connect(
    mapStateToProps,
    {
      getSeleniumJobsCount,
      getSoapJobsCount
       }
  )(DashboardJobsCount)
);
