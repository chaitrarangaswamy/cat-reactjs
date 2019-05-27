import React from 'react';
// react component for creating dynamic tables
import ReactTable from 'react-table';
import * as R from 'ramda';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Assignment from '@material-ui/icons/Assignment';
import Dvr from '@material-ui/icons/Dvr';

// core components
import Button from '@material-ui/core/Button';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import CardIcon from '../../components/Card/CardIcon';

import TestLogs from './TestLogs';

import {
	cardTitle,
	roseColor
} from '../../assets/jss/material-dashboard-pro-react';
import Tooltip from 'react-tooltip-lite';

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

class TestSuiteDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			openLogs: false,
			results: {}
		};
		this.handleEvent = this.handleEvent.bind(this);
		this.handleLogs = this.handleLogs.bind(this);
	}
	//sets Pass to green, fail to red, and skip to blue
	setColor(data) {
		let setcolor;
		const customStyle = {
			pass: {
				color: '#328e35'
			},
			fail: {
				color: '#e01b1b'
			},
			skip: {
				//color: '#2735e0'
				color: '#b3f442'
			}
		};
		if (data === 'PASS') {
			setcolor = customStyle.pass;
		} else if (data === 'FAIL') {
			setcolor = customStyle.fail;
		} else if (data === 'SKIP') {
			setcolor = customStyle.skip;
		}
		return setcolor;
	}

	handleEvent = (eachTestCaseDetail) => {
		this.setState({ openLogs: !this.state.openLogs });
		this.setState({ results: { ...eachTestCaseDetail } });
	};

	handleLogs = () => {
		this.setState({ openLogs: false })
	}

	//Renders header, i.e test suite names for each react table
	renderHeader = (eachSuite, { ...classes }) => {
		return (
			<CardHeader color='logoBlue' icon>
				<h4 className={classes.cardIconTitle}>
					<strong>{eachSuite.testCollectionName}</strong>
				</h4>
			</CardHeader>
		);
	}

	//Renders table body
	renderTableBody = (testCaseDetails) => {
		return R.map((eachTest, key) => {
			return {
				id: key,
				testId: eachTest.testId,
				testDescription: eachTest.testDescription.scenarioLabel,
				confirmationNumber: eachTest.confirmationNumber,
				testcaseResult: eachTest.testcaseResult,
				duration: eachTest.duration,
				comments: eachTest.comments,
				actions: (
					<Button
						style={this.setColor(eachTest.testcaseResult)}
						onClick={() => this.handleEvent(eachTest)}
					>
						<Dvr />
					</Button>
				)
			}
		}, testCaseDetails.testcases);
	}

	render() {
		const { classes } = this.props;
		const customStyle = {
			pass: {
				color: '#328e35'
			},
			fail: {
				color: '#e01b1b'
			},
			skip: {
				//color: '#2735e0'
				color: '#b3f442'			
			}
		};

		return (
			<GridItem xs={12}>
				<Card>
					<CardHeader color='logoBlue' icon>
						<CardIcon color='logoBlue'>
							<Assignment />
						</CardIcon>
						{this.renderHeader(this.props.testSuiteItem, classes)}
					</CardHeader>
					<CardBody>
						<ReactTable
							columns={[
								{
									Header: 'Id #',
									accessor: 'testId',
									maxWidth: 58
								},
								{
									Header: 'Test Name',
									accessor: 'testDescription',
									Cell: row => {
										return (
											<Tooltip
												content={
													<div className={classes.customWidth}>
														{row.original.testDescription}
													</div>
												}
											>
												<div className={classes.testNameEllipsis}>
													{row.original.testDescription}
												</div>
											</Tooltip>
										);
									}
								},
								{
									Header: 'Confirmation #',
									accessor: 'confirmationNumber',
									maxWidth: 140,
									Cell: row => {
										return (
											<Tooltip
												content={<div>{row.original.confirmationNumber}</div>}
											>
												<div className={classes.testNameEllipsis}>
													{row.original.confirmationNumber}
												</div>
											</Tooltip>
										);
									}
								},
								{
									Header: 'Result',
									accessor: 'testcaseResult',
									Cell: row => {
										let data = row.value;
										let setColor;
										if (row.value === 'PASS') {
											setColor = <div style={customStyle.pass}>{data}</div>;
										} else if (row.value === 'FAIL') {
											setColor = <div style={customStyle.fail}>{data}</div>;
										} else {
											setColor = <div style={customStyle.skip}>{data}</div>;
										}
										return (
											<div>
												<b>{setColor}</b>
											</div>
										);
									}
								},
								{
									Header: 'Duration',
									accessor: 'duration',
									maxWidth: 150
								},
								{
									Header: 'Comments',
									accessor: 'comments',
									Cell: row => {
										return (
											<Tooltip
												content={
													<div className={classes.customWidth}>
														{row.original.comments}
													</div>
												}
											>
												<div className={classes.commentsEllipsis}>
													{row.original.comments}
												</div>
											</Tooltip>
										);
									}
								},
								{
									Header: 'Test Logs',
									accessor: 'actions',
									sortable: false,
									filterable: false,
									maxWidth: 83
								}
							]}
							data={this.renderTableBody(this.props.testSuiteItem)}
							showPaginationTop
							showPaginationBottom={false}
							filterable
							defaultPageSize={10}
							className='-striped -highlight'
						/>
						<div>
							{this.state.openLogs ?
								<TestLogs modal={true} logs={this.state.results} modalClose={this.handleLogs} />
								: ''};
							</div>
					</CardBody >
				</Card >
			</GridItem >
		);
	}
}

export default withStyles(styles)(TestSuiteDetail);
