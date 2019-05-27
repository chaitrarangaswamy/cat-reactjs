import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Manager, Target } from "react-popper";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Paper from "@material-ui/core/Paper";
// import Grow from "@material-ui/core/Grow";
//import Hidden from "@material-ui/core/Hidden";

// @material-ui/icons
//import Person from "@material-ui/icons/Person";
// import Notifications from "@material-ui/icons/Notifications";
// import Dashboard from "@material-ui/icons/Dashboard";
//import Search from "@material-ui/icons/Search";

// core components
//import CustomInput from "../CustomInput/CustomInput";
//import Button from "../CustomButtons/Button";

import HeaderJobSearch from "./HeaderJobSearch";
import HeaderProjectSearch from "./HeaderProjectSearch";
import HeaderAdvancedSearch from "./HeaderAdvancedSearch";
import HeaderMetaDataSearch from "./HeaderMetaDataSearch";
import headerLinksStyle from "../../assets/jss/material-dashboard-pro-react/components/headerLinksStyle";
import Button from "../CustomButtons/Button";
import Restore from "@material-ui/icons/Restore";

const styles = {
  lineLength: {
    width: "60%"
  },
  resetButton: {
    marginBottom: "15px",
    color: "white",
    marginLeft: "10px"
  }
};

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      jobname: ""
    };

    this.getChildData = this.getChildData.bind(this);
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  getChildData = childvalue => {
    this.setState({ jobname: childvalue });
  };
  reload() {
    window.location.reload();
  }
  renderSearch() {
    if (window.location.pathname === "/projectdashboard") {
      return <HeaderProjectSearch />;
    } else if (window.location.pathname === "/dashboard") {
      return <HeaderJobSearch parentMethod={this.getChildData} />;
    }else if (window.location.pathname === "/metadata"){
      return <HeaderMetaDataSearch />
    }else {
      return null;
    }
  }
  renderAdvanceSearch() {
    if (window.location.pathname === "/dashboard") {
      return <HeaderAdvancedSearch jobname={this.state.jobname} />;
    }
  }
  renderReset() {
    if (
      window.location.pathname === "/dashboard" ||
      window.location.pathname === "/projectdashboard" ||
      window.location.pathname === "/metadata"
    ) {
      return (
        <Button
          type="submit"
          color="danger"
          style={styles.resetButton}
          onClick={this.reload.bind(this)}
        >
          <Restore />
          Reset
        </Button>
      );
    }
  }
  render() {
    const { classes, rtlActive } = this.props;
    //const { open } = this.state;
    /* const searchButton =
      classes.top +
      " " +
      classes.searchButton +
      " " +
      classNames({
        [classes.searchRTL]: rtlActive
      }); */
    /* const dropdownItem =
      classes.dropdownItem +
      " " +
      classNames({
        [classes.dropdownItemRTL]: rtlActive
      }); */
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });

    return (
      <div className={wrapper}>
        <Manager className={managerClasses} style={styles.lineLength}>
          <Target>{this.renderSearch()}</Target>
        </Manager>
        {this.renderAdvanceSearch()}
        {this.renderReset()}
        {/* <Manager className={managerClasses}>
          <Target>
            <Button
              color="transparent"
              justIcon
              aria-label="Notifications"
              aria-owns={open ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
              muiClasses={{
                label: rtlActive ? classes.labelRTL : ""
              }}
            >
              <Notifications
                className={
                  classes.headerLinksSvg +
                  " " +
                  (rtlActive
                    ? classes.links + " " + classes.linksRTL
                    : classes.links)
                }
              />
              <span className={classes.notifications}>5</span>
              <Hidden mdUp>
                <span onClick={this.handleClick} className={classes.linkText}>
                  {rtlActive ? "إعلام" : "Notification"}
                </span>
              </Hidden>
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      {rtlActive
                        ? "إجلاء أوزار الأسيوي حين بل, كما"
                        : "Mike John responded to your email"}
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      {rtlActive
                        ? "شعار إعلان الأرضية قد ذلك"
                        : "You have 5 new tasks"}
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      {rtlActive
                        ? "ثمّة الخاصّة و على. مع جيما"
                        : "You're now friend with Andrew"}
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      {rtlActive ? "قد علاقة" : "Another Notification"}
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      {rtlActive ? "قد فاتّبع" : "Another One"}
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager> */}
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
};

export default withStyles(headerLinksStyle)(HeaderLinks);
