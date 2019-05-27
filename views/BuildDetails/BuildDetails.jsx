import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
//import ReactTable from "react-table";
//import queryString from "query-string";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import moment from "moment";
import * as R from 'ramda';
// @material-ui/icons
// import Chip from "@material-ui/core/Chip";

//import pdf from '@material-ui/icons/PictureAsPdf';

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
// import CardText from "../../components/Card/CardText";
import CardBody from "../../components/Card/CardBody";

import {
	cardTitle,
	roseColor
} from "../../assets/jss/material-dashboard-pro-react";

import { connect } from "react-redux";
import {
	getSeleniumBuildResult,
	getSoapBuildResult
} from "../../actions/buildresultAction";
import TestSuiteDetail from "./TestSuiteDetails";

import MultiJobSummaryDetail from "./MultiJobSummary";
import LineChart from "../Charts/LineChart";

import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import Button from "../../components/CustomButtons/Button";
// import Email from "@material-ui/icons/Email";
// import Chip from '@material-ui/core/Chip';
// import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
// import FormControl from "@material-ui/core/FormControl";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CustomInput from "../../components/CustomInput/CustomInput";

import { getAllReadySentEmails, postEmail } from "../../actions";
import CardIcon from "../../components/Card/CardIcon";
// import BrightnessHigh from "@material-ui/icons/BrightnessHigh";
import Dialpad from "@material-ui/icons/Dialpad";
import Class from "@material-ui/icons/Class";
import Cloudcircle from "@material-ui/icons/CloudCircle";
// import Directions_run from "@material-ui/icons/DirectionsRun";
import Schedule from "@material-ui/icons/Schedule";
import Traffic from "@material-ui/icons/Traffic";
import Timer from "@material-ui/icons/Timer";
import TimerOff from "@material-ui/icons/TimerOff";
// import DateRange from "@material-ui/icons/DateRange";
import CardFooter from "../../components/Card/CardFooter";
import * as Url from "../../constants";
import SpinnerComponent from "../spinner/spinner.jsx";
import ErrorComponent from "../Errorcomponent/Errorcomponent";
import isEmpty from "../../validation/is-Empty";

const styles = theme => ({
	chip: {
		margin: theme.spacing.unit
	},
	cardTitle,
	cardIconTitle: {
		...cardTitle,
		marginTop: "15px",
		marginBottom: "0px"
	},
	cardTitleWhite: {
		...cardTitle,
		color: "#FFFFFF",
		marginTop: "0"
	},
	cardCategoryWhite: {
		margin: "0",
		color: "rgba(255, 255, 255, 0.8)",
		fontSize: ".875rem"
	},
	cardCategory: {
		color: "#999999",
		marginTop: "10px"
	},
	icon: {
		color: "#333333",
		margin: "10px auto 0",
		width: "130px",
		height: "130px",
		border: "1px solid #E5E5E5",
		borderRadius: "50%",
		lineHeight: "174px",
		"& svg": {
			width: "55px",
			height: "55px"
		}
	},
	iconRose: {
		color: roseColor
	},
	marginTop30: {
		marginTop: "30px"
	},
	testimonialIcon: {
		marginTop: "30px",
		"& svg": {
			width: "40px",
			height: "40px"
		}
	},
	cardTestimonialDescription: {
		fontStyle: "italic",
		color: "#999999"
	},
	h4: {
		color: "#000000"
	},
	iconsAlignment: {
		float: "right"
	},
	emailsentSuccess: {
		backgroundColor: "#66bb6a",
		color: "white"
	},
	emailsentFailure: {
		backgroundColor: "#ef5350",
		color: "white"
	}
});

class BuildDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			Email: "",
			getEmailerror: "",
			emailArray: "",
			sendemailSuccess: "",
			sendemailFailure: ""
		};
		this.onChange = this.onChange.bind(this);
		this.sendEmail = this.sendEmail.bind(this);
	}

	componentDidMount() {
		const jobParams = this.props.match.params;
		if (jobParams !== null && jobParams !== undefined) {
			if (jobParams.type === "Selenium") {
				this.props.getSeleniumBuildResult(jobParams);
				this.props.getAllReadySentEmails(jobParams);
			} else if (jobParams.type === "SoapUI") {
				this.props.getSoapBuildResult(jobParams);
				this.props.getAllReadySentEmails(jobParams);
			}
		}
	}

	componentWillReceiveProps(newProps) {
		if (newProps.sendEmailReducer.user) {
			this.getEmails(newProps.sendEmailReducer);
		}

		if (newProps.sendEmailReducer.postEmailResponse) {
			this.SendEmailResponse(newProps.sendEmailReducer.postEmailResponse);
		}
	}

	getEmails(users) {
		// console.log(users.user, "user");
		let tempArray;
		if (users && Array.isArray(users.user)) {
			tempArray = users.user.map(item => {
				return (
					<tr key={item._id}>
						<td>{item.email}</td>
						<td>{item.status}</td>
					</tr>
				);
			});
			this.setState({ emailArray: tempArray });
		} else if (
			users.user &&
			users.user.response &&
			users.user.response.data.error
		) {
			this.setState({ getEmailerror: users.user.response.data.error });
		}
	}

	SendEmailResponse(sentresponse) {
		if (sentresponse.status === 200) {
			this.setState({ sendemailSuccess: sentresponse.data.response });
		}
		if (sentresponse.response && sentresponse.response.status === 404) {
			this.setState({
				sendemailFailure: "Something went wrong please try again"
			});
		}
	}

	onChange(e) {
		// console.log(e.target.value, "e");
		this.setState({ [e.target.name]: e.target.value });
	}
	sendEmail() {
		// const refererUrl = new URL(window.location.href);
		const queryParams = this.props.match.params;
		// queryParams['referer'] = encodeURI(refererUrl);
		if (this.state.email !== "") {
			queryParams["to"] = this.state.Email; // add emails list to queryParams
		}
		if (queryParams && queryParams.type.toUpperCase() === "SELENIUM") {
			let url = "/api/buildresults/report/" + JSON.stringify(queryParams);
			this.props.postEmail(url);
		}
		if (queryParams && queryParams.type.toUpperCase() === "SOAPUI") {
			let url = "/api/soapbuild/report/" + JSON.stringify(queryParams);
			this.props.postEmail(url);
		}
	}

	makeRequest(jobType, buildParams) {
		if (jobType === "Selenium") {
			this.props.getSeleniumBuildResult(buildParams);
		} else if (jobType === "SoapUI") {
			this.props.getSoapBuildResult(buildParams);
		}
	}

	sendEmailClick = () => {
		this.setState({ open: !this.state.open });
	};

	handleClick = () => {
		this.setState({ open: !this.state.open });
	};
	handleClose = () => {
		this.setState({ open: false });
	};
	toggleFunction() {
		var x = document.getElementById("myDIV");
		if (x.style.display === "block") {
			x.style.display = "none";
		} else {
			x.style.display = "block";
		}
	}
	canBeSubmitted() {
		const { Email } = this.state;
		return Email.length > 0;
	}

	formatDate = date => {
		if (moment(date) instanceof moment && !isNaN(moment(date))) {
			if (date && date.length > 18) {
				// const formattedDate = new Date(date).toISOString();
				const formattedDate = new Date(date);
				return moment(formattedDate).format("lll");
			} else {
				return "";
			}
		}
	};

	referer = (params) => {
		if (params && params.jobName && params.type === 'Selenium') {
			return encodeURIComponent(`${Url.baseUrl}/builddetails?jobName=${params.jobName}&buildreference=${params.buildReference}&type=${params.type}`);
		} else if (params && params.jobName && params.type === 'SoapUI') {
			return encodeURIComponent(`${Url.baseUrl}/builddetails?jobName=${params.jobName}&buildreference=${params.buildReference}&type=${R.toLower(params.type)}`);
		}
	}


	render() {
		const { classes } = this.props;
		// const { rtlActive } = this.props;
		const { open } = this.state;
		const isEnabled = this.canBeSubmitted();
		const managerClasses = classNames({
			[classes.managerClasses]: true
		});
		const spinner = (
			<div>
				<SpinnerComponent />
			</div>
		);
		const custom = {
			icons: {
				color: "#02569B",
				margin: "10px 10px 1px 10px"
			},
			headingColor: {
				color: "#000"
			},
			card: {
				boxShadow: "none",
				borderRadius: "0px",
				width: "500px"
			},
			above: {
				position: "relative",
				zIndex: 2
			},
			below: {
				position: "relative",
				zIndex: 1,
				width: "100%",
				marginLeft: "2px",
				marginTop: "-2%"
			},
			emailButton: {
				color: "#02569B",
				backgroundColor: "#fff",
				boxShadow: "none",
				marginBottom: "21px",
				padding: "0px"
			},
			email: {
				display: "none"
			},
			popper: {
				width: "700px",
				position: "fixed",
				marginTop: "-25px",
				marginLeft: "10px"
			},
			iconsflex: {
				display: "inline-flex"
			},
			emailsentSuccess: {
				backgroundColor: "#66bb6a",
				color: "white"
			},
			emailsentFailure: {
				backgroundColor: "#ef5350",
				color: "white"
			},
			emailcard: {
				width: "650px",
				margin: "auto"
			},
			jobNameStyle: {
				color: "#3C4858"
			}
		};
		//const parsed = queryString.parse(this.props.location.search);
		let result;
		let propType = this.props.match.params;
		if (propType.type === "Selenium") {
			result = this.props.seleniumBuildResultReducer;
		} else if (propType.type === "SoapUI") {
			result = this.props.soapBuildResultReducer;
		}
		const fileUrl = `${Url.baseUrl}/download`;
		const referer = this.referer(this.props.match.params);
		// const fileUrl = 'https://cat.allegiantair.com/download';

		let jobName,
			buildReference,
			environment,
			startTime,
			endTime,
			duration,
			jobStatus;

		let testcaseDetails, renderTestCaseDetails, renderSingleLineGraph;
		//Multijob
		let subBuilds, renderMultiJobSummary;

		if (
			result !== null &&
			result !== undefined &&
			Object.keys(result).length !== 0
		) {
			if (result.searchResult !== null && result.searchResult.length > 0) {
				// Header Section
				jobName = result.searchResult[0].jobDetails.jobName;
				buildReference = result.searchResult[0].jobDetails.buildReference;
				environment = result.searchResult[0].jobDetails.environment;
				startTime = this.formatDate(
					result.searchResult[0].jobDetails.startDateTime
				);
				endTime = this.formatDate(
					result.searchResult[0].jobDetails.endDateTime
				);
				duration = result.searchResult[0].jobDetails.duration;
				jobStatus = result.searchResult[0].jobDetails.jobStatus;

				//console.log('jobType', result.searchResult[0].jobDetails);

				// Multi job
				subBuilds = result.searchResult[0].subBuilds;
				if (subBuilds !== null && subBuilds !== "" && subBuilds !== undefined) {
					if (subBuilds.length > 0) {
						renderMultiJobSummary = (
							<MultiJobSummaryDetail item={subBuilds} parentJobName={jobName} />
						);
					} else {
						renderMultiJobSummary = <h4>No records found.</h4>;
					}
				} else {
					testcaseDetails = result.searchResult[0].testcaseDetails;

					//testcases = result.searchResult[0].testcaseDetails[0].testcases;
					if (testcaseDetails.length > 0) {
						renderTestCaseDetails = testcaseDetails.map((prop, index) => (
							<TestSuiteDetail key={index} testSuiteItem={prop} />
						));

						renderSingleLineGraph = <LineChart item={result.searchResult[0]} type={propType.type} />;
					} else {
						renderTestCaseDetails = <h4>No records found...</h4>;
					}
				}
			}
		}

		const serverAlert = (
			<div>
				<ErrorComponent />
			</div>
		);

		return (
			<div>
				<div>
					{!result || !isEmpty(this.props.errorMsgs.apiError) ? spinner : null}
					{this.props.errorMsgs.crosError ? serverAlert : ""}
					<GridItem xs={12} sm={12} md={12} lg={12}>
						<Card>
							<CardHeader color="logoBlue" icon>
								<CardIcon color="logoBlue">
									<Class />
								</CardIcon>
								<GridContainer style={custom.above}>
									<GridItem xs={12} sm={12} md={9} lg={9}>
										<span>
											<h4 style={custom.jobNameStyle}> {jobName}</h4>
										</span>
									</GridItem>
									{endTime ?
										<GridItem xs={12} sm={12} md={3} lg={3}>
											<div style={custom.iconsflex}>
												<a
													target={`_self`}
													href={`${fileUrl}/${jobName}-${buildReference}.pdf/${referer}`}
												>
													<i style={custom.icons} className="material-icons">
														picture_as_pdf
                                                    </i>
												</a>
												<a
													target={`_self`}
													href={`${fileUrl}/${jobName}-${buildReference}.csv/${referer}`}
												>
													<i style={custom.icons} className="material-icons">
														file_copy
                                                    </i>
												</a>
												<Manager className={managerClasses}>
													<Target>
														<Button
															style={custom.emailButton}
															justIcon
															aria-owns={open ? "menu-list1" : null}
															aria-haspopup="true"
															onClick={this.sendEmailClick}
														>
															<i className="material-icons" id="sendEmailIcon">
																email
                                                            </i>
														</Button>
													</Target>

													<Popper
														placement="bottom-start"
														eventsEnabled={open}
														className="popper"
													>
														{/* <ClickAwayListener> */}
														<Grow
															in={open}
															id="menu-list1"
															style={{ transformOrigin: "0 0 0" }}
														>
															<Paper className={classes.dropdown} elevation={4}>
																<GridContainer>
																	<Card className="card" style={custom.emailcard}>
																		<CardHeader color="success" icon>
																			<GridContainer>
																				<GridItem xs={12} sm={12} md={12}>
																					<h4
																						style={custom.headingColor}
																						id="sendEmailTitle"
																					>
																						Send e-mail
                                                                                    </h4>
																				</GridItem>
																			</GridContainer>
																		</CardHeader>
																		<CardBody>
																			<GridContainer>
																				<GridItem xs={12} sm={12} md={12}>
																					<p style={custom.emailsentSuccess}>
																						{this.state.sendemailSuccess}
																					</p>
																					<p style={custom.emailsentFailure}>
																						{this.state.sendemailFailure}
																					</p>
																				</GridItem>
																				<GridItem xs={12} sm={12} md={8}>
																					<CustomInput
																						name="Email"
																						labelText="email@example.com"
																						id="sendEmail"
																						formControlProps={{
																							fullWidth: true,
																							position: "static"
																						}}
																						inputProps={{
																							onBlur: this.onChange,
																							type: "email",
																							name: "Email"
																						}}
																						value={this.state.Email}
																						onBlur={() => this.onChange}
																					/>
																				</GridItem>
																				<GridItem xs={12} sm={12} md={2}>
																					<Button
																						color="logoBlue"
																						onClick={this.sendEmail}
																						disabled={!isEnabled}
																						id="sendEmailButton"
																					>
																						Send e-mail
                                                                                    </Button>
																				</GridItem>
																			</GridContainer>
																			<GridContainer>
																				<GridItem xs={12} sm={12} md={12}>
																					<Button
																						color="logoBlue"
																						onClick={this.toggleFunction}
																						id="defaultEmailListButton"
																					>
																						+
                                                                                   </Button>
																				</GridItem>
																			</GridContainer>
																			<GridContainer
																				id="myDIV"
																				style={custom.email}
																			>
																				<GridItem xs={12} sm={12} md={12}>
																					<div>
																						<table>
																							<thead>
																								<tr>
																									<th>Email Id</th>
																									<th>Status</th>
																								</tr>
																							</thead>
																							<tbody className="optionalEmails">
																								{this.state.emailArray.length > 0
																									? this.state.emailArray
																									: null}
																							</tbody>
																						</table>
																					</div>
																					<div>
																						<p className="noMachingJob">
																							{this.state.getEmailerror}
																						</p>
																					</div>
																				</GridItem>
																			</GridContainer>
																		</CardBody>
																	</Card>
																</GridContainer>
															</Paper>
														</Grow>
														{/* </ClickAwayListener> */}
													</Popper>
												</Manager>
											</div>
										</GridItem>
										: ''}
								</GridContainer>
							</CardHeader>
							<br />

							<GridContainer style={custom.below}>
								<GridItem xs={12} sm={6} md={6} lg={2}>
									<Card>
										<CardHeader color="logoBlue" icon>
											<CardIcon color="logoBlue">
												<Dialpad />
											</CardIcon>
											<h5 className={classes.cardTitle} id="bRInCartSection">
												{buildReference}
											</h5>
										</CardHeader>
										<CardFooter stats>
											<div className={classes.stats}>
												<Dialpad />
												Build Number
                                            </div>
										</CardFooter>
									</Card>
								</GridItem>

								<GridItem xs={12} sm={6} md={6} lg={2}>
									<Card>
										<CardHeader color="logoYellow" icon>
											<CardIcon color="logoYellow">
												<Cloudcircle />
											</CardIcon>
											<h6 className={classes.cardTitle} id="envInCartSection">
												{environment}
											</h6>
										</CardHeader>
										<CardFooter stats>
											<div className={classes.stats}>
												<Cloudcircle />
												Environment
                                            </div>
										</CardFooter>
									</Card>
								</GridItem>

								<GridItem xs={12} sm={6} md={6} lg={2}>
									<Card>
										<CardHeader color="warning" icon>
											<CardIcon color="warning">
												<Timer />
											</CardIcon>
											<h6 className={classes.cardTitle} id="startTime">
												{startTime}
											</h6>
										</CardHeader>
										<CardFooter stats>
											<div className={classes.stats}>
												<Timer />
												Start Time
                                            </div>
										</CardFooter>
									</Card>
								</GridItem>

								<GridItem xs={12} sm={6} md={6} lg={2}>
									<Card>
										<CardHeader color="logoBlue" icon>
											<CardIcon color="logoBlue">
												<TimerOff />
											</CardIcon>
											<h6 className={classes.cardTitle} id="endTime">
												{endTime}
											</h6>
										</CardHeader>
										<CardFooter stats>
											<div className={classes.stats}>
												<TimerOff />
												End Time
                                            </div>
										</CardFooter>
									</Card>
								</GridItem>

								<GridItem xs={12} sm={6} md={6} lg={2}>
									<Card>
										<CardHeader color="logoYellow" icon>
											<CardIcon color="logoYellow">
												<Schedule />
											</CardIcon>
											<h6 className={classes.cardTitle} id="duration">
												{duration}
											</h6>
										</CardHeader>
										<CardFooter stats>
											<div className={classes.stats}>
												<Schedule />
												Duration
                                           </div>
										</CardFooter>
									</Card>
								</GridItem>

								<GridItem xs={12} sm={6} md={6} lg={2}>
									<Card>
										<CardHeader color="warning" icon>
											<CardIcon color="warning">
												<Traffic />
											</CardIcon>
											<h6 className={classes.cardTitle} id="jobStatus">
												{jobStatus}
											</h6>
										</CardHeader>
										<CardFooter stats>
											<div className={classes.stats}>
												<Traffic />
												Status
                                            </div>
										</CardFooter>
									</Card>
								</GridItem>
							</GridContainer>
						</Card>
					</GridItem>
				</div>
				<br />
				<div>
					<GridContainer style={custom.below}>
						<GridItem xs={12} sm={12} md={12} lg={12}>
							{renderSingleLineGraph}
						</GridItem>
					</GridContainer>
				</div>
				<br />
				<div>
					<GridContainer style={custom.below}>
						{renderTestCaseDetails}
						{renderMultiJobSummary}
					</GridContainer>
				</div>
			</div>
		);
	}
}

BuildDetails.propTypes = {
	classes: PropTypes.object.isRequired,

};

//Mapping the component to current state
function mapStateToProps({
	seleniumBuildResultReducer,
	soapBuildResultReducer,
	sendEmailReducer,
	errorMsgs
}) {
	return {
		seleniumBuildResultReducer,
		soapBuildResultReducer,
		sendEmailReducer,
		errorMsgs
	};
}

export default withStyles(styles)(
	connect(
		mapStateToProps,
		{
			getSeleniumBuildResult,
			getSoapBuildResult,
			getAllReadySentEmails,
			postEmail
		}
	)(BuildDetails)
);
