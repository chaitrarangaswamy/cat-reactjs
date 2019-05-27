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
        return (
            <div>
                <h5>{response.displayName} job started</h5>
                <h5>Build Number: {response.lastBuild.number}</h5>
            </div>
        );
    };

    componentDidMount() {
        if (!R.isEmpty(this.props.selenium)) {
            this.setState({ snackBar: true })
        }
    };

    componentWillUnmount() {
        this.props.flushOutTriggerData()
    }

    render() {
        const { selenium } = this.props;

        return (
            <div>
                <React.Fragment>
                    <Snackbar
                        place='br'
                        color='success'
                        icon={AddAlert}
                        message={this.renderMessage(selenium)}
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