import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import AddAlert from '@material-ui/icons/AddAlert';

import Snackbar from '../../../components/Snackbar/Snackbar';
import { flushOutTriggerData } from '../../../actions/metaDataActions';


class TriggerResponse extends Component {
	state = {
		snackBar: false
	}

	renderMessage = (response) => {
		if (R.type(response) === 'Array') {
			return R.map(item => {
				return (
					<div key={item.name}>
						<h5>JobName : {' '}{item.name}</h5>
						<h5>BuildNumber : {' '}{item.nextBuildNumber}</h5>
					</div>
				)
			}, response);
		} else if (R.type(response) === 'Object') {
			return (
				<div>
					<h5>Master Job : {response.name}</h5>
					<h5>BuildNumber : {response.lastBuild.number}</h5>
					<h5>Child Jobs: </h5>
					{this.getSubBuilds(response.lastBuild.subBuilds)}
				</div>
			);
		}
	};

	getSubBuilds = (subBuild) => {
		return R.map(child => {
			return (
				<div key={child.jobName}>
					<h5>JobName: {child.jobName} {'  '} BuildNumber: {child.buildNumber} </h5>
				</div>
			)
		}, subBuild)
	};

	componentDidMount() {
		if (!R.isEmpty(this.props.soap)) {
			this.setState({ snackBar: true })
		}
	};

	componentWillUnmount() {
		this.props.flushOutTriggerData()
	}

	render() {
		const { soap } = this.props;

		return (
			<div>
				<React.Fragment>
					<Snackbar
						place='br'
						color='success'
						icon={AddAlert}
						message={this.renderMessage(soap)}
						open={this.state.snackBar}
						closeNotification={() => { this.setState({ snackBar: false }) }}
						close
					/>
				</React.Fragment>
			</div>
		)
	}
};

export default connect(null, { flushOutTriggerData })(TriggerResponse);