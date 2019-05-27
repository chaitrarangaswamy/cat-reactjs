import React, { Component } from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import "react-table/react-table.css";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";

import { cardTitle } from "../../../assets/jss/material-dashboard-pro-react";

const styles = theme => ({
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing.unit
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class SoapTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkData: true,
      parentcheck: false
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck = (e, checked) => {
    const trigger = {};
    if (this.props.jobName === e.target.name) {
      let trigger = [];
      let checkedData = JSON.parse(e.target.value);
      if (checked) {
        if (checkedData.length > 1) {
          this.setState({ parentcheck: true });
        } else {
          this.setState({ parentcheck: false });
        }
        checkedData.map(eachParams => {
          let triggerobj = {};
          triggerobj["projectName"] = this.props.jobName;
          triggerobj["testSuite"] = eachParams.testSuite;
          triggerobj["metatags"] = JSON.stringify(eachParams.metatags);
          trigger.push(triggerobj);
          return this.props.triggerDetails(trigger);
        });
      } else {
        this.setState({ parentcheck: false });
        checkedData.map(eachParams => {
          let triggerobj = {};
          triggerobj["testSuite"] = eachParams.testSuite;
          triggerobj["projectName"] = this.props.jobName;
          trigger.push(triggerobj);
          return this.props.triggerDetails(trigger);
        });
      }
    } else {
      if (checked) {
        trigger["projectName"] = this.props.jobName;
        trigger["testSuite"] = e.target.name;
        trigger["metatags"] = [e.target.value];
        this.props.triggerDetails(trigger);
      } else {
        trigger["testSuite"] = e.target.name;
        trigger["projectName"] = this.props.jobName;
        this.props.triggerDetails(trigger);
      }
    }
  };

  renderContent(jobName, values) {
    return R.map(eachParameter => {
      return (
        <TableRow key={eachParameter.testSuite}>
          <TableCell component="th" scope="row">
            {this.state.parentcheck === true ? (
              <Checkbox
                name={eachParameter.testSuite}
                value={JSON.stringify(eachParameter.metatags)}
                onChange={this.handleCheck}
                checked={this.state.checkData}
              />
            ) : (
              ""
            )}
            {this.state.parentcheck === false ? (
              <Checkbox
                name={eachParameter.testSuite}
                value={JSON.stringify(eachParameter.metatags)}
                onChange={this.handleCheck}
              />
            ) : (
              ""
            )}
          </TableCell>
          <TableCell component="th" scope="row">
            {jobName}
          </TableCell>
          <TableCell component="th" scope="row">
            {eachParameter.testSuite}
          </TableCell>
          <TableCell component="th" scope="row">
            {eachParameter.metatags}
          </TableCell>
        </TableRow>
      );
    }, values);
  }

  render() {
    const { classes, jobName, value } = this.props;
    const custom = {
         cardMargin:{
        marginBottom:"0px"
      }
     }
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12}>
            <Card style={custom.cardMargin}>
              <CardBody>
                <GridItem xs={12} sm={12} md={12}>
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Checkbox
                              name={jobName}
                              value={JSON.stringify(value)}
                              onChange={this.handleCheck}
                              checked={this.state.parentcheck}
                            />
                          </TableCell>
                          <TableCell>Job Name</TableCell>
                          <TableCell>Test Suite(s)</TableCell>
                          <TableCell>Metatag(s)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.renderContent(jobName, value)}
                      </TableBody>
                    </Table>
                  </Paper>
                </GridItem>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(connect(null)(SoapTable));
