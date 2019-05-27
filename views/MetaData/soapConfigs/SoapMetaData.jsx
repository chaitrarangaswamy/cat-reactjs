import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import "react-table/react-table.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomButtons from "../../../components/CustomButtons/Button";

import { cardTitle } from "../../../assets/jss/material-dashboard-pro-react";
import {
	soapJenkinsJobCheck,
	soapMetaTrigger
} from "../../../actions/metaDataActions";
import SoapTable from "./SoapTable";
import SpinnerComponent from "../../spinner/spinner";
import SoapTriggerResponse from "./SoapTriggerResponse";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Delete from "@material-ui/icons/Delete";

const styles = theme => ({
	popover: {
		pointerEvents: "none"
	},
	paper: {
		position: "absolute",
		width: "auto",
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
	},
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3,
		overflowX: "auto"
	},
	table: {
		minWidth: 700
	},
	button: {
		margin: theme.spacing.unit
	},
	cardIconTitle: {
		...cardTitle,
		marginTop: "15px",
		marginBottom: "0px"
	},
	input: {
		display: "flex",
		padding: 0
	},
	noOptionsMessage: {
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
	},
	singleValue: {
		fontSize: 16
	},
	placeholder: {
		position: "relative",
		left: 2,
		fontSize: 16
	},
	divider: {
		height: theme.spacing.unit * 2
	},
	textField: {
		width: "100%"
	}
});

function inputComponent({ inputRef, ...props }) {
	return <div ref={inputRef} {...props} />;
}

function Control(props) {
	return (
		<TextField
			fullWidth
			InputProps={{
				inputComponent,
				inputProps: {
					className: props.selectProps.classes.input,
					inputRef: props.innerRef,
					children: props.children,
					...props.innerProps
				}
			}}
			{...props.selectProps.textFieldProps}
		/>
	);
}

function Option(props) {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component="div"
			style={{
				fontWeight: props.isSelected ? 500 : 400
			}}
			{...props.innerProps}
		>
			{props.children}
		</MenuItem>
	);
}

const components = {
	Option,
	Control
};

class SoapMetaData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			checkedData: [],
			selectedEnv: {}
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleJobTrigger = this.handleJobTrigger.bind(this);
		this.onChangeEnv = this.onChangeEnv.bind(this);
	}

	getEnvParams = envlist => {
		let envArray = [];
		if (envlist) {
			R.forEach(item => {
				envArray.push({ label: item });
			}, envlist.value);
		}
		return envArray;
	};

	onChangeEnv = selectedEnv => {
		this.setState({ selectedEnv });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	onChangeEnv = selectedEnv => {
		this.setState({ selectedEnv });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleOpen = () => {
		this.setState({ open: true });
		const { checkedData } = this.state;
		const data = this.preTrigger(checkedData);
		R.forEach(project => {
			this.props.soapJenkinsJobCheck(project.projectName);
		}, data.Projects);
	};
	getModalStyle = () => {
		const top = 50;
		const left = 50;
		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`
		};
	};

	handleJobTrigger = () => {
		const checkedItems = [...this.state.checkedData];
		const checkedItemsArray = [];
		for (let i = 0; i < checkedItems.length; i++) {
			checkedItems[i].metatags = new Array(
				JSON.parse(checkedItems[i].metatags)
			);
			checkedItemsArray.push(checkedItems[i]);
		}
		const dataToSend = this.preTrigger(checkedItemsArray);
		if (!R.isEmpty(dataToSend)) {
			this.props.soapMetaTrigger(dataToSend);
			this.setState({ open: false });
		}
	};

	preTrigger = checkedItems => {
		const projectData = [];
		R.forEach(item => {
			let project = R.find(R.propEq("projectName", item.projectName))(
				projectData
			);
			if (project) {
				project.testSuites.push(item);
			} else {
				project = { projectName: item.projectName, testSuites: [item] };
				projectData.push(project);
			}
		}, checkedItems);
		const postBody = this.format(projectData);
		return postBody;
	};

	format = projects => {
		const { selectedEnv } = this.state;
		const toReturn = {};
		toReturn["Projects"] = projects;
		toReturn["jobParameters"] = { ENVJOB: selectedEnv.label };
		return toReturn;
	};

	handleTrigger = triggerDetails => {
		if (triggerDetails.length > 0) {
			let trigger = [];
			let result;
			trigger = this.state.checkedData;
			for (let i = 0; i < triggerDetails.length; i++) {
				if (Object.keys(triggerDetails[i]).length > 2) {
					trigger.push(triggerDetails[i]);
					result = trigger.filter(function (a) {
						return (
							!this[a.testSuite] &&
							(this[a.testSuite] = true) &&
							!this[a.metatags] &&
							(this[a.metatags] = true)
						);
					}, Object.create(null));
					this.setState({
						checkedData: result
					});
				} else {
					this.filterUnchecked(triggerDetails[i]);
				}
			}
		} else {
			if (Object.keys(triggerDetails).length > 2) {
				this.setState({
					checkedData: [...this.state.checkedData, triggerDetails]
				});
			} else {
				this.filterUnchecked(triggerDetails);
			}
		}
	};

	filterUnchecked = unchecked => {
		for (let i = this.state.checkedData.length - 1; i >= 0; --i) {
			if (
				this.state.checkedData[i].testSuite === unchecked.testSuite &&
				this.state.checkedData[i].projectName === unchecked.projectName
			) {
				this.state.checkedData.splice(i, 1);
				this.setState({ checkedData: [...this.state.checkedData] });
			}
		}
	};

	canBeSubmitted() {
		const { selectedEnv } = this.state;
		return Object.keys(selectedEnv).length > 0;
	}

	renderProjectContent = data => {
		const arrayToReturn = [];
		for (var prop in data) {
			arrayToReturn.push(
				<SoapTable
					key={prop}
					jobName={prop}
					value={data[prop].testSuites}
					triggerDetails={this.handleTrigger}
				/>
			);
		}
		return arrayToReturn;
	};

	deleteTestCases = (e, obj) => {
		const { checkedData } = this.state;
		console.log(checkedData, "++");
		let arr = checkedData.filter(function (el) {
			if (el.testSuite !== obj.testSuite) {
				return true;
			}
			return '';
		});
		this.setState({ checkedData: [...arr] });
	};

	renderModalContent = (tableData, { ...props }) => {
		console.log(props, "+");
		return R.map(each => {
			return (
				<TableRow key={each.testSuite}>
					<TableCell component="th" scope="row">
						{each.projectName}
					</TableCell>
					<TableCell component="th" scope="row">
						{each.testSuite}
					</TableCell>
					<TableCell component="th" scope="row">
						{each.metatags}
					</TableCell>
					<TableCell component="th" scope="row" style={props.deleteButton}>
						<Delete onClick={e => this.deleteTestCases(e, each)} />
					</TableCell>
				</TableRow>
			);
		}, tableData);
	};

	renderTriggerResponse = triggerResponse => {
		return <SoapTriggerResponse soap={triggerResponse} />;
	};

	render() {
		const { classes } = this.props;
		const { checkedData } = this.state;
		const selectStyles = {
			input: base => ({
				...base
			})
		};
		const isEnabled = this.canBeSubmitted();
		const spinner = <SpinnerComponent />;

		const showButton = (
			<CustomButtons
				variant="contained"
				color="success"
				onClick={this.handleOpen}
			>
				Review & Execute
      </CustomButtons>
		);
		const custom = {
			deleteButton: {
				cursor: "pointer"
			}
		};
		const showMessage = <h3>Nothing to display...</h3>;
		const renderModal = (
			<GridContainer>
				<GridItem>
					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						open={this.state.open}
						onClose={this.handleClose}
					>
						<div style={this.getModalStyle()} className={classes.paper}>
							<h5 className={{ fontsize: "20px" }}>
								Review TestCases: {checkedData.length}
							</h5>
							<GridItem xs={12} sm={12} md={12}>
								<Paper className={classes.root}>
									<Table className={classes.table}>
										<TableHead>
											<TableRow>
												<TableCell>Job Name</TableCell>
												<TableCell>Test Suite(s)</TableCell>
												<TableCell>Metatag(s)</TableCell>
												<TableCell>Delete</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{this.renderModalContent(checkedData, custom)}
										</TableBody>
									</Table>
								</Paper>
							</GridItem>
							<br />
							<GridItem>
								<InputLabel htmlFor="age-simple">Envirnoment</InputLabel>
								<Select
									classes={classes}
									styles={selectStyles}
									options={this.getEnvParams(
										this.props.soapServerReponse.ENVJOB
									)}
									components={components}
									value={this.state.selectedEnv}
									onChange={this.onChangeEnv}
									placeholder="Environment"
									id="soapEnv"
								/>
							</GridItem>
							<br />
							<GridItem>
								<div>
									<Button
										disabled={!isEnabled}
										onClick={this.handleJobTrigger}
										variant="contained"
										color="primary"
										className={classes.button}
									>
										Trigger
                  </Button>
									<Button
										onClick={this.handleClose}
										variant="contained"
										color="secondary"
										className={classes.button}
									>
										Close
                  </Button>
								</div>
							</GridItem>
						</div>
					</Modal>
				</GridItem>
			</GridContainer>
		);

		return (
			<div>
				{!R.isEmpty(this.props.getSoapConfigs) && !this.props.soapLoading
					? this.renderProjectContent(this.props.getSoapConfigs.searchResult)
					: spinner}
				<GridItem>
					{!R.isEmpty(this.props.getSoapConfigs.searchResult) &&
						!this.props.soapLoading
						? showButton
						: showMessage}
				</GridItem>
				{checkedData.length > 0 ? renderModal : ""}
				{!R.isEmpty(this.props.soapTriggerResponse)
					? this.renderTriggerResponse(this.props.soapTriggerResponse)
					: ""}
			</div>
		);
	}
}

function mapStateToProps({
	errorMsgs,
	auth,
	getSoapConfigsReducer,
	soapMetaDataServerReducer
}) {
	return {
		auth,
		errorMsgs,
		getSoapConfigs: getSoapConfigsReducer.getSoapConfigs,
		soapTriggerResponse: getSoapConfigsReducer.soapTriggerResponse,
		soapLoading: getSoapConfigsReducer.loading,
		soapServerReponse: soapMetaDataServerReducer.soapMetaDetails
	};
}

export default withStyles(styles)(
	connect(
		mapStateToProps,
		{ soapJenkinsJobCheck, soapMetaTrigger }
	)(SoapMetaData)
);
