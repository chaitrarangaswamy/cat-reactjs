import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";

// core components
import HeaderLinks from "./HeaderLinks";
import Button from "../CustomButtons/Button";

import headerStyle from "../../assets/jss/material-dashboard-pro-react/components/headerStyle";
import LoggedInUserJobs from './LoggedInUserJobs';

 function loggedInUserJobs(){
    if(window.location.pathname === "/dashboard"){
      return(
        <div style={{marginLeft:"20px"}}>
        <LoggedInUserJobs style={{display:"inline-block"}}/>
        </div>
      )
    }
  }
function Header({ ...props }) {
  function makeBrand() {
    var name = "";
    props.routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      }
      if (prop.path === props.location.pathname) {
        name = prop.name;
      }
      return null;
    });
   
    return name;
  }
  const { classes, color, rtlActive } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive
    });

  const styles = {
    searchBar: {
      flex: 1.4
    },
    dashboardBar: {
      flex: 4
    }
  };

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown>
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>

        <div className={classes.flex} style={styles.searchBar}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title} color="transparent">
            {makeBrand()}
          </Button>
        </div>
         <div style={styles.dashboardBar} >
          <Hidden smDown implementation="css">
            <HeaderLinks rtlActive={rtlActive} />
          </Hidden>
        </div> 
                
        <Hidden mdUp>
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
      {loggedInUserJobs()}
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool
};

export default withStyles(headerStyle)(Header);
