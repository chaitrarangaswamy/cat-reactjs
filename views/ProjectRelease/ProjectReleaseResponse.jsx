import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "../../components/Snackbar/Snackbar";
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

class ProjectReleaseResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
 componentWillReceiveProps(newProps) {
  //  console.log(newProps,"newProps")
     if(newProps.createResponse.status) 
     this.setState({ open: true });
  }
render(){
   const renderResponse = this.props.createResponse && this.props.createResponse.status === 200 ? (
      <div>
          <p>Data created successfully</p>
     </div>
  ) : (
      <div>
          <p>Data is not created</p>
      </div>
  )
  const renderElementBgColor = this.props.createResponse && this.props.createResponse.status === 200 ? "success" : "danger";
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
  createResponse: projectreleaseReducer.response
  };
}


export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  )
)(ProjectReleaseResponse);