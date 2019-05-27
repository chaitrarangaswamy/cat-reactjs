import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as R from 'ramda';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// core components
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

import MetaDataTables from './seleniumMetaData/MetaDataTable';
import SoapMetaData from './soapConfigs/SoapMetaData';
import {
	searchMetaDataTagsSelenium,
	fetchSeleniumItems,
	getSoapConfigs,
	getMetaDataSeleniumAddon,
	fetchSeleniumTags,
	tabValue,
	flushMetaData,
	flushMetaSearchData,
	removeSearch
} from '../../actions/metaDataActions';
import dashboardStyle from '../../assets/jss/material-dashboard-pro-react/views/dashboardStyle';
import SpinnerComponent from '../spinner/spinner';
import ErrorComponent from '../Errorcomponent/Errorcomponent';
import SeleniumAddonSearch from '../MetaData/seleniumMetaData/seleniumAddonSearch'

function TabContainer(props) {
	return (
		<Typography component='div' style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: propTypes.node.isRequired
};

const style = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	},
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 75,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
	},
	button: {
		margin: theme.spacing.unit,
	}
});

const GAP = 150;
class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			value: 0,
			width: 0
		};
		this.handleScroll = this.handleScroll.bind(this);
		this.setRootRef = this.setRootRef.bind(this);
	}

	handleChange = (event, value) => {
		this.setState({ value }, () => {
			this.props.tabValue(value);
		});
	};
	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	handleClose = value => {
		this.setState({ open: false });
	};

	handleOpen() {
		this.setState({ open: true });
	}

	getModalStyle() {
		const top = 50;
		const left = 50;
		let width;
		if (this.state.width < 960) width = '75%';
		else width = '600px';
		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
			width: `${width}`
		};
	}

	componentDidMount() {
		const { handleScroll } = this;
		const { itemsCurrentPage, fetchSeleniumItems, getSoapConfigs, tabValue } = this.props;
		const { value } = this.state;
		fetchSeleniumItems(itemsCurrentPage).then(handleScroll);
		getSoapConfigs();
		window.addEventListener('scroll', this.handleScroll, false);
		tabValue(value);
		this.props.getMetaDataSeleniumAddon();
	};

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll, false);
		this.props.flushMetaData();
		this.props.removeSearch();
		this.props.flushMetaSearchData();
	};

	componentWillReceiveProps(newProps) {
		const { handleScroll } = this;
		const { seleniumTags } = this.props;
		if (seleniumTags !== newProps.seleniumTags) {
			this.props.flushMetaSearchData();
			this.props.fetchSeleniumTags(0).then(handleScroll)
		}
	}

	handleScroll() {
		const {
			fetchSeleniumItems,
			itemsCurrentPage,
			seleniumMetaDataSpinner,
			searchLastPage,
			searchPageCount,
			itemLastPage,
			fetchSeleniumTags
		} = this.props;
		const { handleScroll, rootRef } = this;
		const { innerHeight, scrollY } = window;
		if (this.rootRef && this.rootRef.offsetTop !== null) {
			const { offsetTop, scrollHeight } = rootRef;
			if (innerHeight + scrollY > (offsetTop + scrollHeight) - GAP &&
				!seleniumMetaDataSpinner) {
				if (!R.isEmpty(this.props.searchSeleniumResults) && searchPageCount <= searchLastPage && !this.props.stopScrolling) {
					fetchSeleniumTags(searchPageCount + 1).then(handleScroll);
				} else {
					if (itemsCurrentPage !== itemLastPage && !this.props.triggerSearch) {
						fetchSeleniumItems(itemsCurrentPage + 1).then(handleScroll)
					}
				}
			}
		}
	};

	setRootRef(element) {
		this.rootRef = element;
	}

	render() {
		const { classes } = this.props;
		const { value } = this.state;
		const { setRootRef } = this;

		const serverAlert = (
			<div>
				<ErrorComponent />
			</div>
		);

		const dashboardComponents = (
			<div className={classes.root}  >
				{value === 0 ? <GridItem xs={12} sm={12} md={12}>
					<SeleniumAddonSearch seleniumData={this.props.seleniumResponse} />
				</GridItem> : ''}
				<br />
				<AppBar position='static'>
					<Tabs value={value} onChange={this.handleChange}>
						<Tab label='Functional Testing' />
						<Tab label='API Testing' />
					</Tabs>
				</AppBar>
				{value === 0 && (
					<TabContainer>
						<GridContainer>
							<GridItem xs={12}>
								<div ref={setRootRef}>
									<MetaDataTables />
								</div>
							</GridItem>
						</GridContainer>
					</TabContainer>
				)}
				{value === 1 && (
					<TabContainer>
						<GridContainer>
							<GridItem xs={12}>
								<SoapMetaData />
							</GridItem>
						</GridContainer>
					</TabContainer>
				)}
			</div>
		);

		return (
			<div >
				{this.props.isAuthenticated ? (
					<div>
						<div>
							{this.props.errorMsgs.crosError ? serverAlert : ''}
							{this.props.seleniumMetaDataSpinner || this.props.searchSeleniumMetaSpinner
								|| this.props.soapSpinner ?
								(
									<SpinnerComponent />
								) : (
									dashboardComponents
								)}
						</div>

					</div>
				) : (
						<Redirect to='/pages/login-page' />
					)}
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: propTypes.object.isRequired,
	errorMsgs: propTypes.object.isRequired,
	getMetaDataSeleniumAddon: propTypes.func.isRequired,
	fetchSeleniumItems: propTypes.func.isRequired,
	fetchSeleniumTags: propTypes.func.isRequired,
	getSoapConfigs: propTypes.func.isRequired,
	flushMetaData: propTypes.func.isRequired,
	flushMetaSearchData: propTypes.func.isRequired,
	removeSearch: propTypes.func.isRequired,
};

//Mapping the component to current state
function mapStateToProps({ errorMsgs, auth, seleniumTagSearchResults, getMetaDataSeleniumReducer, seleniumMetaTrigger, searchMetaDataSeleniumReducer, getSoapConfigsReducer, getSeleniumAddonSearch }) {
	return {
		errorMsgs: errorMsgs,
		isAuthenticated: auth.isAuthenticated,
		seleniumMetaDataSpinner: seleniumMetaTrigger.loading,
		searchSeleniumMetaSpinner: searchMetaDataSeleniumReducer.loading,
		seleniumTags: searchMetaDataSeleniumReducer.searchedValue.metaTags,
		searchSeleniumResults: seleniumTagSearchResults,
		triggerSearch: searchMetaDataSeleniumReducer.triggerSearch,
		seleniumResponse: getSeleniumAddonSearch.seleniumResponse,
		searchPageCount: searchMetaDataSeleniumReducer.currentPage,
		searchLastPage: searchMetaDataSeleniumReducer.lastPage,
		itemsCurrentPage: getMetaDataSeleniumReducer.currentPage,
		itemLastPage: getMetaDataSeleniumReducer.lastPage,
		soapSpinner: getSoapConfigsReducer.loading,
		stopScrolling: searchMetaDataSeleniumReducer.stopScrolling
	};
}

export default withStyles(dashboardStyle, style)(
	connect(
		mapStateToProps,
		{
			searchMetaDataTagsSelenium,
			fetchSeleniumItems,
			getSoapConfigs,
			fetchSeleniumTags,
			getMetaDataSeleniumAddon,
			tabValue,
			flushMetaSearchData,
			flushMetaData,
			removeSearch
		}
	)(Dashboard)
);
