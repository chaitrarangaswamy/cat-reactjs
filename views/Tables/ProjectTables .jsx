import React from "react";
import { Link } from "react-router-dom";
// react component for creating dynamic tables
import ReactTable from "react-table";
import "react-table/react-table.css";
import * as R from "ramda";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
// import Dvr from "@material-ui/icons/Dvr";
// import Assessment from "@material-ui/icons/Assessment";
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
// import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardIcon from "../../components/Card/CardIcon";
import CardHeader from "../../components/Card/CardHeader";

import Popover from "@material-ui/core/Popover";
// import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import {
	getSeleniumJobsCount,
	getSoapJobsCount,
	searchProjectRelease
} from "../../actions";

import { cardTitle } from "../../assets/jss/material-dashboard-pro-react";

import MiniBarChart from "../Charts/MiniBarChart";
import Tooltip from "react-tooltip-lite";
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
	}
});
const customStyle = {
	logoBlue: {
		color: "#02569B"
	}
};

class ProjectTables extends React.Component {
	state = {
		anchorEl: null,
		testCaseResult: null,
		dataArray: []
	};

	handleClick = event => {
		this.setState({
			anchorEl: event.currentTarget
		});
	};

	handlePopoverOpen = (event, data) => {
		this.setState({ anchorEl: event.target, testCaseResult: data });
	};

	handlePopoverClose = () => {
		this.setState({ anchorEl: null });
	};
	renderContent(selenium, soap) {
		if (selenium && soap !== null) {
			const combinedData = R.concat(selenium, soap);
			let dataArray = combinedData.map((prop, key) => {
				let testcaseResultData = [];
				testcaseResultData.push(
					prop.passedCount,
					prop.failedCount,
					prop.notRunCount
				);
				return {
					id: key,
					name: prop.jobName,
					env: prop.environment,
					build: prop.buildReference,
					jobType: prop.jobType,
					trigger: prop.triggeredBy ? prop.triggeredBy.userName : null,
					start: this.formatDate(prop.startDateTime),
					end: this.formatDate(prop.endDateTime),
					status: prop.jobStatus,
					totalcount: prop.allCount,
					passcount: prop.passedCount,
					failcount: prop.failedCount,
					skip: prop.notRunCount,
					actions: (
						<div className="actions-left">
							<Link
								style={customStyle.logoBlue}
								to={
									"/builddetails/" +
									prop.jobName +
									"/" +
									prop.buildReference +
									"/" +
									prop.jobType
								}
							>
								{prop.buildReference}
							</Link>
						</div>
					)
				};
			});
			this.setState({ dataArray: dataArray });
		} else {
			return null;
		}
	}
	renderProjectContent(data) {
		if (data !== null) {
			// const combinedData = R.concat(selenium, soap);
			let dataArray = data.map((prop, key) => {
				let testcaseResultData = [];
				testcaseResultData.push(
					prop.passedCount,
					prop.failedCount,
					prop.notRunCount
				);
				return {
					id: key,
					projectName: prop.projectName,
					release: prop.release,
					name: prop.jobName,
					env: prop.environment,
					build: prop.buildReference,
					jobType: prop.jobType,
					trigger: prop.triggeredBy ? prop.triggeredBy.userName : null,
					start: this.formatDate(prop.startDateTime),
					end: this.formatDate(prop.endDateTime),
					status: prop.jobStatus,
					totalcount: prop.allCount,
					passcount: prop.passedCount,
					failcount: prop.failedCount,
					skip: prop.notRunCount,
					actions: (
						<div className="actions-left">
							<Link
								style={customStyle.logoBlue}
								to={
									"/builddetails/" +
									prop.jobName +
									"/" +
									prop.buildReference +
									"/" +
									prop.jobType
								}
							>
								{prop.buildReference}
							</Link>
						</div>
					)
				};
			});
			this.setState({ dataArray: dataArray });
		} else {
			return null;
		}
	}

	formatDate = date => {
		if (date && date.length > 18) {
			const formattedDate = new Date(date).toISOString();
			return moment(formattedDate).format("lll");
		} else {
			return "";
		}
	};

	componentWillReceiveProps(newProps) {
		if (newProps.projectData !== null && newProps.projectData.length > 0) {
			this.renderProjectContent(newProps.projectData);
		} else if (newProps.seleniumData !== null || newProps.soapData !== null) {
			this.renderContent(newProps.seleniumData, newProps.soapData);
		}
	}

	render() {
		const { classes } = this.props;
		const { anchorEl, dataArray } = this.state;
		const open = Boolean(anchorEl);
		return (
			<GridContainer>
				<GridItem xs={12}>
					<Card>
						<CardHeader color="logoBlue" icon>
							<CardIcon color="logoBlue">
								<Assignment />
							</CardIcon>
							<h4 className={classes.cardIconTitle}>UI Testing/API Testing</h4>
						</CardHeader>
						<CardBody>
							<ReactTable
								columns={[
									{
										Header: "Project Name",
										accessor: "projectName",
										sortable: true
									},
									{
										Header: "Release",
										accessor: "release"
									},
									{
										Header: "JobName",
										accessor: "name",
										sortable: true,
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
										Header: "Build#",
										accessor: "actions",
										sortable: true
									},
									{
										Header: "Env",
										accessor: "env",
										sortable: true,
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
										Header: "JobType",
										accessor: "jobType"
									}
								]}
								data={dataArray}
								showPaginationTop
								showPaginationBottom={false}
								filterable
								defaultPageSize={10}
								className="-striped -highlight"
							/>
							<Popover
								anchorReference="anchorPosition"
								anchorPosition={{ top: 200, left: 800 }}
								className={classes.popover}
								classes={{
									paper: classes.paper
								}}
								open={open}
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "left"
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "left"
								}}
								onClose={this.handlePopoverClose}
								disableRestoreFocus
							>
								<MiniBarChart item={this.state.testCaseResult} />
							</Popover>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		);
	}
}

//export default withStyles(styles)(ReactTables);

export default withStyles(styles)(
	connect(
		null,
		{
			getSeleniumJobsCount,
			getSoapJobsCount,
			searchProjectRelease
		}
	)(ProjectTables)
);
