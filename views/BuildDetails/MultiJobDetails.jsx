import React from "react";
//import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import MultiJobItem from "./MultiJobItem";


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class MultiJobDetails extends React.Component {
  state = { open: false };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    let multiJobitem = this.props.item;
    let renderMultijobItem;
    renderMultijobItem = multiJobitem.map((prop, index) => {
      if(prop !== null) {
        return <MultiJobItem key={index} item={prop} />
      } else {
        return null;
      }
    });

    return (
      <React.Fragment>
        {renderMultijobItem}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(MultiJobDetails);
