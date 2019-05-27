import React from "react";

// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";

//components
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

//style
import chartsStyle from "../../assets/jss/material-dashboard-pro-react/views/chartsStyle";

class PieChart extends React.Component {
  constructor() {
    super();
    this.totalSearchData = [];
    this.finalSeleniumSearchData = [];
    this.finalSoapuiSearchData = [];
  }

  componentWillReceiveProps(newProps) {
    if (newProps.seleniumData !== null && newProps.soapData !== null) {
      this.renderData(
        newProps.seleniumData,
        newProps.soapData,
        newProps.projectData
      );
      this.total();
      this.seleniumPercent();
      this.soapPercent();
    }
  }

  //imports selenium and soap data into arrays
  renderData(seleniumData, soapData, projectData) {
    this.finalSeleniumSearchData = [];
    this.finalSoapuiSearchData = [];
    //let temp = [];
    if (projectData.length > 0) {
      projectData.map(data => {
        if (data.jobType === "selenium") {
          return (this.finalSeleniumSearchData = [
            ...this.finalSeleniumSearchData,
            data
          ]);
        } else if (data.jobType === "soapui") {
          return (this.finalSoapuiSearchData = [
            ...this.finalSoapuiSearchData,
            data
          ]);
        }
        return null;
      });
    } else {
      // if (seleniumData.length > 0) {
      //   seleniumData.map(seleniumdata => {
      //     //temp = this.finalSeleniumSearchData;
      //     return (this.finalSeleniumSearchData = [
      //       ...this.finalSeleniumSearchData,
      //       seleniumdata
      //     ]);
      //   });
      // } else {
      //   this.finalSeleniumSearchData = [...this.finalSeleniumSearchData];
      // }
      // if (soapData.length > 0) {
      //   soapData.map(soapuiData => {
      //     return (this.finalSoapuiSearchData = [
      //       ...this.finalSoapuiSearchData,
      //       soapuiData
      //     ]);
      //   });
      // } else {
      //   this.finalSoapuiSearchData = [...this.finalSoapuiSearchData];
      // }
    }
  }

  //calc total number of selenium and soap tests
  total() {
    this.totalSearchData =
      this.finalSeleniumSearchData.length + this.finalSoapuiSearchData.length;
  }

  //calc percentage of selenium tests
  seleniumPercent() {
    if (this.finalSeleniumSearchData.length !== null) {
      this.finalSeleniumSearchData = Math.round(
        (this.finalSeleniumSearchData.length / this.totalSearchData) * 100
      );
    } else {
      this.finalSeleniumSearchData = 0;
    }
  }

  //calc percentage of soap tests
  soapPercent() {
    if (this.finalSoapuiSearchData.length !== null) {
      this.finalSoapuiSearchData = Math.round(
        (this.finalSoapuiSearchData.length / this.totalSearchData) * 100
      );
    } else {
      this.finalSoapuiSearchData = 0;
    }
  }

  render() {
    const { classes } = this.props;
    const chartSeries = [
      this.finalSeleniumSearchData,
      this.finalSoapuiSearchData
    ];
    const chartlabel = [
      this.finalSeleniumSearchData + "%",
      this.finalSoapuiSearchData + "%"
    ];
    const pieChart = {
      data: {
        labels: chartlabel,
        series: chartSeries
      },
      options: {
        height: "230px"
      }
    };
    return (
      <Card>
        <CardHeader color="logoBlue" icon>
          <CardIcon color="logoBlue">
            <Timeline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>
            Total Selenium and Soap Jobs count
          </h4>
        </CardHeader>
        <CardBody>
          <ChartistGraph
            data={pieChart.data}
            type="Pie"
            options={pieChart.options}
            className="custom-piechart-style"
          />
        </CardBody>
        <CardFooter stats className={classes.cardFooter}>
          <h6 className={classes.legendTitle}>Legend</h6>
          <i className={"fas fa-circle " + classes.logoYellow} /> Selenium
          {` `}
          <i className={"fas fa-circle " + classes.logoBlue} /> SoapUI
          {` `}
        </CardFooter>
      </Card>
    );
  }
}

export default withStyles(chartsStyle)(PieChart);
