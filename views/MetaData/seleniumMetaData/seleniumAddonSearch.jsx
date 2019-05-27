import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
import { withStyles } from "@material-ui/core/styles";
// @material-ui icons
import Search from "@material-ui/icons/Search";

// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Button from "../../../components/CustomButtons/Button";

import headerLinksStyle from "../../../assets/jss/material-dashboard-pro-react/components/headerLinksStyle";
import SpinnerComponent from "../../../views/spinner/spinner.jsx";

import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { getWorkbookSheetSearch } from "../../../actions/metaDataActions";
// import IntegrationReactSelect from "./HeaderJobSearch1"

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
    Control,
    Option
};

class SeleniumAddonSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: false,
            single: null,
            dropvalue: { label: "workBook" },
            jobName: [],
            workBookName: [],
            sheetName: [],
            jobNameLoggedOut: ""
        };
        this.jobSearchHandler = this.jobSearchHandler.bind(this);
    }

    componentWillReceiveProps(nxtProps) {
        if (nxtProps.seleniumData.searchResult) {
            this.WorkSheetNameCalc(nxtProps.seleniumData.searchResult);
        }
    }

    jobSearchHandler(e) {
        e.preventDefault();
        if(this.state.single !== null){
           if (this.state.single.label && this.state.dropvalue) {
            let params = {}
            params[this.state.dropvalue.label] = this.state.single.label
            this.props.getWorkbookSheetSearch(params);
        }
        }
    }

    WorkSheetNameCalc(searchList) {
        const workBookList = [];
        const sheetList = [];
        for (var key in searchList) {
            workBookList.push({
                label: key
            });

            for (var sheet in searchList[key]) { 
                // console.log(sheet,"sheet")
                sheetList.push({
                    label: sheet
                });
            }
        }
        this.setState({ workBookName: workBookList });
        this.setState({ sheetName: sheetList });
    }

    handleChange = name => value => {
        this.setState({
            [name]: value
        });
    };


    handleChangeCheck = name => value => {
        this.setState({
            dropvalue: value
        });
        this.setState({ single: null })
    };

    render() {
        const { classes, theme, rtlActive } = this.props;
        const dropdown = [{ 'label': 'workBook' }, { 'label': 'featureName' }]
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
                width: "103%"
            },
            jobnamealign: {
                marginTop: "15px"
            },
            textfieldWidth: {
                width: "100%"
            }
        };

        const searchButton =
            classes.top +
            " " +
            classes.searchButton +
            " " +
            classNames({
                [classes.searchRTL]: rtlActive
            });

        const workbookStatus = (
            <div className={classes.root} style={custom.jobnamealign}>
                <Select
                    classes={classes}
                    styles={selectStyles}
                    options={this.state.workBookName}
                    components={components}
                    value={this.state.single}
                    onChange={this.handleChange("single")}
                    placeholder="WorkBook Search"
                />
                <div className={classes.divider} />
            </div>
        );

        const dropdownMenu = (
            <div className={classes.root} style={custom.jobnamealign}>
                <Select
                    classes={classes}
                    styles={selectStyles}
                    options={dropdown}
                    components={components}
                    value={this.state.dropvalue}
                    onChange={this.handleChangeCheck("dropvalue")}
                />
                <div className={classes.divider} />
            </div>
        );

        const sheetNameStatus = (
            <div className={classes.root} style={custom.jobnamealign}>
                <Select
                    classes={classes}
                    styles={selectStyles}
                    options={this.state.sheetName}
                    components={components}
                    value={this.state.single}
                    onChange={this.handleChange("single")}
                    placeholder="Sheet Search"
                />
                <div className={classes.divider} />
            </div>
        );

        const button = (
            <Button
                type="submit"
                color="white"
                aria-label="edit"
                justIcon
                round
                className={searchButton}
                onClick={this.jobSearchHandler}
            >
                <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
            </Button>
        )
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
                        <GridItem sm={2}>
                            {dropdownMenu}
                        </GridItem>
                        {this.state.dropvalue.label === 'workBook' ? <GridItem sm={4}>
                            {workbookStatus}
                        </GridItem> : <GridItem sm={4}>
                                {sheetNameStatus}
                            </GridItem>}
                        {button}

                    </GridContainer>
                </form>
            </React.Fragment>
        );
    }
}

SeleniumAddonSearch.propTypes = {
    classes: PropTypes.object.isRequired,
    rtlActive: PropTypes.bool,
    theme: PropTypes.object.isRequired,
    getWorkbookSheetSearch: PropTypes.func.isRequired
};

//Mapping the component to current state
function mapStateToProps({ jenkins, auth, getSeleniumAddonSearch }) {

    return {
        seleniumAddonResonse: getSeleniumAddonSearch.seleniumAddonResonse,
        jobName: jenkins.jobName,
        isAuthenticated: auth.isAuthenticated
    };
}

export default withStyles(styles, { withTheme: true }, headerLinksStyle)(
    connect(
        mapStateToProps,
        { getWorkbookSheetSearch }
    )(SeleniumAddonSearch)
);
