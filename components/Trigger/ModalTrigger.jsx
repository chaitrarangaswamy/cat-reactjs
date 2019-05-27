import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { triggerJob } from "../../actions";
import * as R from 'ramda';

import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import FormControl from "@material-ui/core/FormControl";
import Selectd from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import Table from "../../components/Table/Table";
import Button from "../../components/CustomButtons/Button";
import CardHeader from "../../components/Card/CardHeader";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import SpinnerComponent from "../../views/spinner/spinner.jsx";
import CustomInput from "../CustomInput/CustomInput";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: "auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    overflowX: "hidden",
    overflowY: "auto",
    maxHeight: 400
  }
});

const customStyle = {
  list: {
    width: "100%"
  },
  multiParam: {
    paddingLeft: "0px"
  },
  preSelectLabel: {
    color: "#fd8f05"
  },
  preSelect: {
    width: "100%",
    color: "#929090",
    fontSize: "14px"
  },
  choiceSelectLabel: {
    color: "#fd8f05",
    fontSize: "20px"
  },
  choiceSelect: {
    color: "#929090"
  },
  header: {
    fontSize: "20px"
  },
  fileInput: {
    color: "#fd8f05",
    display: "block"
  },
  modalWidth: {
    width: "800px"
  },
  tableElementsHeight: {
    height: "75px "
  }
};


class ModalTrigger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newArray1: [],
      newArray2: [],
      loading: false,
      checked: false,
      email: ''
    };
    this.triggerJobHandler = this.triggerJobHandler.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const item = this.jobParameterDetails(this.props.item);
    this.setState({ open: true });
    if (item.length > 0) {
      this.splitArray(item);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item !== undefined) {
      if (nextProps.item !== this.props.item) {
        this.splitArray(this.jobParameterDetails(nextProps.item));
        this.setState({ open: true });
      }
    }
    if (nextProps.triggerJobResponse) {
      nextProps.triggerJobResponse.status === 200 ?
        this.setState({ loading: false }) : this.setState({ loading: true });
    }
  }

  jobParameterDetails(info) {
    let otherParams = [];
    if (info !== null && info !== undefined) {
      for (var item in info) {
        if (item !== null && typeof info[item] === "string") {
          // single value
          otherParams.push({
            name: item,
            type: "string",
            value: info[item],
            setValue: info[item]
          });
        } else if (item !== null && typeof info[item] === "object") {
          if (info[item].type && info[item].type === "file") {
            // file type
            otherParams.push({
              name: item,
              type: "file",
              value: item,
              setValue: null
            });
          } else if (info[item].type && info[item].type === "password") {
            otherParams.push({
              name: item,
              type: "password",
              value: info[item].value,
              setValue: info[item].setValue
            });
          } else {
            otherParams.push({
              name: item,
              type: "choice",
              value: info[item].value,
              setValue: info[item].setValue
            });
          }
        }
      }
      return otherParams;
    } else {
      return otherParams;
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
	this.setState({ open: false, checked: false });
	this.props.modal();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckChange(event) {
    this.setState({
      checked: !this.state.checked
    });
  }

  emailChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  triggerJobHandler() {
    this.setState({ loading: true, checked: false });
    const triggerParams = R.compose(this.triggerChecks, this.defaultParameters)(this.refs);
    this.props.triggerJob(triggerParams);
	this.setState({ open: false });
	this.props.modal();
  }

  defaultParameters = (refs) => {
    const defaultParams = {};
    if (!R.isEmpty(refs)) {
      Object.keys(refs).map(data => {
        const d = data.split(',');
        return defaultParams[d[0]] = d[1];
      });
    }
    return defaultParams;
  };

  triggerChecks = (defaultParams) => {
    const objectToReturn = {};
    Object.keys(defaultParams).map(key => {
      if (key === 'name') {
        return (objectToReturn['jobName'] = defaultParams[key]);
      } else {
        if (this.state[key]) {
          return (objectToReturn[key] = this.state[key]);
        } else {
          return (objectToReturn[key] = defaultParams[key]);
        }
      }
    });
    const emailList = this.fetchList();
    if (emailList.length > 0) {
      objectToReturn['users'] = emailList;
    }
    objectToReturn['server'] = 'jenkins0';
    objectToReturn['notificationType'] = 'full';
    objectToReturn['notificationModes'] = 'email,hipchat';
    objectToReturn['referer'] = window.location.href;
    return objectToReturn;
  };

  fetchList = () => {
    const listToReturn = [];
    const { email } = this.state;
    if (email.length > 0) {
      const userslist = email.split(',');
      for (let i = 0; i < userslist.length; i++) {
        listToReturn.push({
          email: userslist[i],
          userid: ''
        });
      }
    } else {
      return listToReturn;
    }
    return listToReturn;
  }

  splitArray(item) {
    if (item) {
      const subArray1 = [];
      const subArray2 = [];
      let info = item;
      if (info && Array.isArray(info)) {
        const arraylength = Math.floor(info.length / 2);
        for (let i = 0; i <= arraylength; i++) {
          subArray1.push(info[i]);
        }
        this.setState({ newArray1: [...subArray1] });
        for (let i = arraylength + 1; i <= info.length - 1; i++) {
          subArray2.push(info[i]);
        }
        this.setState({ newArray2: [...subArray2] });
      }
    }
  }

  renderData(data) {
    const { classes } = this.props;
    if (data !== null && data.length > 0 && data !== undefined) {
      return data.map(param => {
        if (param.type === 'choice') {
          return (
            <div style={customStyle.tableElementsHeight} key={param.name}>
              <Table
                tableData={[
                  [
                    <FormControl
                      className={classes.formControl}
                      key={param.name}
                      style={customStyle.list}
                    >
                      <InputLabel
                        htmlFor={param.name}
                        style={customStyle.choiceSelectLabel}
                      >
                        {param.name}
                      </InputLabel>
                      <Selectd
                        style={customStyle.choiceSelect}
                        native
                        name={param.name}
                        value={this.state[param.setValue]}
                        onChange={e => this.onChange(e)}
                        inputProps={{
                          name: `${param.name}`,
                          id: `${param.name}`
                        }}
                        id={param.name}
                        key={param.setValue}
                        ref={`${param.name},${param.setValue}`}
                        defaultValue={param.setValue}
                      >
                        {param.value.map((key, index) => (
                          <option value={key} key={index}>
                            {key}
                          </option>
                        ))}
                      </Selectd>
                    </FormControl>
                  ]
                ]}
              />
            </div>
          );
        }
        else if (param.type === "file") {
          return (
            <div style={customStyle.tableElementsHeight} key={param.name} >
              <Table
                tableData={[
                  [
                    <div key={param.name}>
                      <label style={customStyle.fileInput}>
                        {param.name}
                      </label>
                      <input
                        type="file"
                        name={param.name}
                        value={this.state[param.setValue]}
                        onChange={e => this.onChange(e)}
                        defaultValue={param.setValue}
                        id={param.name}
                        ref={`${param.name},${param.setValue}`}
                      />
                    </div>
                  ]
                ]}
              />
            </div>
          );
        }
        else if (param.type === "password") {
          return (
            <div style={customStyle.tableElementsHeight} key={param.name}>
              <Table
                tableData={[
                  [
                    <div key={param.name}>
                      <label style={customStyle.preSelectLabel}>
                        {param.name}
                      </label>
                      <input
                        type="password"
                        name={param.name}
                        value={this.state[param.setValue]}
                        onChange={(e) => this.onChange(e)}
                        defaultValue={param.setValue}
                        id={param.name}
                        ref={`${param.name},${param.setValue}`}
                      />
                    </div>
                  ]
                ]}
              />
            </div>
          );
        }
        else {
          let readOnly = param.name === "name" ? true : false;
          return (
            <div style={customStyle.tableElementsHeight} key={param.name}>
              <Table
                tableData={[
                  [
                    <div key={param.name}>
                      <label style={customStyle.preSelectLabel}>
                        {param.name}
                      </label>
                      <input
                        style={customStyle.preSelect}
                        type="text"
                        readOnly={readOnly}
                        name={param.name}
                        value={this.state[param.setValue]}
                        onChange={(e) => this.onChange(e)}
                        defaultValue={param.setValue}
                        id={param.name}
                        ref={`${param.name},${param.setValue}`}
                      />
                    </div>
                  ]
                ]}
              />
            </div>
          );
        }

      })
    }
  }

  render() {
    const emailContent = this.state.checked ? (
      <div>
        <CustomInput
          labelText="example@example.com"
          id="email"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: this.emailChange,
            type: "text",
            name: "email"
          }}
          name='email'
          value={this.state.email}
          onChange={(e) => this.emailChange(e)}
        />
      </div>
    ) : null;
    const { classes } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <SpinnerComponent />;
    } else {
      return (
        <div style={customStyle.modalWidth}>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            className="custom-trigger-modal-style"
          >
            <div style={getModalStyle()} className={classes.paper}>
              <CardHeader color="warning" style={customStyle.header}>
                Enter Additional Parameters
              </CardHeader>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                  {this.renderData(this.state.newArray1)}
                </GridItem>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                  {this.renderData(this.state.newArray2)}
                </GridItem>
              </GridContainer>
              <FormControlLabel
                style={customStyle.multiParams}
                control={
                  <Checkbox
                    tabIndex={-1}
                    //onClick={() => this.handleToggle(3)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked
                    }}
                    onChange={this.handleCheckChange}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="Email Notification"
              />
              <div>{emailContent}</div>
              <div className={classes.affected}>
                <div>
                  <Button onClick={this.triggerJobHandler} color="success">
                    Trigger Job
                  </Button>
                  <Button onClick={this.handleClose} color="danger">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      );
    }
  }
}

ModalTrigger.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ jenkins, errorMsgs }) {
  return {
    errors: errorMsgs,
    triggerJobResponse: jenkins.triggerJob
  };
}

//export default Trigger;
export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    { triggerJob }
  )
)(ModalTrigger);
