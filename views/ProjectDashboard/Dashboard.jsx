import React from "react";
import propTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import ProjectTables from "../Tables/ProjectTables ";

import { connect } from "react-redux";
import { searchProjectRelease } from "../../actions";

import BarChart from "../Charts/projectBarCharts";
import PieChart from "../Charts/projectPieChart";
import moment from "moment";
import HeaderSectionCount from "./HeaderSection";

import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import SpinnerComponent from "../spinner/spinner.jsx";
import ErrorComponent from "../Errorcomponent/Errorcomponent";
import ProjectDashboardNoData from "./ProjectDashboardNoData";

class Dashboard extends React.Component {
  state = {
    value: 0,
    loading: false
  };

  constructor() {
    super();
    this.startDate = moment();
    this.startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    this.startDate.toISOString();
    this.startDate.format();
    //  console.log(this.startDate,"m")
    this.endDate = moment();
    this.endDate.set({ hour: 23, minute: 59, second: 0, millisecond: 0 });
    this.endDate.toISOString();
    this.endDate.format();
    // console.log(this.endDate,"this.n")
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount() {
    this.setState({ loading: true });
    const searchData = {};

    searchData["rangeStartStartDateTime"] = this.startDate;
    searchData["rangeEndStartDateTime"] = this.endDate;
    this.props.searchProjectRelease(searchData);
  }

  render() {
    const serverAlert = (
      <div>
        <ErrorComponent />
      </div>
    );

    const dashboardComponents = (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <HeaderSectionCount
              projectData={this.props.searchProjectReleaseReducer}
            />
          </GridItem>
        </GridContainer>
        <GridContainer className="custom-style-responsive-barchart">
          <GridItem xs={12}>
            <BarChart projectData={this.props.searchProjectReleaseReducer} />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12}>
            <PieChart projectData={this.props.searchProjectReleaseReducer} />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12}>
            <ProjectTables
              projectData={this.props.searchProjectReleaseReducer}
            />
          </GridItem>
        </GridContainer>
      </div>
    );

    return (
      <div>
        {this.props.errorMsgs.crosError ? serverAlert : ""}
        {this.props.seleniumApiLoading && this.props.soapApiLoading ? (
          <SpinnerComponent />
        ) : (
          dashboardComponents
        )}
        {this.props.searchProjectReleaseReducer.length === 0 ? (
          <ProjectDashboardNoData />
        ) : (
          ""
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  errorMsgs: propTypes.object.isRequired,
  searchProjectRelease: propTypes.func.isRequired,
  searchProjectReleaseReducer: propTypes.array.isRequired
};

//Mapping the component to current state
function mapStateToProps({ errorMsgs, auth, searchProjectReleaseReducer }) {
  return {
    auth,
    errorMsgs,
    searchProjectReleaseReducer:
      searchProjectReleaseReducer.projectReleaseSearch
  };
}

export default withStyles(dashboardStyle)(
  connect(
    mapStateToProps,
    {
      searchProjectRelease
    }
  )(Dashboard)
);
