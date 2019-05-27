import React from "react";
import propTypes from "prop-types";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
// import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Refresh from "@material-ui/icons/Refresh";
// import Edit from "@material-ui/icons/Edit";
// import Place from "@material-ui/icons/Place";
// import ArtTrack from "@material-ui/icons/ArtTrack";
// import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";

// import Card from "../../components/Card/Card";

import ReactTables from "../Tables/ReactTables";

import { connect } from "react-redux";
import { getSeleniumJobsCount, getSoapJobsCount } from "../../actions";

import BarChart from "../Charts/BarCharts";
import PieChart from "../Charts/PieChart";
import moment from "moment";
import DashboardJobsCount from "./DashboardJobsCount";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "../../variables/charts";

import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import SpinnerComponent from "../spinner/spinner.jsx";
import ErrorComponent from "../Errorcomponent/Errorcomponent";
import Button from "../../components/CustomButtons/Button";

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

		this.endDate = moment();
		this.endDate.set({ hour: 23, minute: 59, second: 0, millisecond: 0 });
		this.endDate.toISOString();
		this.endDate.format();

		this.state = {
			startDate: this.startDate,
			endDate: this.endDate,
			searchValue: true
		}
		this.loadPreviousDateValue = this.loadPreviousDateValue.bind(this)
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};
	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	apiCall() {
		const { startDate, endDate } = this.state;
		const searchData = {};
		searchData["refresh"] = "false";
		searchData["rangeFrom"] = 0;
		// searchData["rangeCount"] = "*";
		searchData["rangeStartStartDateTime"] = startDate;
		searchData["rangeEndStartDateTime"] = endDate;

		this.props.getSeleniumJobsCount(searchData);
		this.props.getSoapJobsCount(searchData);
	}

	componentDidMount() {
		this.setState({ loading: true });
		this.apiCall()
	}

	componentWillReceiveProps(newProps) {
		if (newProps.seleniumReducerSearch === "jobsearch" || newProps.soapReducerSearch === "jobsearch") {
			this.setState({ searchValue: false });
		} else {
			this.setState({ searchValue: true });
		}
	}

	loadPreviousDateValue() {
		const { startDate, endDate } = this.state
		var substartDate, subendDate
		substartDate = startDate.subtract(1, "days");
		substartDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
		substartDate.toISOString();
		substartDate.format();

		subendDate = endDate.subtract(1, "days");
		subendDate.set({ hour: 23, minute: 59, second: 0, millisecond: 0 });
		subendDate.toISOString();
		subendDate.format();
		this.setState({ startDate: substartDate, endDate: subendDate }, () => {
			this.apiCall()
		})

	}

	render() {
		const loadMoreCheck = this.state.searchValue;
		const custom = {
			margin: {
				marginTop: "40px"
			},
			btnfloat: {
				float: "right"
			}
		}
		const serverAlert = (
			<div>
				<ErrorComponent />
			</div>
		);

		const dashboardComponents = (
			<div style={custom.margin}>
				<GridContainer>
					<GridItem xs={12}>
						<DashboardJobsCount
							seleniumData={this.props.seleniumReducer}
							soapData={this.props.soapReducer}
						/>
					</GridItem>
				</GridContainer>
				<GridContainer className="custom-style-responsive-barchart">
					<GridItem xs={12}>
						<BarChart

						/>
					</GridItem>
				</GridContainer>
				<GridContainer>
					<GridItem xs={12}>
						<PieChart
							seleniumData={this.props.seleniumReducer}
							soapData={this.props.soapReducer}
						/>
					</GridItem>
				</GridContainer>
				<GridContainer>
					<GridItem xs={12}>
						<ReactTables
							seleniumData={this.props.seleniumReducer}
							soapData={this.props.soapReducer}
						/>
					</GridItem>
				</GridContainer>
				<GridContainer>
					<GridItem xs={10}>
					</GridItem>
					<GridItem xs={2}>
						{(loadMoreCheck === true) ? <div style={custom.btnfloat}>
							<Button
								color="logoBlue"
								onClick={this.loadPreviousDateValue}
							>
								load previous  data
              				</Button>
						</div> : ""}

					</GridItem>
				</GridContainer>
			</div>
		);



		return (
			<div>
				{this.props.errorMsgs.crosError ? serverAlert : ''}
				{this.props.seleniumApiLoading && this.props.soapApiLoading ?
					<SpinnerComponent /> :
					dashboardComponents}
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: propTypes.object.isRequired,
	getSeleniumJobsCount: propTypes.func.isRequired,
	getSoapJobsCount: propTypes.func.isRequired,
	seleniumReducer: propTypes.array.isRequired,
	soapReducer: propTypes.array.isRequired,
	auth: propTypes.object.isRequired,
	errorMsgs: propTypes.object.isRequired,
};

//Mapping the component to current state
function mapStateToProps({ seleniumReducer, soapReducer, errorMsgs, auth }) {
	return {
		seleniumReducer: seleniumReducer.seleniumResults,
		seleniumReducerSearch: seleniumReducer.searchDate,
		seleniumApiLoading: seleniumReducer.loading,
		soapReducer: soapReducer.soapResults,
		soapReducerSearch: soapReducer.searchDate,
		soapApiLoading: soapReducer.loading,
		auth,
		errorMsgs
	};
}

export default withStyles(dashboardStyle)(
	connect(
		mapStateToProps,
		{
			getSeleniumJobsCount,
			getSoapJobsCount
		}
	)(Dashboard)
);
