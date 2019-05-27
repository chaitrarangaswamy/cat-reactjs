import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Radio from "@material-ui/core/Radio";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Button from "../../components/CustomButtons/Button";
import { connect } from "react-redux";
import {
  createProjectRelease,
} from "../../actions";
import ProjectReleaseResponse from './ProjectReleaseResponse';
import ProjectList from './ProjectList';
import ReleaseList from './ReleaseList';
import EditProjectReleaseResponse from './EditResponse';
import TextField from '@material-ui/core/TextField';
import SpinnerComponent from "../spinner/spinner.jsx";

const styles = theme => ({
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {},
  size: {
    width: 40,
    height: 40
  },
  sizeIcon: {
    fontSize: 20
  },

  align: {
    display: "flex"
  },
  button: {
    display: "block",
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150
  },
  editButton: {
    backgroundColor: "transparent",
    boxShadow: "none",
    color: "black"
  },
  cardIconTitle: {
    color: "black"
  }

});

class ProjectRelease extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedValue: "project",
      allProjectArray: [],
      allReleaseArray: [],
      isDisabled: true,
      projectRelease: "",
      userName: "",
      editStatus: false,
      editObject: {}
    };
    this.postProjectRelease = this.postProjectRelease.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps,"newProps")
    this.setState({ userName: newProps.user });
    if (newProps.createResponse && newProps.createResponse.status === 200) {
      this.setState({ selectedValue: "project", projectRelease: "" })
    }
  }

  onChange = name => event => {
    this.setState({ projectRelease: event.target.value });
  }
  postProjectRelease() {
    if (this.state.selectedValue === "project") {
      var projectdata = {
        projectName: this.state.projectRelease,
        userName: this.state.userName,
        active: true
      };
      this.props.createProjectRelease(projectdata);
    }

    if (this.state.selectedValue === "release") {
      var releasedata = {
        release: this.state.projectRelease,
        userName: this.state.userName,
        active: true
      };
      this.props.createProjectRelease(releasedata);
    }
  }

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };

  canBeSubmitted() {
    const { projectRelease } = this.state;
    return projectRelease.length > 0
  }

  render() {
    console.log(this.props.createResponse,"ii")
    const spinner = this.props.loading ? <div>
        <SpinnerComponent />
      </div>:<div> <ProjectReleaseResponse /> <EditProjectReleaseResponse /></div>
    const { classes } = this.props;
    const isEnabled = this.canBeSubmitted();

    const custom = {
      gridSpace: {
        margin: "20px"
      },
      tableWidth: {
        width: "100%"
      },
      textWidth: {
        width: "100%"
      }

    };
    return (
      <div>
        <GridContainer style={custom.gridSpace}>
          <GridItem xs={6} sm={6} md={3}>
            <Radio
              checked={this.state.selectedValue === "project"}
              onChange={this.handleChange}
              value="project"
              name="radio-button-demo"
              aria-label="Project"
              color="primary"
              id="projectid"
            />
            Project name
          </GridItem>
          <GridItem xs={6} sm={6} md={3}>
            <Radio
              checked={this.state.selectedValue === "release"}
              onChange={this.handleChange}
              value="release"
              name="radio-button-demo"
              aria-label="Release"
              color="primary"
              id="releaseid"
            />
            Release
          </GridItem>
        </GridContainer>

        <GridContainer style={custom.gridSpace}>
          <GridItem xs={6} sm={6} md={8}>
            <TextField
              style={custom.textWidth}
              id="projectRelease"
              label="project/release"
              className={classes.textField}
              value={this.state.projectRelease}
              onChange={this.onChange('projectRelease')}
              margin="normal"
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={2}>
            <Button
              onClick={this.postProjectRelease}
              color="logoBlue"
              disabled={!isEnabled}
              id="create"
            >
              Create
            </Button>
          </GridItem>
        </GridContainer>

        <GridContainer style={custom.gridSpace}>
          <GridItem xs={6} sm={6} md={6}>
            <ProjectList />

          </GridItem>

          <GridItem xs={6} sm={6} md={6}>
            <ReleaseList />

          </GridItem>
         {spinner}
         
        </GridContainer>
      </div>
    );
  }
}

ProjectRelease.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ auth, projectreleaseReducer, jenkins }) {
  return {
    user: auth.user,
    loading:projectreleaseReducer.loading,
    createResponse: projectreleaseReducer.response,
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {
      createProjectRelease,
    }
  )(ProjectRelease)
);