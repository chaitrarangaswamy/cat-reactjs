import React, { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import Modal from '@material-ui/core/Modal';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// core components
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import CustomButtons from '../../../components/CustomButtons/Button';
import { cardTitle } from '../../../assets/jss/material-dashboard-pro-react';
import SpinnerComponent from '../../spinner/spinner';

import TriggerResponse from './TriggerResponse';
import { searchMetaDataTagsSelenium, jenkinsPreTiggerCheck, seleniumMetaTrigger } from '../../../actions/metaDataActions';
import TableData from './SeleniumTable';
// import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Delete from "@material-ui/icons/Delete";

const styles = theme => ({
	popover: {
		pointerEvents: 'none'
	},
	cardIconTitle: {
		...cardTitle,
		marginTop: '15px',
		marginBottom: '0px'
	},
	paper: {
		position: 'absolute',
		width: 'auto',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
	},
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
	button: {
		margin: theme.spacing.unit,
	}
});

class MetaDataTables extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checkedData: [],
			open: false,
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleJobTrigger = this.handleJobTrigger.bind(this);
	}

	handleOpen = () => {
		this.setState({ open: true });
		this.props.jenkinsPreTiggerCheck();
	};

	handleClose = () => {
		this.setState({ open: false });
		window.location.reload();
	};

	handleJobTrigger = () => {
		if (!R.isEmpty(this.props.metaDataServerDetails)) {
			const serverValues = this.props.metaDataServerDetails;
			this.props.seleniumMetaTrigger(this.trigger(serverValues));
			this.setState({ open: false });
			//window.location.reload();
		}
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

	trigger = (serverValues) => {
		const { checkedData } = this.state;
		const params = {
			ENVJOB: serverValues.ENVJOB.setValue,
			branch: serverValues.branch.setValue
		};
		const sheetsArray = [];
		for (let i = 0; i < checkedData.length; i++) {
			checkedData[i].id = new Array(JSON.parse(checkedData[i].id));
			sheetsArray.push(checkedData[i]);
		}
		return this.postDataCalc(sheetsArray, params);
	};

	postDataCalc = (sheetsArray, params) => {
		const data = [];
		const toReturn = {};
		R.forEach(item => {
			let testCase = R.find(R.propEq('sheetName', item.sheet))(data);
			if (testCase) {
				R.forEach(test => {
					testCase.testcases.push(test);
				}, item.id);
			} else {
				testCase = {
					jobName: item.sheet,
					sheetName: item.sheet,
					testcases: item.id
				};
				data.push(testCase);
			}
		}, sheetsArray);
		toReturn['jobParameters'] = params;
		toReturn['testcases'] = data;
		return toReturn;
	};

	handleTrigger = triggerDetails => {
		if (triggerDetails.length > 0) {
			let trigger = [];
			trigger = this.state.checkedData;
			for (let handleTrigger of triggerDetails) {
				if (Object.keys(handleTrigger).length > 2) {
					trigger.push(handleTrigger);
				} else {
					this.filterUnchecked(handleTrigger);
				}
			}
			if (trigger.length > 0) {
				this.setState({
					checkedData: trigger
				});
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
				this.state.checkedData[i].sheet === unchecked.sheet &&
				this.state.checkedData[i].id === unchecked.id
			) {
				this.state.checkedData.splice(i, 1);
				this.setState({ checkedData: [...this.state.checkedData] });
			}
		}
	};

	renderProjectContent = data => {
		let dataresult = {}
		if (Object.keys(this.props.seleniumAddonResonse).length > 0) {
			dataresult["currentPage"] = 0
			dataresult["lastPage"] = 3
			dataresult["loading"] = false
			for (var key in this.props.seleniumAddonResonse.searchResult) {
				dataresult[key] = this.props.seleniumAddonResonse.searchResult[key]
			}
			data = dataresult;
		}
		const arrayToReturn = [];
		for (var prop in data) {
			for (var sheet in data[prop]) {
				arrayToReturn.push(
					<TableData
						key={prop}
						value={data[prop][sheet]}
						workbook={prop}
						sheet={sheet}
						triggerDetails={this.handleTrigger}
					/>
				);
			}
		}
		return arrayToReturn;
	};

	deleteTestCases = (e, obj) => {
		const { checkedData } = this.state;

		let arr = checkedData.filter(function (el) {
			if (el.id !== obj.id) {
				return true;
			}
			return '';
		});
		this.setState({ checkedData: [...arr] });
	};

	renderModalContent = (finalData, { ...props }) => {
		return R.map((each) => {
			return (
				<TableRow key={Math.random().toString()}>
					<TableCell component='th' scope='row'>
						{each.workbook}
					</TableCell>
					<TableCell component='th' scope='row'>
						{each.sheet}
					</TableCell>
					<TableCell component='th' scope='row' style={props.textAlign}>
						{each.scenario}
					</TableCell>
					<TableCell component='th' scope='row' style={props.textAlign}>
						{each.scenariodescription}
					</TableCell>
					<TableCell component='th' scope='row' style={props.deleteButton}>
						<Delete onClick={(e) => this.deleteTestCases(e, each)} />
					</TableCell>
				</TableRow>
			);
		}, finalData);
	};

	renderSearchResults = (data) => {
		const searchedArrayToReturn = [];

		if (!R.isEmpty(data)) {
			for (var prop in data) {
				for (var sheet in data[prop]) {
					searchedArrayToReturn.push(
						<TableData
							key={prop}
							value={data[prop][sheet]}
							workbook={prop}
							sheet={sheet}
							triggerDetails={this.handleTrigger}
						/>
					);
				}
			}
			return searchedArrayToReturn;
		} 
		return (<h2>No Matching Results...!</h2>)
	};

	renderTriggerResponse = (jenkinsResponse) => {
		if (jenkinsResponse.inProgress === true) {
			return (
				<TriggerResponse selenium={jenkinsResponse} />
			);
		}
	};

	canBeSubmitted() {
		const { checkedData } = this.state;
		return checkedData.length > 0;
	}

	render() {
		const custom = {
			textAlign: {
				padding: '5px'
			},
			deleteButton: {
				cursor: 'pointer'
			}
		};

		const { classes } = this.props;
		const { checkedData } = this.state;
		const isEnabled = this.canBeSubmitted();

		const showButton = (
			<CustomButtons
				variant='contained'
				color='success'
				onClick={this.handleOpen}
				id="review-execute"
			>
				Review & Execute
           </CustomButtons>
		);

		// const showMessage = (
		// 	<h2>Nothing to display...</h2>
		// );

		const spinner = (
			<SpinnerComponent />
		);
		const renderModal = (
			<GridContainer>
				<GridItem>
					<Modal
						aria-labelledby='simple-modal-title'
						aria-describedby='simple-modal-description'
						open={this.state.open}
						onClose={this.handleClose}
					>
						<div style={this.getModalStyle()} className={classes.paper}>
							<h5 className={{ fontsize: '20px' }}>Review TestCases: {checkedData.length}</h5>
							<GridItem xs={12} sm={12} md={12}>
								<Paper className={classes.root}>
									<Table className={classes.table}>
										<TableHead>
											<TableRow>
												<TableCell>Workbook</TableCell>
												<TableCell>Sheet Name</TableCell>
												<TableCell>Scenario</TableCell>
												<TableCell>Scenario Description</TableCell>
												<TableCell>Delete</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{this.renderModalContent(checkedData, custom)}
										</TableBody>
									</Table>
								</Paper>
							</GridItem>
							<GridItem>
								<div >
									<Button onClick={this.handleJobTrigger} id="Modal-trigger" disabled={!isEnabled} variant='contained' color='primary' className={classes.button}>
										Trigger
                                     </Button>
									<Button onClick={this.handleClose} variant='contained' color='secondary' className={classes.button}>
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
				{(this.props.triggerSearch === true)
					? this.renderSearchResults(this.props.seleniumTagSearchResults) :
					this.renderProjectContent(this.props.getMetaDataSeleniumReducer)}
				{checkedData.length > 0 ? showButton : ''}
				<div>
					{this.props.seleniumPreTriggerLoading ? spinner : renderModal}
					{!R.isEmpty(this.props.seleniumTriggerResponse) ?
						this.renderTriggerResponse(this.props.seleniumTriggerResponse) : ''}
				</div>
			</div >
		);
	}
}

function mapStateToProps({ errorMsgs, auth, seleniumTagSearchResults, searchMetaDataSeleniumReducer,
	getMetaDataSeleniumReducer, metaDataServerReducer, seleniumMetaTrigger, getSeleniumAddonSearch }) {
	return {
		auth,
		errorMsgs,
		triggerSearch: searchMetaDataSeleniumReducer.triggerSearch,
		seleniumTagSearchResults,
		getMetaDataSeleniumReducer,
		metaDataServerDetails: metaDataServerReducer.metaDetails,
		seleniumTriggerResponse: seleniumMetaTrigger.seleniumTriggerResponse,
		seleniumPreTriggerLoading: metaDataServerReducer.loading,
		seleniumAddonResonse: getSeleniumAddonSearch.seleniumAddonResonse,
	};
}

export default withStyles(styles, { withTheme: true })(
	connect(
		mapStateToProps,
		{
			searchMetaDataTagsSelenium,
			jenkinsPreTiggerCheck,
			seleniumMetaTrigger
		}
	)(MetaDataTables)
);
