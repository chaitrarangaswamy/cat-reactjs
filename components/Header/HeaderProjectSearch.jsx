import React from "react";
// import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// @material-ui icons
import Search from "@material-ui/icons/Search";
import CustomInput from "../../components/CustomInput/CustomInput";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../CustomButtons/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import headerLinksStyle from "../../assets/jss/material-dashboard-pro-react/components/headerLinksStyle";
import SpinnerComponent from "../../views/spinner/spinner.jsx";
import * as actions from "../../actions";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 0
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center"
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

class HeaderProjectSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      projectName: null,
      release: null,
      type: "OR",
      jobName: []
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }
  onChangeSelect(e) {
    this.setState({ type: e.target.value }, () => {});
  }

  searchHandler(e) {
    e.preventDefault();
    const searchData = {};
    this.setState({ loading: true });
    if (this.state.projectName !== null || this.state.release !== null) {
      this.setState({ loading: false });
      searchData["projectName"] = this.state.projectName;
      searchData["release"] = this.state.release;
      searchData["logicalOp"] = this.state.type;
      this.props.searchProjectRelease(searchData);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes, theme } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary
      })
    };

    const custom = {
      spinner: {
        position: "absolute",
        top: "250px",
        left: "0px",
        bottom: "0px",
        right: "0px",
        zIndex: 6
      },
      formWidth: {
        width: "100%"
      },
      selectAlign: {
        marginTop: "13px"
      }
    };

    const { loading } = this.state;

    const spinner = loading ? (
      <div style={custom.spinner}>
        <SpinnerComponent />
      </div>
    ) : null;

    return (
      <React.Fragment>
        {spinner}
        <form style={custom.formWidth}>
          <GridContainer>
                 <GridItem xs={2} sm={2} md={3}>
                  <CustomInput
                    classes={classes}
                    styles={selectStyles}
                    name="projectName"
                    id="projectName"
                    inputProps={{
                      onChange: this.onChange,
                      type: "text",
                      name: "projectName",
                      placeholder: "Project Name"
                    }}
                    value={this.state.projectName}
                    onChange={this.onChange}
                  />
                </GridItem>
                <GridItem xs={2} sm={2} md={3}>
                <CustomInput
                  classes={classes}
                  styles={selectStyles}
                  name="release"
                  id="release"
                  inputProps={{
                    onChange: this.onChange,
                    type: "text",
                    name: "release",
                    placeholder: "Release Number"
                  }}
                  value={this.state.release}
                  onChange={this.onChange}
                />
                </GridItem>
                <GridItem xs={2} sm={2} md={2}>
                <Select
                  value={this.state.type}
                  onChange={this.onChangeSelect}
                  inputProps={{
                    name: "type",
                    id: "type"
                  }}
                  style={custom.selectAlign}
                >
                  <MenuItem value="OR">OR</MenuItem>
                  <MenuItem value="AND">AND</MenuItem>
                </Select>
                </GridItem>
                <GridItem xs={2} sm={2} md={2}>
                <Button
                  type="submit"
                  color="white"
                  aria-label="edit"
                  justIcon
                  round
                  onClick={this.searchHandler}
                >
                  <Search
                    className={
                      classes.headerLinksSvg + " " + classes.searchIcon
                    }
                  />
                </Button>
                </GridItem>
                <div className={classes.divider} />
          </GridContainer>
        </form>
      </React.Fragment>
    );
  }
}

HeaderProjectSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool,
  getSeleniumJobsCount: PropTypes.func.isRequired,
  getSoapJobsCount: PropTypes.func.isRequired,
  searchProjectRelease: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

//Mapping the component to current state
function mapStateToProps({
  seleniumReducer,
  soapReducer,
  jenkins,
  searchProjectReleaseReducer
}) {
  return {
    seleniumReducer,
    soapReducer,
    jobName: jenkins.jobName,
    searchProjectReleaseReducer
  };
}

export default withStyles(styles, { withTheme: true }, headerLinksStyle)(
  connect(
    mapStateToProps,
    actions
  )(HeaderProjectSearch)
);
