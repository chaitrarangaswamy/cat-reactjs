import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Select from "react-select";
import * as R from 'ramda';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core";

import jenkinsIcon from "../../assets/img/jenkins-icon.png";
import CardHeader from "../../components/Card/CardHeader";
import Button from "../CustomButtons/Button.jsx";
import ModalTrigger from "./ModalTrigger";
import ModalTriggerResponse from "./ModalTriggerResponse";
import SpinnerComponent from "../../views/spinner/spinner.jsx";
import * as actions from "../../actions";

const styles = theme => ({
	paper: {
		position: "absolute",
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
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

const customStyle = {
	headingColor: {
		color: "#000"
	},
	icon: {
		height: "100%"
	},
	multiParam: {
		paddingLeft: "0px"
	},
	select: {
		minWidth: "235px",
		width: "100%"
	},
	input: {
		display: "table",
		paddingTop: "7px"
	}
};

class Trigger extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			checked: false,
			jobName: null,
			errors: {},
			email: '',
			fixedClasses: "dropdown",
			loading: false,
			envOpt: [],
			branchOpt: [],
			defaultEnv: null,
			defaultBranch: null,
			jobNameOpt: [{}],
			showModal: false,
			selectedEnv: {},
			selectedBranch: {},
			selectedProject: {},
			selectedRelease: {},
			selectedJobtype: {}
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCheckChange = this.handleCheckChange.bind(this);
		this.emailChange = this.emailChange.bind(this);
		this.triggerJobHandler = this.triggerJobHandler.bind(this);
		this.onChangeEnv = this.onChangeEnv.bind(this);
		this.onChangeBranch = this.onChangeBranch.bind(this);
		this.modalOpen = this.modalOpen.bind(this);
		this.routeToLogin = this.routeToLogin.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleFixedClick = this.handleFixedClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (Object.keys(nextProps.jobName).length > 0) {
			this.setState({ loading: false });
			const jobNames = this.getSelOptions(this.props.jobName.data);
			this.setState({ jobNameOpt: [...jobNames] });

		}
		const jobParam = nextProps.jobParam.data;
		if (jobParam) {
			this.setState({
				fixedClasses: this.getFixedClass(jobParam, this.state.fixedClasses)
			});
			this.setState({ showModal: this.getModalT(jobParam) });

			const envParams = this.getEnvBrOptions(jobParam.ENVJOB);
			this.setState({ envOpt: [...envParams] });

			this.setState({ defaultEnv: this.getEnvBrSetValue(jobParam.ENVJOB) });

			const branchParam = this.getEnvBrOptions(jobParam.branch);
			this.setState({ branchOpt: [...branchParam] });

			this.setState({ defaultBranch: this.getEnvBrSetValue(jobParam.branch) });
		}
		if (nextProps.triggerJobResponse !== '') {
			nextProps.triggerJobResponse.status === 200 ?
				this.setState({ loading: false }) : this.setState({ loading: true });
		}
		if (nextProps.jobParam.data) {
			this.setState({ loading: false });
		}

	}

	//gets job name suggestions for select
	getSelOptions(info) {
		let jobOptions = [];
		if (info !== null && info !== undefined) {
			R.map(data => jobOptions.push({
				label: data.name
			}), info.jobs);
		}
		return jobOptions;
	}

	//gets default value for branch and env select
	getEnvBrSetValue(info) {
		return info && info.setValue && typeof info.setValue === 'string' ? info.setValue : '';
	}

	//gets branch and env suggestions for select
	getEnvBrOptions(info) {
		const environment = [];
		if (info && info.value && info.value.length > 0) {
			R.map(env =>
				environment.push({
					label: env
				})
				, info.value);
		} else {
			return environment;
		}
		return environment;
	}

	//determines to close or open trigger pop up
	getFixedClass(info, currState) {
		let paramsLength = Object.keys(info).length;
		if (paramsLength > 3) {
			if (currState === "dropdown show") {
				return "dropdown";
			}
		} else {
			return "dropdown show";
		}
	}

	//determines if modal pop up will show or not
	getModalT(info) {
		let paramsLength = Object.keys(info).length;
		let array1 = Object.keys(info);
		let array2 = ["name", "ENVJOB", "branch"]
		const intersection = array1.filter(element => !array2.includes(element));
		if (paramsLength <= 3) {
			if (intersection.length === 0) {
				return false
			} else {
				return true
			}
		} else {
			return true
		}
	}

	//open and closes trigger pop 
	handleFixedClick() {
		if (this.state.fixedClasses === "dropdown") {
			this.setState({ fixedClasses: "dropdown show" });
		} else {
			this.setState({ fixedClasses: "dropdown" });
		}
	}

	//reset values upon trigger close
	handleClose() {
		this.handleFixedClick();
		this.setState({
			jobName: null,
			email: ' ',
			selectedEnv: {},
			selectedBranch: {},
			checked: false,
			selectedProject: {},
			selectedRelease: {},
			selectedJobtype: {}
		});
	}

	//changes state of checked when checkbox is checked
	handleCheckChange(event) {
		this.setState({
			checked: !this.state.checked
		});
	}

	//resets values upon opening trigger pop up
	handleClick() {
		this.setState({
			jobName: null,
			email: ' ',
			checked: false
		});
		this.handleFixedClick();
		this.props.get_server();
		this.handleClose();
		// this.props.getProjectParams();
		// this.props.getReleaseParams();
		this.setState({
			loading: true
		});
	}

	//gets parameters based on job name
	handleChange = name => value => {
		this.setState({
			[name]: value
		});
		if (name === "jobName") {
			this.setState({
				loading: true
			});
			this.props.getJobParams(value.label);
		}
	};

	//inputs email addresses
	emailChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	//formats data and triggers job with API
	triggerJobHandler() {
		const triggerParams = R.compose(this.triggerChecks, this.defaultParams)(this.refs);
		this.props.triggerJob(triggerParams);
		this.setState({ loading: true });
		this.handleClose();
	}

	defaultParams = (refs) => {
		const defaultParams = {};
		if (!R.isEmpty(refs)) {
			Object.keys(refs).map(data => {
				const d = data.split(',');
				return defaultParams[d[0]] = d[1];
			});
		};
		return Object.keys(defaultParams).length > 0 ? defaultParams : {};
	}

	triggerChecks = (defaultParams) => {
		const objectToReturn = {};
		const { jobName, selectedBranch, selectedEnv, selectedProject, selectedRelease, selectedJobtype } = this.state;

		if (!R.isEmpty(jobName)) {
			objectToReturn['jobName'] = jobName.label;
			!R.isEmpty(selectedEnv) ? objectToReturn['ENVJOB'] = selectedEnv.label : objectToReturn['ENVJOB'] = defaultParams.ENVJOB;
			!R.isEmpty(selectedBranch) ? objectToReturn['branch'] = selectedBranch.label : objectToReturn['branch'] = defaultParams.branch;
			objectToReturn['server'] = 'jenkins0';
			objectToReturn['notificationType'] = 'full';
			objectToReturn['notificationModes'] = 'email,hipchat';
			objectToReturn['referer'] = window.location.href;
			if (!R.isEmpty(selectedProject) && !R.isEmpty(selectedRelease)) {
				const specialParams = {};
				specialParams.projectName = selectedProject.label;
				specialParams.release = selectedRelease.label;
				objectToReturn.specialParams = specialParams;
			}
			if (!R.isEmpty(selectedJobtype)) {
				objectToReturn['jobtype'] = selectedJobtype.label;
			}
			const emailList = this.fetchList();
			if (emailList.length > 0) {
				objectToReturn['users'] = emailList;
			}
		} else {
			this.canBeSubmitted();
		}
		return objectToReturn;
	}

	fetchList = () => {
		const listToReturn = [];
		const { email } = this.state;
		if (email.length > 0) {
			const userslist = email.split(',');
			for (let i = 0; i < userslist.length; i++) {
				listToReturn.push({
					email: userslist[i],
					userid: ''
				});
			}
		} else {
			return listToReturn;
		}
		return listToReturn;
	}

	onChangeEnv = (selectedEnv) => {
		this.setState({ selectedEnv });
	}

	onChangeBranch = (selectedBranch) => {
		this.setState({ selectedBranch });
	}

	onChangeProject = (selectedProject) => {
		this.setState({ selectedProject })
	}

	onChangeRelease = (selectedRelease) => {
		this.setState({ selectedRelease })
	}

	onChangeJobType = (selectedJobtype) => {
		this.setState({ selectedJobtype })
	}
	 
	handleModal = () => {
		this.setState({ showModal: false })
	}

	//determines if modal pop up should show
	modalOpen(data) {
		if (this.state.open !== true) {
			this.setState({ open: true });
		}
	}
	//indicates route for login in to access trigger
	routeToLogin() {
		this.props.history.push("/pages/login-page");
	}

	//determines if page is filled out
	canBeSubmitted() {
		const { jobName } = this.state;
		return jobName != null;
	}

	renderProjectRelease = ({ ...props }) => {
		return (
			<React.Fragment>
				<InputLabel htmlFor="age-simple" style={customStyle.input}>
					Project
                   </InputLabel>
				<Select
					classes={props.css}
					styles={props.styles}
					options={this.getSuggestions(this.props.projectName.data)}
					components={components}
					value={this.state.selectedProject}
					onChange={this.onChangeProject}
				/>
				<InputLabel htmlFor="age-simple" style={customStyle.input}>
					Release Number
                   </InputLabel>
				<Select
					classes={props.css}
					styles={props.styles}
					options={this.getSuggestions(this.props.releaseName.data)}
					components={components}
					value={this.state.selectedRelease}
					onChange={this.onChangeRelease}
				/>
			</React.Fragment>
		);
	}

	getSuggestions = (list) => {
		const projectList = [];
		const releaseList = [];
		R.forEach(list => {
			if (list.projectName) {
				projectList.push({ label: list.projectName });
			} else if (list.release) {
				releaseList.push({ label: list.release });
			}
		}, list);
		return (projectList.length > 0 ? projectList : releaseList);
	};

	render() {
		const {
			loading,
			checked,
			email,
			envOpt,
			selectedEnv,
			branchOpt,
			selectedBranch,
			defaultBranch,
			defaultEnv,
			showModal,
			fixedClasses,
			jobNameOpt,
			jobName
		} = this.state;
		const { classes, theme } = this.props;
		const spinner = loading ? (
			<div>
				<SpinnerComponent />
			</div>
		) : null;

		const content = checked ? (
			<div>
				<TextField
					id="email"
					name="email"
					label="example@example.com"
					className={classes.textField}
					value={email}
					onChange={(e) => this.emailChange(e)}
					margin="normal"
				/>
			</div>
		) : null;

		const isEnabled = this.canBeSubmitted() && !loading;

		const selectStyles = {
			input: base => ({
				...base,
				color: theme.palette.text.primary
			})
		};

		const envSelect = envOpt.length > 0 && this.props.jobParam ? (
			<React.Fragment>
				<InputLabel htmlFor="age-simple" style={customStyle.input}>
					Envirnoment
        </InputLabel>
				<Select
					classes={classes}
					styles={selectStyles}
					options={envOpt}
					components={components}
					value={selectedEnv}
					onChange={this.onChangeEnv}
					placeholder="Environment"
					ref={`ENVJOB,${defaultEnv}`}
				>
				</Select>

			</React.Fragment>
		) : null;

		const branchSelect = branchOpt.length > 0 && this.props.jobParam ? (
			<React.Fragment>
				<InputLabel htmlFor="age-simple" style={customStyle.input}>
					Branch
        </InputLabel>
				<Select
					classes={classes}
					styles={selectStyles}
					options={branchOpt}
					components={components}
					value={selectedBranch}
					onChange={this.onChangeBranch}
					placeholder="Branch"
					ref={`branch,${defaultBranch}`}
				>
				</Select>
			</React.Fragment>
		) : null;

		const jobDetails = (
			<React.Fragment>
				<InputLabel htmlFor="age-simple" style={customStyle.input}>
					Job Name
        </InputLabel>
				<Select
					classes={classes}
					styles={selectStyles}
					options={jobNameOpt}
					components={components}
					value={jobName}
					onChange={this.handleChange('jobName')}
				/>
			</React.Fragment>
		);

		const jobType = (
			<React.Fragment>
				<InputLabel htmlFor="age-simple" style={customStyle.input}>
					Job Type
	           </InputLabel>
				<Select
					classes={classes}
					styles={selectStyles}
					options={[{ label: 'selenium' }, { label: 'soapui' }]}
					components={components}
					value={this.state.selectedJobtype}
					onChange={this.onChangeJobType}
				/>
			</React.Fragment>
		);


		let renderTriggerJobResponse;
		const triggerJobResponseData = this.props.triggerJobResponse;
		const errorJobResponseData = this.props.errors;
		if (triggerJobResponseData) {
			renderTriggerJobResponse = (
				<ModalTriggerResponse
					item={this.props.triggerJobResponse}
					status={true}
				/>
			);
		} else if (Object.keys(errorJobResponseData).length !== 0) {
			renderTriggerJobResponse = (
				<ModalTriggerResponse item={errorJobResponseData} status={true} />
			);
		}

		const renderModalTrigger = showModal ? (
			<div>
				<ModalTrigger item={this.props.jobParam.data} modalOpen={true} modal={this.handleModal}/>
			</div>
		) : null;

		return (
			<React.Fragment>
				{spinner}
				{renderTriggerJobResponse}
				<div className="fixed-plugin">
					<div id="fixedPluginClasses" className={fixedClasses}>
						<div onClick={this.handleClick}>
							<img
								src={jenkinsIcon}
								alt="Trigger Jenkins Jobs"
								style={customStyle.icon}
							/>
						</div>
						<ul className="dropdown-menu">
							<CardHeader color={this.props.statusColor}>
								{this.props.serverStatus}
							</CardHeader>
							{this.props.isAuthenticated ? (
								<div>
									<h4 style={customStyle.headingColor}>Job Trigger</h4>
									<form>
										<div>
											{/* {!R.isEmpty(this.props.projectName) &&
												!R.isEmpty(this.props.releaseName)
												? this.renderProjectRelease({ css: classes, styles: selectStyles })
												: ''} */}
											<div />
											<div>{jobType}</div>
											<div>{jobDetails}</div>
											<div> {envSelect} </div>
											<div> {branchSelect} </div>
										</div>

										<FormControlLabel
											style={customStyle.multiParams}
											control={
												<Checkbox
													tabIndex={-1}
													//onClick={() => this.handleToggle(3)}
													checkedIcon={
														<Check className={classes.checkedIcon} />
													}
													icon={<Check className={classes.uncheckedIcon} />}
													classes={{
														checked: classes.checked
													}}
													onChange={this.handleCheckChange}
												/>
											}
											classes={{
												label: classes.label
											}}
											label="Email Notification"
										/>
										<div>{content}</div>
										<div>
											<Button
												onClick={this.triggerJobHandler}
												disabled={!isEnabled}
												color="success"
											>
												Trigger Job
                                            </Button>
											<Button onClick={this.handleClose} color="danger">
												Close
                                            </Button>
										</div>
									</form>
								</div>
							) : (
									<div>
										<br />
										<Button onClick={this.routeToLogin} color="logoBlue">
											Log In
                  </Button>
										<br />
									</div>
								)}
						</ul>
					</div>
				</div>
				{renderModalTrigger}
			</React.Fragment>
		);
	}
}

Trigger.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

function mapStateToProps({ jenkins, errorMsgs, auth }) {
	return {
		serverStatus: jenkins.serverStatus,
		statusColor: jenkins.statusColor,
		jobName: jenkins.jobName,
		projectName: jenkins.projectName,
		releaseName: jenkins.releaseName,
		jobParam: jenkins.jobParam,
		errors: errorMsgs,
		triggerJob: jenkins.triggerJob,
		triggerJobResponse: jenkins.triggerJob,
		isAuthenticated: auth.isAuthenticated
	};
}

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(
		mapStateToProps,
		actions
	),
	withRouter
)(Trigger);
