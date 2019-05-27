import React, { Component } from 'react';
import * as R from 'ramda';
import JSONTree from 'react-json-tree';


import Modal from '@material-ui/core/Modal';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import CardBody from '../../components/Card/CardBody';


import {
	cardTitle,
	roseColor
} from '../../assets/jss/material-dashboard-pro-react';


const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 500,
		position: 'relative',
		overflow: 'auto',
		maxHeight: 300
	},
	affected: {
		textAlign: 'right'
	},
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 75,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
	},
	chip: {
		margin: theme.spacing.unit
	},
	cardTitle,
	cardIconTitle: {
		...cardTitle,
		marginTop: '15px',
		marginBottom: '0px'
	},
	cardTitleWhite: {
		...cardTitle,
		color: '#FFFFFF',
		marginTop: '0'
	},
	cardCategoryWhite: {
		margin: '0',
		color: 'rgba(255, 255, 255, 0.8)',
		fontSize: '.875rem'
	},
	cardCategory: {
		color: '#999999',
		marginTop: '10px'
	},
	icon: {
		color: '#333333',
		margin: '10px auto 0',
		width: '130px',
		height: '130px',
		border: '1px solid #E5E5E5',
		borderRadius: '50%',
		lineHeight: '174px',
		'& svg': {
			width: '55px',
			height: '55px'
		}
	},
	iconRose: {
		color: roseColor
	},
	marginTop30: {
		marginTop: '30px'
	},
	testimonialIcon: {
		marginTop: '30px',
		'& svg': {
			width: '40px',
			height: '40px'
		}
	},
	cardTestimonialDescription: {
		fontStyle: 'italic',
		color: '#999999'
	},
	h4: {
		color: '#000000'
	},
	testNameEllipsis: {
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},
	commentsEllipsis: {
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},
	customWidth: {
		maxWidth: '400px'
	},
	screenshot: {
		'overflow-x': 'scroll'
	}
});

const themeJson = {
	scheme: 'default',
	base00: '#181818',
	base01: '#282828',
	base02: '#383838',
	base03: '#585858',
	base04: '#b8b8b8',
	base05: '#d8d8d8',
	base06: '#e8e8e8',
	base07: '#f8f8f8',
	base08: '#ab4642',
	base09: '#dc9656',
	base0A: '#f7ca88',
	base0B: '#a1b56c',
	base0C: '#86c1b9',
	base0D: '#7cafc2',
	base0E: '#ba8baf',
	base0F: '#a16946'
}

class TestLogs extends Component {
	constructor() {
		super();
		this.state = {
			collapseOpen: false,
			collapseUrl: false,
			collapseReqParam: false,
			collapseSelenium: false,
			open: false,
			width: 0
		}
		this.updateWindowWidth = this.updateWindowWidth.bind(this);
		this.handleCollapseUrl = this.handleCollapseUrl.bind(this);
		this.handleCollapseClick = this.handleCollapseClick.bind(this);
		this.handleReqParam = this.handleReqParam.bind(this);
		this.handleClose = this.handleClose.bind(this);
	};

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
	};

	componentDidMount() {
		this.setState({ width: this.updateWindowWidth() });
		window.addEventListener('resize', this.updateWindowWidth);
		this.setState({ open: this.props.modal });
	};

	componentWillMount() {
		this.updateWindowWidth();
	};

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowWidth);
	};

	updateWindowWidth() {
		return window.innerWidth;
	};

	handleCollapseClick = () => {
		this.setState({ collapseOpen: !this.state.collapseOpen });
	};

	handleCollapseUrl = () => {
		this.setState({ collapseUrl: !this.state.collapseUrl });
	};

	handleReqParam = () => {
		this.setState({ collapseReqParam: !this.state.collapseReqParam });
	};

	handleClose = () => {
		this.setState({ open: false, collapseOpen: false });
		this.props.modalClose();
	};

	handleSelenium = () => {
		this.setState({ collapseSelenium: !this.state.collapseSelenium });
	};

	/*
	  Following function is responsible for,
	  rendering result logs for Selenium or Soap
	*/
	renderModelListItem = (logs) => {
		if (!R.isEmpty(logs.resultLogs)) {
			const testLogs = JSON.parse(logs.resultLogs);

			return testLogs.length > 0 ?
				this.renderSeleniumResultLogs(testLogs) :
				this.renderSoapResultLogs(testLogs);
		}
	};

	/*
	 Following function renders Result Logs,
	 Related to Multi/Individual Selenium Jobs	  
	 */
	renderSeleniumResultLogs = (testLogs) => {
		const { collapseSelenium } = this.state;
		const { classes, logs } = this.props;

		return R.map(prop => {
			return (
				<List className={classes.root} key={Math.random().toString()}>
					<ListItem button onClick={this.handleSelenium}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText inset primary={this.renderLabel(logs)} />
						{collapseSelenium ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={collapseSelenium} timeout='auto' unmountOnExit>
						<List component='div' disablePadding>
							<ListItem>
								<ListItemIcon>
									<StarBorder />
								</ListItemIcon>
								<ListItemText>
									{this.renderSeleniumLogs(prop)}
								</ListItemText>
							</ListItem>
						</List>
					</Collapse>
				</List>
			)
		}, testLogs);
	};

	renderSeleniumLogs = (seleniumLogs) => {
		const formattedList = [];
		const screenShot = [];
		R.forEach(eachLine => {
			if (R.contains('screenshot', eachLine)) {
				screenShot.push(this.splt(eachLine));
			} else {
				formattedList.push(R.pipe(R.split(':'), R.takeLast(1))(eachLine));
			}
		}, seleniumLogs.stringValue);
		R.forEach(e => formattedList.push(e), screenShot);
		const merged = [].concat.apply([], formattedList);
		return (R.map((each) => R.contains('png', each) ?
			(<React.Fragment key={Math.random().toString()}>
				<h4>Screen Shot</h4>
				<a target='_blank ' href={each}>
					<img
						src={each}
						alt='ScreenShot is not Available'
					/>
				</a>
			</React.Fragment>) : (<ul key={Math.random().toString()}> <li>{each}</li> </ul>)
			, merged))
	};

	splt = (eachItem) => {
		let toReturn = [];
		const trimmed = R.pipe(R.splitAt(12), R.tail())(eachItem);
		toReturn = [...trimmed];
		return toReturn;
	};

	/*
	 Following function renders Result Logs,
	 Related to Multi/Individual Soap Jobs	  
	 */
	renderSoapResultLogs = (soapLogs) => {
		const { collapseOpen } = this.state;
		const { classes, logs } = this.props;
		if (soapLogs.RRvalues.length > 1) {
			soapLogs.RRvalues.pop();
		}
		return R.map((prop) => {
			return (
				<List className={classes.root} key={Math.random().toString}>
					<ListItemText inset primary={this.renderLabel(logs)} />
					<List className={classes.root}>
						{this.renderRequestedUrl(prop.endpoint)}
					</List>
					<List className={classes.root}>
						{this.renderReqParams(prop)}
					</List>
					<List className={classes.root}>
						<ListItem button onClick={this.handleCollapseClick}>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText inset primary='Response' />
							{collapseOpen ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={collapseOpen} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								{this.renderResponsedata(prop)}
							</List>
						</Collapse>
					</List>
				</List>
			);
		}, soapLogs.RRvalues);
	};

	renderReqParams = (requestParam) => {
		const { collapseReqParam } = this.state;
		return (
			<div>
				<ListItem button onClick={this.handleReqParam}>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText inset primary='Request Parameters' />
					{collapseReqParam ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={collapseReqParam} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						<ListItem>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText>
								{this.renderParamList(requestParam)}
							</ListItemText>
						</ListItem>
					</List>
				</Collapse>
			</div>
		);
	};

	renderResponsedata = (prop) => {
		return (
			<ListItem>
				<ListItemIcon>
					<StarBorder />
				</ListItemIcon>
				<ListItemText>
					<JSONTree data={prop.Response[0]} theme={themeJson} />
				</ListItemText>
			</ListItem>
		);
	};

	renderParamList = (params) => {
		if (!R.isEmpty(params.Request)) {
			return (<JSONTree data={params.Request[0]} theme={themeJson} />)
		} else {
			return 'No Parameters for this service'
		}
	};


	renderRequestedUrl = (endPoint) => {
		const { collapseUrl } = this.state;
		return (
			<div>
				<ListItem button onClick={this.handleCollapseUrl}>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText inset primary='Request Url' />
					{collapseUrl ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={collapseUrl} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						<ListItem>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText secondary={endPoint} />
						</ListItem>
					</List>
				</Collapse>
			</div>
		)
	};


	renderLabel = (logs) => {
		return (<p> Scenario: {logs.testDescription.scenarioLabel}</p>)
	};

	render() {
		const { classes, logs } = this.props;
		const { open } = this.state;
		return (
			<CardBody>
				<Modal
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'
					open={open}
					onClose={this.handleClose}
				>
					<div style={this.getModalStyle()} className={classes.paper}>
						<Typography variant='title' id='modal-title'>
							Test Log
			            </Typography>
						{this.renderModelListItem(logs)}
						<div className={classes.affected}>
							<Button onClick={this.handleClose}>Close</Button>
						</div>
					</div>
				</Modal>
			</CardBody >
		);
	};
}


export default withStyles(styles)(TestLogs);
