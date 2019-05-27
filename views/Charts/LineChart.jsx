import React, { Component } from 'react';
import * as R from 'ramda';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import tooltip from 'chartist-plugin-tooltip';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
import Assessment from '@material-ui/icons/Assessment';

// core components
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader';
import CardIcon from '../../components/Card/CardIcon';
import CardBody from '../../components/Card/CardBody';
import CardFooter from '../../components/Card/CardFooter';
import chartsStyle from '../../assets/jss/material-dashboard-pro-react/views/chartsStyle';
import LineLegend from './LineLegend';


class LineChart extends Component {
	constructor() {
		super();
		this.state = {
			suiteName: [],
			calculatedArray: [],
			label: [],
			duration: 0
		};
	}

	//returns an array with suiteName
	suiteName = item => {
		return R.map(prop => prop.testCollectionName, item);
	};

	//returns an array with testcaseResult and duration took to execute each TC
	calculateDuration = calculate => {
		return R.map(test => this.eachTestcases(test), calculate);
	};

	eachTestcases = testcases => {
		const durationArray = [];
		if (this.props.type === 'Selenium') {
			R.map(test => {
				const timeElapsed = test.duration;
				return durationArray.push({
					meta: test.testcaseResult + ' (min)',
					value: this.calculateInMinutes(timeElapsed)
				})
			}, testcases);
		} else if (this.props.type === 'SoapUI') {
			R.map(test => {
				const timeElapsed = test.duration;
				return durationArray.push({
					meta: test.testcaseResult + ' (sec)',
					value: this.calculateInSeconds(timeElapsed)
				})
			}, testcases);
		}
		return durationArray.length > 0 ? this.roundedArray(durationArray) : '';
	};

	roundedArray = durations => {
		const arrayToReturn = [];
		R.map(each => {
			if (each.value !== null) {
				each.value = each.value.toFixed(2);
				arrayToReturn.push(each);
			}
			return arrayToReturn;
		}, durations);
		return arrayToReturn;
	};

	//This function calculates time taken for each testcase to execute in minutes
	calculateInMinutes = (durationString) => {
		if (durationString && durationString.length > 2) {
			const hh = parseInt(durationString.substring(0, 2), 10);
			const min = parseInt(durationString.substring(6, 8), 10);
			const secs = parseInt(durationString.substring(13, 15), 10);
			return hh * 60 + min + secs / 60;
		} else {
			return null;
		}
	};

	calculateInSeconds = (durationString) => {
		if (durationString && durationString.length > 2) {
			const hh = parseInt(durationString.substring(0, 2), 10);
			const min = parseInt(durationString.substring(6, 8), 10);
			const secs = parseInt(durationString.substring(13, 15), 10);
			return hh * 3600 + min * 60 + secs;
		} else {
			return null;
		}
	}

	//Retrieves calculated durations in minutes, for each TC
	totalTestCasesDuration = durationArray => {
		return R.map(each => this.calculatedDurations(each), durationArray);
	};
	calculatedDurations = arr => {
		return R.map(each => each.value, arr);
	};

	//returns labeldata,to setup X-axis
	label = length => {
		const lengthOfEachArray = R.map(each => each.length, length);
		const maxLength = R.reduce(R.maxBy(n => n), 0, lengthOfEachArray);
		let a = 1;
		const labelData = [];
		for (let i = 0; i < maxLength; i++) {
			labelData[i] = a;
			a++;
		}
		return labelData;
	};

	componentDidMount() {
		const testCaseDetails = this.props.item.testcaseDetails;

		const suiteNames = this.suiteName(testCaseDetails);
		this.setState({
			suiteName: [...this.state.suiteName, ...suiteNames]
		});

		const final = R.compose(
			this.calculateDuration,
			R.map(prop => prop.testcases)
		)(testCaseDetails);
		this.setState({
			calculatedArray: [...this.state.calculatedArray, ...final]
		});

		const totalDuration = this.totalTestCasesDuration(final);
		const durationsMerged = [].concat.apply([], totalDuration);

		//setting Y-axis
		this.setState({
			duration: Math.ceil(Math.max.apply(Math, durationsMerged))
		});

		const labelData = this.label(totalDuration);
		this.setState({
			label: [...this.state.label, ...labelData]
		});
	}

	render() {
		const { classes, item } = this.props;
		const jobName = item.jobDetails.jobName;
		const { suiteName, calculatedArray, duration, label } = this.state;
		//render LineLegend
		const renderLineLegend = suiteName.map((data, index) => {
			return <LineLegend item={data} index={index} key={index} />;
		});

		const coloredLinesChart = {
			data: {
				labels: label,
				series: calculatedArray
			},
			options: {
				lineSmooth: Chartist.Interpolation.cardinal({
					tension: 10
				}),
				axisY: {
					showGrid: true,
					onlyInteger: true,
					offset: 40
				},
				axisX: {
					showGrid: false
				},
				low: 0,
				high: duration,
				showPoint: true,
				height: '300px',
				plugins: [tooltip()]
			},
			animation: {
				draw: function (data) {
					if (data.type === 'line' || data.type === 'area') {
						data.element.animate({
							d: {
								begin: 600,
								dur: 700,
								from: data.path
									.clone()
									.scale(1, 0)
									.translate(0, data.chartRect.height())
									.stringify(),
								to: data.path.clone().stringify(),
								easing: Chartist.Svg.Easing.easeOutQuint
							}
						});
					} else if (data.type === 'point') {
						if (R.contains('FAIL', data.meta)) {
							data.element._node.setAttribute('style', 'stroke: #8B0000 !important; stroke-width:  10px');
						} else if (R.contains('PASS', data.meta)) {
							data.element._node.setAttribute('style', 'stroke: #008000 !important; stroke-width: 10px');
						} else {
							data.element._node.setAttribute('style', 'stroke: #b3f442 !important; stroke-width: 10px')
						}
						// R.contains('FAIL', data.meta) ?
						// 	data.element._node.setAttribute('style', 'stroke: #8B0000 !important; stroke-width:  10px')
						// 	: data.element._node.setAttribute('style', 'stroke: #008000 !important; stroke-width: 10px');
						data.element.animate({
							opacity: {
								begin: (data.index + 1) * 80,
								dur: 500,
								from: 0,
								to: 1,
								easing: 'ease'
							}
						});
					}
				}
			}
		};

		const custom = {
			cardMargin: {
				marginBottom: "0px"
			}
		}
		return (
			<Card style={custom.cardMargin}>
				<CardHeader color='logoBlue' icon>
					<CardIcon color='logoBlue'>
						<Assessment />
					</CardIcon>
					<h4 className={classes.cardIconTitle}>{jobName}</h4>
				</CardHeader>
				<CardBody>
					<ChartistGraph
						data={coloredLinesChart.data}
						type='Line'
						options={coloredLinesChart.options}
						listener={coloredLinesChart.animation}
						className='custom-line-chart-style'
					/>
				</CardBody>
				<CardFooter stats className={classes.cardFooter}>
					<h6 className={classes.legendTitle}>Legend</h6>
					<ul className='ct-legend'>{renderLineLegend}</ul>
				</CardFooter>
			</Card>
		);
	}
}

export default withStyles(chartsStyle)(LineChart);
