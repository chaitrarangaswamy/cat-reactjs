import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

// core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

import MultiJobTestCase from "./MultiJobTestCase";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class MultiJobItem extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      jobName: null,
      renderTable: null
    };
  }

  componentDidMount(){
    const data = this.props.item;
    this.setState({jobName: this.getJobName(data)});
    this.setState({renderTable: this.getTable(data)});
  }

  //gets the job name from the props
  getJobName(data){
    let jobName;
    if (data !== null) {
      jobName = data.jobDetails.jobName ? data.jobDetails.jobName : "Null";
      }
    return jobName;
  }

  //creates array of MultiJobTestCase compoonent using data from props
  getTable(data){
    let renderTable;
    if (data !== null) {
      renderTable = data.testcaseDetails.map((prop, key) => {
        return <MultiJobTestCase key={key} testSuiteItem={prop} />;
      });
    }
    return renderTable;
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  
  render() {
    const { classes } = this.props;
    const { renderTable, jobName } = this.state;
  
    return (
      <React.Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText inset primary={jobName} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <Card>
                <CardBody>{renderTable}</CardBody>
              </Card>
            </ListItem>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MultiJobItem);
