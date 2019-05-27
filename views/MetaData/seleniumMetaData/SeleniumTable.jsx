import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import * as R from 'ramda';
import 'react-table/react-table.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
import Assignment from '@material-ui/icons/Assignment';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from 'react-tooltip-lite';

// core components
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Card from '../../../components/Card/Card';
import CardBody from '../../../components/Card/CardBody';
import CardIcon from '../../../components/Card/CardIcon';
import CardHeader from '../../../components/Card/CardHeader';

import { getSeleniumJobsCount, getSoapJobsCount } from '../../../actions';
import { seleniumTagValue } from '../../../actions/metaDataActions';
import { cardTitle } from '../../../assets/jss/material-dashboard-pro-react';

const styles = theme => ({
    popover: {
        pointerEvents: 'none'
    },
    paper: {
        padding: theme.spacing.unit
    },
    cardIconTitle: {
        ...cardTitle,
        marginTop: '15px',
        marginBottom: '0px'
    }
});

class SeleniumTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkData: true,
            parentcheck: false
        };
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck = (e, checked) => {
        const trigger = {};
        if (e.target.value === 'HeaderCheck') {
            let triggers = [];
            if (checked) {
                let CheckAll = JSON.parse(e.target.id);
                this.setState({ parentcheck: true });
                for (let checkedData of CheckAll) {
                    let triggerObj = {};
                    triggerObj['sheet'] = this.props.sheet;
                    triggerObj['workbook'] = this.props.workbook;
                    triggerObj['id'] = JSON.stringify(checkedData['testParameters']);
                    triggerObj['scenario'] = checkedData["testParameters"].Scenario;
                    triggerObj['scenariodescription'] =
                        checkedData['testParameters']['Scenario Description'];
                    triggerObj['checked'] = checked;
                    triggers.push(triggerObj);
                }
                this.props.triggerDetails(triggers);
            } else {
                let CheckAll = JSON.parse(e.target.id);
                this.setState({ parentcheck: false });
                for (let checkedData of CheckAll) {
                    let triggerObj = {};
                    triggerObj['sheet'] = this.props.sheet;
                    triggerObj['id'] = JSON.stringify(checkedData['testParameters']);
                    triggers.push(triggerObj);
                }
                this.props.triggerDetails(triggers);
            }
        } else {
            if (checked) {
                trigger['sheet'] = this.props.sheet;
                trigger['workbook'] = this.props.workbook;
                trigger['id'] = e.target.id;
                trigger['scenario'] = e.target.name;
                trigger['scenariodescription'] = e.target.value;
                trigger['checked'] = checked;
                this.props.triggerDetails(trigger);
            } else {
                trigger['sheet'] = this.props.sheet;
                trigger['id'] = e.target.id;
                this.props.triggerDetails(trigger);
            }
        }
    };

    renderContent(values) {
        return R.map(eachParameter => {
            return {
                id: eachParameter.testParameters['Iteraions'] || eachParameter.testParameters['Iteration'],
                iteration: eachParameter.testParameters['Iteraions'] || eachParameter.testParameters['Iteration'],
                scenario: eachParameter.testParameters['Scenario'],
                scenarioDesc: eachParameter.testParameters['Scenario Description'],
                metaDataTags: eachParameter.testParameters['MetaDataTags'],
                name: (
                    <div>
                        {this.state.parentcheck === true ? (
                            <Checkbox
                                name={eachParameter.testParameters['Scenario']}
                                value={eachParameter.testParameters['Scenario Description']}
                                id={JSON.stringify(eachParameter.testParameters)}
                                onChange={this.handleCheck}
                                checked={this.state.checkData}
                            />
                        ) : (
                                ""
                            )}
                        {this.state.parentcheck === false ? (
                            <Checkbox
                                name={eachParameter.testParameters['Scenario']}
                                value={eachParameter.testParameters['Scenario Description']}
                                id={JSON.stringify(eachParameter.testParameters)}
                                onChange={this.handleCheck}
                            />
                        ) : (
                                ""
                            )}
                    </div>
                )
            };
        }, values);
    }

    renderTableHeading(sheetName, workbook, classes) {
        return (
            <CardHeader color='logoBlue' icon>
                <CardIcon color='logoBlue'>
                    <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                    <strong>Workbook:</strong> <span>{workbook} {'  '}</span>
                    <strong>Sheet:</strong> <span>{sheetName} {'  '}</span>
                </h4>
            </CardHeader>
        );
    }

    render() {
        const { classes, sheet, workbook, value } = this.props;
        const custom = {
         cardMargin:{
        marginBottom:"0px",
         zIndex:0
      }
     }
        return (
            <React.Fragment>
                <GridContainer>
                    <GridItem xs={12}>
                        <Card style={custom.cardMargin}>
                            {this.renderTableHeading(sheet, workbook, classes)}
                            <CardBody>
                                <ReactTable
                                    columns={[
                                        {
                                            accessor: 'name',
                                            Header: (
                                                <div>
                                                    <Checkbox
                                                        name={JSON.stringify(this.props.value)}
                                                        value='HeaderCheck'
                                                        id={JSON.stringify(this.props.value)}
                                                        onChange={this.handleCheck}
                                                        checked={this.state.parentcheck}
                                                    />
                                                </div>
                                            ),
                                            width: 80,
                                            sortable: false
                                        },
                                        {
                                            Header: 'Iteration',
                                            accessor: 'iteration',
                                            width: 100
                                        },
                                        {
                                            Header: 'Scenario',
                                            accessor: 'scenario',
                                            Cell: row => {
                                                return (
                                                    <Tooltip content={<div>{row.original.scenario}</div>}>
                                                        <div>{row.original.scenario}</div>
                                                    </Tooltip>
                                                );
                                            },
                                            style: { whiteSpace: 'unset' }
                                        },
                                        {
                                            Header: 'Scenario Description',
                                            accessor: 'scenarioDesc',
                                            Cell: row => {
                                                return (
                                                    <Tooltip
                                                        content={<div>{row.original.scenarioDesc}</div>}
                                                    >
                                                        <div>{row.original.scenarioDesc}</div>
                                                    </Tooltip>
                                                );
                                            },
                                            style: { whiteSpace: 'unset' }
                                        },
                                        {
                                            Header: 'MetaDataTags',
                                            accessor: 'metaDataTags',
                                            Cell: row => {
                                                return (
                                                    <Tooltip
                                                        content={<div>{row.original.metaDataTags}</div>}
                                                    >
                                                        <div>{row.original.metaDataTags}</div>
                                                    </Tooltip>
                                                );
                                            },
                                            style: { whiteSpace: 'unset' }
                                        }
                                    ]}
                                    data={this.renderContent(value)}
                                    showPaginationTop
                                    showPaginationBottom={false}
                                    filterable
                                    defaultPageSize={10}
                                    className='-striped -highlight'
                                />
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(
    connect(
        null,
        {
            getSeleniumJobsCount,
            getSoapJobsCount,
            seleniumTagValue
        }
    )(SeleniumTable)
);
