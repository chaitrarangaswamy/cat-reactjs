import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import footerStyle from "../../assets/jss/material-dashboard-pro-react/components/footerStyle";
import * as Url from "../../constants";

function Footer({ ...props }) {
  const { classes, fluid, white, rtlActive } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  const customStyle = {
    logoBlue: {
      color: "#02569B"
    }
  };
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  // var block = cx({
  //   [classes.block]: true,
  //   [classes.whiteColor]: white
  // });
  var documentation = Url.baseUrl + "/docs";
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://hipchat.allegiantair.com/chat/room/1388"
                className={anchor}
                target="_blank"
                rel="noopener noreferrer"
                style={customStyle.logoBlue}
              >
                {rtlActive ? "الصفحة الرئيسية" : "Hipchat"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href={documentation}
                className={anchor}
                target="_blank"
                rel="noopener noreferrer"
                style={customStyle.logoBlue}
              >
                {rtlActive ? "الصفحة الرئيسية" : "Documentation"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              {/* <a href="#portfolio" className={block}>
                {rtlActive ? "بعدسة" : "Portfolio"}
              </a> */}
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              {/* <a href="#blog" className={block}>
                {rtlActive ? "مدونة" : "Blog"}
              </a> */}
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a
            href="https://www.allegiantair.com/"
            className={anchor}
            target="_blank"
            rel="noopener noreferrer"
            style={customStyle.logoBlue}
          >
            {rtlActive ? "توقيت الإبداعية" : "Allegiant Air"}
          </a>
          {/* {rtlActive
            ? ", مصنوعة مع الحب لشبكة الإنترنت أفضل"
            : ", made with love for a better web"} */}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
