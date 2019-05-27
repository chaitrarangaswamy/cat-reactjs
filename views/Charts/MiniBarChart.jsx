import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Assessment from "@material-ui/icons/Assessment";

// core components
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import GridItem from "../../components/Grid/GridItem";

import chartsStyle from "../../assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";

class MiniBarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      delays2: 80,
      durations2: 500
    };
  }
  render() {
    const { classes } = this.props;
    const { delays2, durations2 } = this.state;
    let item = this.props.item;

    const multipleBarsChart = {
      data: {
        labels: ["Pass", "Fail", "Skip"],
        series: [item]
      },
      options: {
        seriesBarDistance: 5,
        horizontalBars: true,
        axisX: {
          showGrid: false
        },
        height: "220px"
      },
      responsiveOptions: [
        [
          "screen and (max-width: 640px)",
          {
            seriesBarDistance: 2,
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
                begin: (data.index + 1) * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: "ease"
              }
            });
          }
        }
      }
    };

    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning" icon>
            <CardIcon color="warning">
              <Assessment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>
              TEST CASE RESULTS
              <small />
            </h4>
          </CardHeader>
          <CardBody>
            <ChartistGraph
              data={multipleBarsChart.data}
              type="Bar"
              options={multipleBarsChart.options}
              listener={multipleBarsChart.animation}
              className="custom-mini-bargraph-style"
            />
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(chartsStyle)(MiniBarChart);
