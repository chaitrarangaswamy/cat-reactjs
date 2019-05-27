import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";

// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
import { withStyles } from "@material-ui/core/styles";
// @material-ui icons
import Search from "@material-ui/icons/Search";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../CustomButtons/Button";

import headerLinksStyle from "../../assets/jss/material-dashboard-pro-react/components/headerLinksStyle";
import SpinnerComponent from "../../views/spinner/spinner.jsx";

import * as actions from "../../actions";
// import IntegrationReactSelect from "./HeaderJobSearch1"

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 0
	},
	input: {
		display: "flex",
		padding: 0
	},
	valueContainer: {
		display: "flex",
		flexWrap: "wrap",
		flex: 1,
		alignItems: "center"
	},
	noOptionsMessage: {
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
	},
	singleValue: {
		fontSize: 16
	},
	placeholder: {
		position: "absolute",
		left: 2,
		fontSize: 16
	},
	paper: {
		position: "absolute",
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0
	},
	divider: {
		height: theme.spacing.unit * 2
	},
	autosuggest__input: {
		width: '150px',
		height: '30px',
		padding: '10px 20px'
	}


});


class HeaderJobSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			loading: false,
			single: null,
			jobName: [],
			jobNameValue: '',
			jobNameSuggestions: [],
			jobNameLoggedOut: "",
			regSearch: ''
		};
		this.jobSearchHandler = this.jobSearchHandler.bind(this);
	}

	componentDidMount() {
		this.props.get_server();
	}
	componentWillReceiveProps(nxtProps) {
		// console.log(nxtProps,"nxtProps")
		if (nxtProps.jobName) {
			this.jobNameCalc(nxtProps.jobName);
		}
		if (nxtProps.seleniumReducer || nxtProps.soapReducer) {
			this.setState({ loading: false });
		}
	}

	getSuggestions(value) {
		try {
			const regex = new RegExp('^' + value, 'i');
			return this.state.jobName.filter(user => regex.test(user.jobname));
		} catch (e) {
			var newValue = value.replace("(", "").replace(")", "")
			const regex = new RegExp('^' + newValue, 'i');
			return this.state.jobName.filter(user => regex.test(user.jobname));
		}
	}

	getSuggestionNickname(suggestion) {
		return suggestion.jobname;
	}

	renderSuggestion(suggestion) {
		return (
			<span>{suggestion.jobname}</span>
		);
	}

	onJobnameChange = (event, { newValue }) => {
		this.setState({
			jobNameValue: newValue
		});
	};

	onJobnameSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			regSearch: value
		}, () => {
			this.props.myJobsSearchWithJobName(value);
		});
		this.setState({
			jobNameSuggestions: this.getSuggestions(value)
		});

	};

	onJobnameSuggestionsClearRequested = () => {
		this.setState({
			jobNameSuggestions: []
		});
	};

	onJobnameSuggestionSelected = (event, { suggestion }) => {
		this.setState({
			emailValue: suggestion.jobname
		}, () => {
			this.props.myJobsSearchWithJobName(suggestion.jobname);
		});
	};

	// onChangeLoggedOut(e) {
	//   this.setState({ jobNameLoggedOut: e.target.value });
	//   this.props.parentMethod(e.target.value);
	// }

	jobSearchHandler(e, userData, toggleClick) {
		e.preventDefault();
		let searchType;
		let finalJobName = '';
		const searchData = {};
		if (!toggleClick.userToggleClick) {
			if (this.state.emailValue) {
				finalJobName = this.state.emailValue;
				searchType = "exactMatch"
			} else {
				finalJobName = this.state.regSearch;
				searchType = "regularMatch"
			}
			if (finalJobName !== null) {
				this.setState({ loading: true });
				searchData["jobName"] = finalJobName;
				searchData["refresh"] = false;
				searchData["rangeFrom"] = 0;
				searchData["searchType"] = searchType;
				//searchData["rangeCount"] = 5;
				this.props.getSeleniumJobsCount(searchData);
				this.props.getSoapJobsCount(searchData);
			}
		}
		else {
			if (this.state.emailValue) {
				finalJobName = this.state.emailValue;
				searchType = "exactMatch"
			} else {
				finalJobName = this.state.regSearch;
				searchType = "regularMatch"
			}
			if (finalJobName !== null) {
				this.setState({ loading: true });
				searchData["jobName"] = finalJobName;
				searchData["refresh"] = false;
				searchData["rangeFrom"] = 0;
				searchData["searchType"] = searchType;
				//searchData["rangeCount"] = 5;
				var obj = {
					userId: userData.user.userid,
					userName: userData.user.name
				}
				searchData["triggeredBy"] = obj;
				this.props.getSeleniumJobsCount(searchData);
				this.props.getSoapJobsCount(searchData);
			}
		}
		this.setState({
			emailValue: '',
			regSearch: ''
		});
	}




	jobNameCalc(jobNameList) {
		const suggestions = [];
		if (jobNameList && jobNameList.data.jobs.length > 0) {
			jobNameList.data.jobs.map(eachjob => {
				suggestions.push({
					jobname: eachjob.name
				});
				return suggestions;
			});
		}
		this.setState({ jobName: suggestions });
	}

	handleChange = name => value => {
		this.setState({
			[name]: value
		});
		this.props.parentMethod(value);
		this.props.myJobsSearchWithJobName(value);
	};

	render() {
		const {
			jobNameSuggestions,
			jobNameValue
		} = this.state;

		const { classes, rtlActive } = this.props;
		const custom = {
			spinner: {
				position: "absolute",
				top: "250px",
				left: "0px",
				bottom: "0px",
				right: "0px",
				zIndex: 6
			},
			formWidth: {
				width: "103%"
			}
		};
		const nicknameInputProps = {
			placeholder: "Job Search",
			value: jobNameValue,
			onChange: this.onJobnameChange,
		};


		const searchButton =
			classes.top +
			" " +
			classes.searchButton +
			" " +
			classNames({
				[classes.searchRTL]: rtlActive
			});

		const loggedInStatus =
			<div className={classes.root} >
				<Autosuggest
					suggestions={jobNameSuggestions}
					onSuggestionsFetchRequested={this.onJobnameSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onJobnameSuggestionsClearRequested}
					onSuggestionSelected={this.onJobnameSuggestionSelected}
					getSuggestionValue={this.getSuggestionNickname}
					renderSuggestion={this.renderSuggestion}
					inputProps={nicknameInputProps}
				/>
				<div className={classes.divider} />
			</div >

		const button =
			<Button
				type="submit"
				color="white"
				aria-label="edit"
				justIcon
				round
				className={searchButton}
				onClick={e => this.jobSearchHandler(e, this.props.user, this.props.toggleBtnClick)}
			>
				<Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
			</Button>


		const { loading } = this.state;

		const spinner = loading ? (
			<div style={custom.spinner}>
				<SpinnerComponent />
			</div>
		) : null;

		return (
			<React.Fragment>
				{spinner}
				<form style={custom.formWidth}>
					<GridContainer>
						<GridItem sm={10}>
							{loggedInStatus}
						</GridItem>
						{button}
					</GridContainer>
				</form>
			</React.Fragment>
		);
	}
}

HeaderJobSearch.propTypes = {
	classes: PropTypes.object.isRequired,
	rtlActive: PropTypes.bool,
	getSeleniumJobsCount: PropTypes.func.isRequired,
	getSoapJobsCount: PropTypes.func.isRequired,
	theme: PropTypes.object.isRequired
};

//Mapping the component to current state
function mapStateToProps({ seleniumReducer, soapReducer, jenkins, auth, userJobsReducer }) {
	return {
		seleniumReducer,
		soapReducer,
		jobName: jenkins.jobName,
		isAuthenticated: auth.isAuthenticated,
		user: auth,
		toggleBtnClick: userJobsReducer
	};
}

export default withStyles(styles, { withTheme: true }, headerLinksStyle)(
	connect(
		mapStateToProps,
		actions
	)(HeaderJobSearch)
);