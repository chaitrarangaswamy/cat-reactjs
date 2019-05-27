import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
//import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

import dashboardRoutes from "../routes/dashboard";
import appStyle from "../assets/jss/material-dashboard-pro-react/layouts/dashboardStyle";
import image from "../assets/img/plane.jpg";
import logo from "../assets/img/smartCat-icon.png";

import Trigger from "../components/Trigger/Trigger";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

//var ps;

class Dashboard extends React.Component {
  // state = {
  //   mobileOpen: false,
  //   miniActive: true
  // };
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      //fixedClasses: "dropdown show",
      mobileOpen: false,
      miniActive: true
    };

    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleColorClick = this.handleColorClick.bind(this);
    //this.handleFixedClick = this.handleFixedClick.bind(this);
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleImageClick(image) {
    this.setState({ image: image });
  }
  handleColorClick(color) {
    this.setState({ color: color });
  }
  // handleFixedClick() {
  //   if (this.state.fixedClasses === "dropdown") {
  //     this.setState({ fixedClasses: "dropdown show" });
  //   } else {
  //     this.setState({ fixedClasses: "dropdown" });
  //   }
  // }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
   componentDidMount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   ps = new PerfectScrollbar(this.refs.mainPanel, {
    //     suppressScrollX: true,
    //     suppressScrollY: false
    //   });
    //   document.body.style.overflow = "hidden";
    // }
  }
  componentWillUnmount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   ps.destroy();
    // }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  render() {
     const custom ={
      window:{
        maxHeight:"fit-content"
      }
    }
    // console.log(this.state, "state");
    var filtered = dashboardRoutes.filter(function(value, index, arr){
       return value.path !== "/metadatamanagement"
     });
    const filterDashboardRoutes = this.props.isAuthenticated ? dashboardRoutes : filtered
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={filterDashboardRoutes}
          logoText={"CAT Portal"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />

        <div style={custom.window}>
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer fluid /> : null}
          <Trigger
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            handleHasImage={this.handleHasImage}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            //handleFixedClick={this.handleFixedClick}
            //fixedClasses={this.state.fixedClasses}
          />
        </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated,
  };
}
export default compose(
  withStyles(appStyle),
  connect(
    mapStateToProps
  )
)(withRouter(Dashboard));

