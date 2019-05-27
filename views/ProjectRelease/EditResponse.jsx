import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "../../components/Snackbar/Snackbar";

// import notificationsStyle from "../../assets/jss/material-dashboard-pro-react/views/notificationsStyle";

// import Close from "@material-ui/icons/Close";

import * as actions from "../../actions";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 10,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    overflow: "auto",
    maxHeight: 300
  }
});

class EditProjectReleaseResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
 componentWillReceiveProps(newProps) {
     if(newProps.editResponse.status) 
     this.setState({ open: true });
  }
render(){
   const renderResponse = this.props.editResponse.status === 200 ? (
      <div>
          <p>Data edited successfully</p>
     </div>
  ) : (
      <div>
          <p>Data could not be edited</p>
          </div>
  )
  const renderElementBgColor = this.props.editResponse.status === 200 ? "success" : "danger"
    return(
        <div>
          <React.Fragment>
        <Snackbar
          place="br"
          color={renderElementBgColor}
          message={renderResponse}
          open={this.state.open}
          closeNotification={() => this.setState({ open: false })}
          close
        />
      </React.Fragment>
        </div>
    )
}
}

function mapStateToProps({ projectreleaseReducer }) {
  return {
   editResponse: projectreleaseReducer.editResponse
  };
}


export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  )
)(EditProjectReleaseResponse);