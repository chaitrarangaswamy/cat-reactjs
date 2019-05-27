import React, { Component } from "react";
import propTypes from "prop-types";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
import * as R from "ramda";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Assessment from "@material-ui/icons/Assessment";

import { connect } from "react-redux";
// core components
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import chartsStyle from "../../assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";

import Button from "../../components/CustomButtons/Button";

class BarChart extends Component {
  constructor() {
    super();
    this.state = {
      arrayChunk: [],
      counter: 0,
      disablePrevious: false,
      disableNext:false
    };
    this.completeArray = [];
    this.nextList = this.nextList.bind(this);
    this.previousList = this.previousList.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const combinedData = R.concat(
      newProps.soapReducer,
      newProps.seleniumReducer
    );
    const slicedArray = this.slicing(combinedData);
    this.completeArray = [...slicedArray];
    this.completeArray.length > 0
      ? this.setState({
          arrayChunk: [...this.state.arrayChunk, ...this.completeArray[0]]
        })
      : this.setState({
          arrayChunk: [...this.state.arrayChunk, ...this.completeArray]
        });
  }

  /*
   The following function, slices the combinedData into chunks of 10 and returns an array which contains an array of arrays
   with each array size equalling to or less than 10.*/

  slicing = combinedData => {
    const sliceSize = 10;
    let arrayToReturn = [];
    for (let i = 0; i < combinedData.length; i += sliceSize) {
      arrayToReturn.push(combinedData.slice(i, i + sliceSize));
    }
    return arrayToReturn;
  };

  //handles, click on next button by displaying the appropriate bar charts
  nextList = () => {
    this.setState({disablePrevious:false})
    if (this.state.counter === this.completeArray.length - 1) {
      this.setState({
        arrayChunk: [...this.completeArray[this.state.counter]],disableNext:true
      });
    } else {
      this.setState({ counter: this.state.counter + 1 }, () => {
        this.setState({
          arrayChunk: [...this.completeArray[this.state.counter]]
        });
      });
    }
  };

  //handels, click on previous button by displaying the appropriate data on the bar charts
  previousList = () => {
    this.setState({disableNext:false})
    if (this.state.counter === 0) {
      this.setState({
        arrayChunk: [...this.completeArray[this.state.counter]],disablePrevious:true
      });
      this.chunkArray = [...this.completeArray[this.state.counter]];
    } else {
      this.setState({ counter: this.state.counter - 1 }, () => {
        this.setState({
          arrayChunk: [...this.completeArray[this.state.counter]]
        });
      });
    }
  };

  render() {
    let jobName = [],
      label = [],
      buildReference = [],
      valuePassed = [],
      failedCount = [];
    const { classes } = this.props;
    const { arrayChunk } = this.state;

    arrayChunk.map(data => {
      return (
        (jobName = [...jobName, data.jobName]),
        (label = [...label, data.jobName + " : " + data.buildReference]),
        (buildReference = [...buildReference, data.buildReference]),
        (valuePassed = [...valuePassed, data.passedCount]),
        (failedCount = [...failedCount, data.failedCount])
      );
    });
    const multipleBarsChart = {
      data: {
        labels: label,
        series: [failedCount, valuePassed]
      },
      options: {
        seriesBarDistance: 10,
        axisX: {
          showLabel: true,
          showGrid: false,
          labelInterpolationFnc: function(value) {
            return '<span title="' + value + '">' + value + "</span>";
          }
        },
        height: "400",
        reverseData: true,
        // horizontalBars: true,
        axisY: {
          onlyInteger: true,
          offset: 100
        }
      },
      responsiveOptions: [
        [
          "screen and (max-width: 640px)",
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function(value) {
                return value[0];
              }
            }
          }
        ]
      ],
      animation: {
        draw: function(data) {
          if (data.type === "bar") {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * 80,
                dur: 500,
                from: 0,
                to: 1,
                easing: "ease"
              }
            });
          }
        }
      }
    };

    const custom = {
      Legend: {
        float: "left"
      },
      btnfloat: {
        float: "right"
      },
      acrossBtn: {
        // padding:"8px",
        margin: "20px"
      },
      cardMargin:{
        marginBottom:"0px"
      }
    };

    const displayButtons = (
      <CardFooter stats className={classes.cardFooter}>
        <div style={custom.btnfloat}>
          <Button
            color="logoBlue"
            onClick={this.previousList}
            style={custom.acrossBtn}
            disabled={this.state.disablePrevious}
          >
            previous
          </Button>
          <Button
            color="logoBlue"
            onClick={this.nextList}
            style={custom.acrossBtn}
            disabled={this.state.disableNext}
          >
            next
          </Button>
        </div>
        <div style={custom.Legend}>
          <h6 className={classes.legendTitle}>Legend</h6>
          <i className={"fas fa-circle " + classes.danger} /> Fail
          {` `}
          <i className={"fas fa-circle " + classes.success} /> Pass
          {` `}
        </div>
      </CardFooter>
    );

    return (
      <Card style={custom.cardMargin}>
        <CardHeader color="logoBlue" icon>
          <CardIcon color="logoBlue">
            <Assessment />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>
            TEST RUN <small />
          </h4>
        </CardHeader>
        <CardBody>
          <ChartistGraph
            data={multipleBarsChart.data}
            type="Bar"
            options={multipleBarsChart.options}
            listener={multipleBarsChart.animation}
            className="custom-barchart-style"
          />
        </CardBody>
        {this.completeArray.length > 0 ? displayButtons : <div />}
      </Card>
    );
  }
}

BarChart.propTypes = {
  seleniumReducer: propTypes.array.isRequired,
  soapReducer: propTypes.array.isRequired
};

function mapStateToProps({ seleniumReducer, soapReducer }) {
  return {
    seleniumReducer: seleniumReducer.seleniumResults,
    seleniumApiLoading: seleniumReducer.loading,
    soapReducer: soapReducer.soapResults,
    soapApiLoading: soapReducer.loading
  };
}

export default withStyles(chartsStyle)(connect(mapStateToProps)(BarChart));
