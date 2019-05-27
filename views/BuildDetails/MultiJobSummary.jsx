import React from "react";
import { Link } from "react-router-dom";

// react component for creating dynamic tables
import ReactTable from "react-table";
import Tooltip from "react-tooltip-lite";
import moment from "moment";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardIcon from "../../components/Card/CardIcon";
import {
  cardTitle,
  roseColor
} from "../../assets/jss/material-dashboard-pro-react.jsx";

import MultiJobDetails from "./MultiJobDetails";
import LineChart from "../Charts/LineChart";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  chip: {
    margin: theme.spacing.unit
  },
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0"
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem"
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px"
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    }
  },
  iconRose: {
    color: roseColor
  },
  marginTop30: {
    marginTop: "30px"
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px"
    }
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999"
  },
  h4: {
    color: "#000000"
  }
});

class MultiJobSummary extends React.Component {
  constructor() {
    super();
    this.dataArray = [];
    this.jobType = "";
    this.state = {
      open: false,
      renderMultiJobLineGraph: null,
      renderMultiJobDetailArray: null,
      testCollectionName: ""
    };
  }

  componentDidMount() {
    const testSuite = this.props.item;
	this.setState({ testCollectionName: testSuite.testCollectionName });
    this.jobType = this.checkType(window.location.href);	
    this.setState({ renderMultiJobLineGraph: this.getLineGraphs(testSuite) });
    this.setState({ renderMultiJobDetailArray: this.getJobDetail(testSuite) });
    this.dataArray = this.getDataArray(testSuite, this.jobType);
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  //Creates Line Graph component for each job
  getLineGraphs(testSuite) {
    let renderMultiJobLineGraph = testSuite.map((prop, index) => {
      if (
        prop !== null &&
        prop.testcaseDetails !== null &&
        prop !== undefined
      ) {
        return <LineChart key={index} item={prop} type={this.jobType}/>;
      } else {
        return null;
      }
    });
    return renderMultiJobLineGraph;
  }

  //Determines if jobType is Selenium or SoapUI
  checkType(Url) {
    let jobType;
    if (Url !== null && Url !== "") {
      if (Url.includes("Selenium")) {
        jobType = "Selenium";
      } else {
        jobType = "SoapUI";
      }
    }
    return jobType;
  }

  //Creates array of job details to render at the bottom of page
  getJobDetail(testSuite) {
    let renderMultiJobDetailArray = <MultiJobDetails item={testSuite} />;
    return renderMultiJobDetailArray;
  }

  //Returns the data for all of the rows in the reactTable
  getDataArray(testSuite, jobType) {
    let dataArray;
    if (testSuite !== null) {
      if (testSuite.length > 0) {
        dataArray = testSuite.map((data, key) => {
          if (data !== null) {
            return this.getRowDetails(data, key, jobType);
          } else {
            return "null";
          }
        });
      }
    }
    return dataArray;
  }

  //Returns the data for each row in the reactTable
  getRowDetails = (data, key, jobType) => {
    const customStyle = {
      logoBlue: {
        color: "#02569B"
      }
    };
    return {
      id: key,
      name: data.jobDetails.jobName ? data.jobDetails.jobName : null,
      env: data.jobDetails.environment,
      build: data.jobDetails.buildReference,
      jobType: jobType,
      trigger: data.jobDetails.triggeredBy
        ? data.jobDetails.triggeredBy.userName
        : null,
      start: this.formatDate(data.jobDetails.startDateTime),
      end: this.formatDate(data.jobDetails.endDateTime),
      status: data.jobDetails.jobStatus,
      actions: (
        <div className="actions-center">
          <Link
            style={customStyle.logoBlue}
            to={
              "/builddetails/" +
              data.jobDetails.jobName +
              "/" +
              data.jobDetails.buildReference +
              "/" +
              jobType
            }
          >
            <Dvr />
          </Link>
        </div>
      )
    };
  };

  formatDate = date => {
    if (date && date.length > 18) {
      const formattedDate = new Date(date).toISOString();
      return moment(formattedDate).format("lll");
    } else {
      return "";
    }
  };

  render() {
    const { classes } = this.props;
    const { renderMultiJobLineGraph, renderMultiJobDetailArray } = this.state;
    const parentJobName = this.props.parentJobName;
    const custom = {
      cardMargin:{
        marginBottom:"0px"
      }
     }
    return (
      <React.Fragment>
        <GridItem xs={12}>{renderMultiJobLineGraph}</GridItem>
        <GridItem xs={12}>
          <Card style={custom.cardMargin}>
            <CardHeader color="logoBlue" icon>
              <CardIcon color="logoBlue">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>{parentJobName}</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                columns={[
                  {
                    Header: "Job Name",
                    accessor: "name",
                    Cell: row => {
                      return (
                        <Tooltip content={<div>{row.original.name}</div>}>
                          <div>{row.original.name}</div>
                        </Tooltip>
                      );
                    },
                    style: { whiteSpace: "unset" }
                  },
                  {
                    Header: "Environment",
                    accessor: "env",
                    Cell: row => {
                      return (
                        <Tooltip content={<div>{row.original.env}</div>}>
                          <div>{row.original.env}</div>
                        </Tooltip>
                      );
                    },
                    style: { whiteSpace: "unset" }
                  },
                  {
                    Header: "Build #",
                    accessor: "build"
                  },
                  {
                    Header: "Job Type",
                    accessor: "jobType"
                  },
                  {
                    Header: "Triggered By",
                    accessor: "trigger"
                  },
                  {
                    Header: "Start Date",
                    accessor: "start",
                    Cell: row => {
                      return (
                        <Tooltip content={<div>{row.original.start}</div>}>
                          <div>{row.original.start}</div>
                        </Tooltip>
                      );
                    },
                    style: { whiteSpace: "unset" }
                  },
                  {
                    Header: "End Date",
                    accessor: "end",
                    Cell: row => {
                      return (
                        <Tooltip content={<div>{row.original.end}</div>}>
                          <div>{row.original.end}</div>
                        </Tooltip>
                      );
                    },
                    style: { whiteSpace: "unset" }
                  },
                  {
                    Header: "Status",
                    accessor: "status"
                  },
                  {
                    Header: "Action",
                    accessor: "actions",
                    maxWidth: 58,
                    sortable: false,
                    filterable: false
                  }
                ]}
                data={this.dataArray}
                showPaginationTop
                showPaginationBottom={false}
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12}>{renderMultiJobDetailArray}</GridItem>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MultiJobSummary);
