import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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

const custom = {
  tablewidth: {
    textAlign: "center",
    fontSize: "18px"
  },
  linkStyle: {
    color: "#ffffff"
  }
};

class ErrorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }
  render() {
    return (
      <React.Fragment>
        <Snackbar
          place="br"
          color="danger"
          message={
            <table
              style={custom.tablewidth}
              className="custom-style-server-error"
            >
              <thead>
                <tr>
                  <th>No job is executed in project and release combined</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Please go to{" "}
                    <Link to="/dashboard" style={custom.linkStyle}>
                      dashboard
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          }
          open={this.state.open}
          closeNotification={() => this.setState({ open: false })}
          close
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps({ errorMsgs }) {
  return {
    errors: errorMsgs
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  )
)(ErrorComponent);
