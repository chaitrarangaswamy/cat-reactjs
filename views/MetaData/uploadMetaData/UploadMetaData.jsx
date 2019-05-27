import React from "react";
import { Redirect } from "react-router-dom";
// import propTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assessment from "@material-ui/icons/Assessment";
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";

import Button from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardIcon from "../../../components/Card/CardIcon.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
// import CardFooter from "../../components/Card/CardFooter";
// import CustomInput from "../../components/CustomInput/CustomInput";
import regularFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
// import ReactFileReader from 'react-file-reader';
import { connect } from "react-redux";
import { compose } from "redux";
import { uploadMetadata,flushUploadResponse } from "../../../actions/uploadMetaDataActions";
import UploadMetaDataResponse from "./UploadMetaDataResponse";
import * as Url from "../../../constants";
// import * as R from 'ramda';
import SpinnerComponent from "../../spinner/spinner.jsx";
import * as R from 'ramda';

class UploadMetaData extends React.Component {
  constructor() {
    super();
    this.state = {
      refName: "",
      selectedValue: "",
      file: {},
      xlsxFileTypeError: false,
      csvFileTypeError: false
    };
    this.upload = this.upload.bind(this);
  }
   componentWillUnmount() {
       this.props.flushUploadResponse()
    }


  handleChange = event => {
    // console.log(event.target.value)
    this.setState({ ...this.state, selectedValue: event.target.value });
  };

  handleFiles = e => {
    let files = e.target.files;
    //   console.log(files,"file")
    this.setState({ file: files }, function() {
      this.filetype(this.state.file);
    });
  };
  filetype(files) {
    // console.log(files,files[0])
    const { selectedValue } = this.state;
    var check = files[0].name.split(".").pop();
    if (check !== "xlsx" && selectedValue === "selenium") {
      this.setState({ xlsxFileTypeError: true });
    } else if (check !== "csv" && selectedValue === "csv") {
      this.setState({ csvFileTypeError: true });
    } else {
      this.setState({ csvFileTypeError: false, xlsxFileTypeError: false });
    }
  }
  onChange = name => event => {
    this.setState({ refName: event.target.value });
  };
  cancelCourse = () => {
    // this.setState({
    //     refName: "",
    //     selectedValue: "",
    //     file: {}
    // })
    this.props.history.push("./metadata");
  };
  upload() {
    const { refName, selectedValue, file } = this.state;
    // console.log(refName,selectedValue,file[0],"upload")
    var check = file[0].name.split(".").pop();
    var fd = new FormData();
    fd.append("fileParam", file[0]);
    fd.append("Reference", refName);
    this.props.uploadMetadata(fd, selectedValue, check);
  }
  canBeSubmitted() {
    const {
      refName,
      selectedValue,
      file,
      xlsxFileTypeError,
      csvFileTypeError
    } = this.state;
    return (
      refName.length > 0 &&
      selectedValue.length > 0 &&
      Object.keys(file).length > 0 &&
      xlsxFileTypeError === false &&
      csvFileTypeError === false
    );
  }
  canUploadFile() {
    const { selectedValue } = this.state;
    return selectedValue.length > 0;
  } 
  renderTriggerResponse = (uploadResponse) => {
		if (uploadResponse) {
			return (
			 <UploadMetaDataResponse />
			);
		}
	};

 

  render() {
    const spinner = this.props.loading ? (
      <div>
        <SpinnerComponent />
      </div>
    ) : null;

    const { classes } = this.props;
    const { refName, xlsxFileTypeError, csvFileTypeError } = this.state;
    const isEnabled = this.canBeSubmitted();
    const isEnabledFileUpload = this.canUploadFile();
    const xlsx = <p>upload Excel sheets only</p>;
    const csv = <p>upload csv files only</p>;

    const custom = {
      container: {
        margin: "auto",
        width: "90%"
      },
      refname: {
        width: "100%"
      },
      icons: {
        position: "absolute",
        top: "178px"
      },
      iconsxlsv: {
        position: "absolute",
        marginTop: "10px"
      },
      btnStyle: {
        float: "right"
      },
      emailsentSuccess: {
        backgroundColor: "#66bb6a",
        color: "white"
      },
      emailsentFailure: {
        backgroundColor: "#ef5350",
        color: "white"
      }
    };
    const fileUrl = Url.baseUrl + "/download";
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Card>
            <CardHeader color="logoBlue" icon>
              <CardIcon color="logoBlue">
                <Assessment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                UPLOAD META DATA <small />
              </h4>
            </CardHeader>
            <br />
            <CardBody>
              <form ref={el => (this.myFormRef = el)} style={custom.container}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="refno"
                      label="Ref Name"
                      className={classes.textField}
                      value={refName}
                      margin="normal"
                      style={custom.refname}
                      onChange={this.onChange("refName")}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={6} sm={6} md={6}>
                    <div>
                      <p>
                        <b>
                          Selenium:
                          <Radio
                            checked={this.state.selectedValue === "selenium"}
                            onChange={this.handleChange}
                            value="selenium"
                            name="radio-button-demo"
                            aria-label="xlsx"
                            color="primary"
                            id="xlsxid"
                          />
                          XLSX
                          <span>
                            <a
                              target={`_self`}
                              href={`${fileUrl}/metadataxlsxformat.xlsx`}
                            >
                              <i
                                style={custom.iconsxlsv}
                                className="material-icons"
                              >
                                get_app
                              </i>
                            </a>
                          </span>
                        </b>
                      </p>
                    </div>
                    {/* </GridItem>  */}
                    {/* <GridItem xs={6} sm={6} md={3}>  */}
                    <div>
                      <p>
                        <b>
                          SoapUI:
                          <Radio
                            checked={this.state.selectedValue === "csv"}
                            onChange={this.handleChange}
                            value="csv"
                            name="radio-button-demo"
                            aria-label="csv"
                            color="primary"
                            id="csvid"
                          />
                          CSV
                          <span>
                            <a
                              target={`_self`}
                              href={`${fileUrl}/metadatacsvformat.csv`}
                            >
                              <i
                                style={custom.icons}
                                className="material-icons"
                              >
                                get_app
                              </i>
                            </a>
                          </span>
                        </b>
                      </p>
                    </div>
                  </GridItem>
                </GridContainer>
                <br />

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {/* <ReactFileReader handleFiles={this.handleFiles}> */}
                    {/* <button className='btn'>Upload</button> */}
                    <input
                      type="file"
                      name="file"
                      disabled={!isEnabledFileUpload}
                      onChange={e => this.handleFiles(e)}
                    />
                    {/* </ReactFileReader> */}
                  </GridItem>
                </GridContainer>
                <br />
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <div style={custom.emailsentFailure}>
                      {xlsxFileTypeError ? xlsx : null}
                    </div>
                    <div style={custom.emailsentFailure}>
                      {csvFileTypeError ? csv : null}
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Button
                      onClick={this.cancelCourse}
                      color="warning"
                      id="cancel"
                      style={custom.btnStyle}
                    >
                      cancel
                    </Button>
                    <Button
                      onClick={this.upload}
                      color="logoBlue"
                      id="upload"
                      style={custom.btnStyle}
                      disabled={!isEnabled}
                    >
                      upload
                    </Button>
                    {/* </GridItem> */}
                    {/* <GridItem xs={3} sm={3} md={1}> */}
                  </GridItem>
                </GridContainer>
                <br />
              </form>
            </CardBody>
          </Card>
        ) : (
          <Redirect to="/pages/login-page" />
        )}
        {spinner}
       {!R.isEmpty(this.props.uploadMetaDataResponse) ?
						this.renderTriggerResponse(this.props.uploadMetaDataResponse) : ''}
      </div>
    );
  }
}
function mapStateToProps({ uploadMetaDataReducer, errorMsgs, auth }) {
  return {
    uploadMetaDataResponse: uploadMetaDataReducer,
    loading: uploadMetaDataReducer.loading,
    errorMsgs: errorMsgs,
    isAuthenticated: auth.isAuthenticated
  };
}
export default compose(
  withStyles(regularFormsStyle),
  connect(
    mapStateToProps,
    { uploadMetadata,flushUploadResponse }
  )
)(UploadMetaData);
