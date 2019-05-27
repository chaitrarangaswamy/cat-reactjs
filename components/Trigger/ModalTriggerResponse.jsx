import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "../../components/Snackbar/Snackbar";

// import notificationsStyle from "../../assets/jss/material-dashboard-pro-react/views/notificationsStyle";

import AddAlert from "@material-ui/icons/AddAlert";
// import Close from "@material-ui/icons/Close";


const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    overflow: "auto",
    maxHeight: 300
  }
});

class ModalTriggerResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      br: false
    };

    this.renderElement = this.renderElement.bind(this);
  }

  componentWillMount() {
    this.setState({ br: this.props.status });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ br: newProps.status });
  }

  renderElement() {
    let renderElementBuildData;
    let renderElementBgColor;
    if (this.props.item.reason) {
      renderElementBuildData = this.props.item.reason;
      renderElementBgColor = "danger";
    } else if (this.props.item.data) {
      renderElementBgColor = "success";
      let jobResponse = this.props.item.data;

      let noramljobName,
        normaljobBuildno,
        // inQueuejobname,
        // inQueueNextbuildno,
        inQueueMessage,
        allJobsStarted,
        subBuildsNewarray = [];
      let finalSubBuildData;
      if (jobResponse !== null && jobResponse !== undefined) {
        if (jobResponse.downstreamProjects.length > 0) {
          // Parent Job
          if (jobResponse.inQueue && jobResponse.inQueue === true) {
            //job in queue has a tentative build no
            noramljobName = jobResponse.displayName;
            normaljobBuildno = "--";
            inQueueMessage = "JOB IS IN QUEUE" + jobResponse.queueReason;
          } else if (
            jobResponse.inProgress &&
            jobResponse.inProgress === true
          ) {
            allJobsStarted =
              jobResponse.lastBuild.subBuilds && // check if all projects have started
              jobResponse.lastBuild.subBuilds.length ===
              jobResponse.downstreamProjects.length;
            if (!allJobsStarted) {
              if (
                jobResponse.lastBuild.subBuilds &&
                jobResponse.lastBuild.subBuilds.length > 0
              ) {
                for (
                  var i = 0;
                  i < jobResponse.downstreamProjects.length;
                  i++
                ) {
                  for (
                    var j = 0;
                    j < jobResponse.lastBuild.subBuilds.length;
                    j++
                  ) {
                    if (
                      jobResponse.lastBuild.subBuilds[j].jobName !==
                      jobResponse.downstreamProjects[i].name
                    ) {
                      var obj = {};
                      obj.jobName = jobResponse.downstreamProjects[i].name;
                      obj.buildNumber = "The job is yet to start";
                      subBuildsNewarray.push(obj);
                    } else {
                      subBuildsNewarray.push(
                        jobResponse.lastBuild.subBuilds[j]
                      );
                    }
                  }
                }
              } else {
                for (
                  var k = 0;
                  k < jobResponse.downstreamProjects.length;
                  k++
                ) {
                  var object = {};
                  object.jobName = jobResponse.downstreamProjects[k].name;
                  object.buildNumber = "The job is yet to start";
                  subBuildsNewarray.push(object);
                }
              }
            } else {
              subBuildsNewarray = jobResponse.lastBuild.subBuilds;
            }
          } else {
            noramljobName = jobResponse.displayName;
            normaljobBuildno = "yet to start";
          }
        } else {
          // Normal Job
          if (jobResponse.queueItem === null) {
            noramljobName = jobResponse.displayName;
            normaljobBuildno = jobResponse.lastBuild.number;
          } else {
            noramljobName = jobResponse.displayName;
            normaljobBuildno = "--";
            inQueueMessage = "JOB IS IN QUEUE" + jobResponse.queueReason;
          }
        }
      }

      finalSubBuildData = subBuildsNewarray.map(data => {
        return (
          <tr>
            <td>{data.jobName}</td>
            <td>{data.buildNumber}</td>
          </tr>
        );
      });

      renderElementBuildData = (
        <table>
          <thead>
            <tr>
              <th>JobName</th>
              <th>BuildNumber</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{noramljobName}</td>
              <td>{normaljobBuildno}</td>
            </tr>
            {subBuildsNewarray ? finalSubBuildData : null}
            {inQueueMessage ? (
              <tr>
                <td colSpan="2">{inQueueMessage}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      );
    }

    if (renderElementBuildData !== undefined) {
      return (
        <React.Fragment>
          <Snackbar
            place="br"
            color={renderElementBgColor}
            icon={AddAlert}
            message={renderElementBuildData}
            open={this.state.br}
            closeNotification={() => this.setState({ br: false })}
            close
          />
        </React.Fragment>
      );
    }
  }

  render() {
    // const { classes } = this.props;
    return <div>{this.renderElement()}</div>;
  }
}

ModalTriggerResponse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ModalTriggerResponse);