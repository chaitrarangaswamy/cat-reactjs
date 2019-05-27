import React from "react";
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "../../components/CustomButtons/Button";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import Select from 'react-select';
import { connect } from "react-redux";
import { editProjectRelease, setModalClose } from "../../actions";
import TextField from '@material-ui/core/TextField';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    // width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    width: "500px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  input: {
    display: "flex",
    padding: 0
  },

  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "relative",
    left: 2,
    fontSize: 16
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});
function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}
function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}
const components = {
  Option,
  Control
};
const options = [
  { label: "Active" }, { label: "Inactive" }
];
class SimpleModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      openSelect: false,
      selectedOption: null,
      type: "",
      projectRelease: "",
      id: ""
    };
    this.editStatus = this.editStatus.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  componentWillReceiveProps(newProps) {
    // console.log(newProps,"newProps")
    if (newProps.item.hasOwnProperty('_id')) {
      this.setState({ open: true });
    }
    if (newProps.item === false) {
      this.setState({ open: newProps.item });
    }
    if (newProps.item && newProps.item.hasOwnProperty('projectName')) {
      this.setState({ type: "project", projectRelease: newProps.item.projectName, selectedOption: newProps.item.active === true ? options[0] : options[1], id: newProps.item._id });
    }
    else if (newProps.item && newProps.item.hasOwnProperty('release')) {
      this.setState({ type: "release", projectRelease: newProps.item.release, selectedOption: newProps.item.active === true ? options[0] : options[1], id: newProps.item._id })
    }
  }

  editStatus() {
    if (this.state.type === "project") {
      var projectdata = {
        projectName: this.state.projectRelease,
        active: this.state.selectedOption.label === "Active" ? true : false,
        _id: this.state.id
      };
      this.props.editProjectRelease(projectdata);
      this.handleClose();
    }
    if (this.state.type === "release") {
      var releasedata = {
        release: this.state.projectRelease,
        active: this.state.selectedOption.label === "Active" ? true : false,
        _id: this.state.id
      };
      this.props.editProjectRelease(releasedata);
      this.handleClose();
    }

  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.setModalClose();
    // this.setState({ open: false });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }


  onChange = name => event => {
    this.setState({ projectRelease: event.target.value });
  }

  render() {
    const { classes } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: "black"
      })
    };
    const custom = {
      selectWidth: {
        width: "100%",
        marginTop: "10px"
      },
      select: {
        marginTop: "28px"
      }


    }
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <h6>Edit project/release status</h6>
            <GridContainer>
              <GridItem xs={6} sm={6} md={8}>
                <TextField
                  id="standard-name"
                  label="project/release"
                  className={classes.textField}
                  value={this.state.projectRelease}
                  onChange={this.onChange('projectRelease')}
                  margin="normal"
                />
              </GridItem>

              <GridItem xs={6} sm={6} md={4}>
                <div style={custom.select}>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    components={components}
                    defaultValue={this.state.selectedOption}
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                    options={options}
                  />
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={6} sm={6} md={6}>
                <Button
                  onClick={this.editStatus}
                  color="logoBlue"
                >
                  Edit
            </Button>
              </GridItem>
              <GridItem xs={6} sm={6} md={6}>
                <Button
                  onClick={this.handleClose}
                  color="logoBlue"
                >
                  Close
            </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Modal>
      </div>
    )
  }
}

SimpleModal.propTypes = {
  // classes: PropTypes.object.isRequired,
};

function mapStateToProps({ projectreleaseReducer, projectReleaseModalReducer }) {
  return {
    editResponse: projectreleaseReducer.editResponse,
    item: projectReleaseModalReducer.modalResponse
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {
      editProjectRelease,
      setModalClose
    }

  )(SimpleModal)

);