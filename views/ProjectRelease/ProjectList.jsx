import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Button from "../../components/CustomButtons/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Assignment from "@material-ui/icons/Assignment";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import { connect } from "react-redux";
import {
  getProjectParams,
  deleteProjectRelease,
  setModalOpen
} from "../../actions";
import Edit from "@material-ui/icons/Edit";
import SimpleModal from './EditProjectRelease';
import Delete from "@material-ui/icons/Delete";

const styles = theme => ({
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {},
  size: {
    width: 40,
    height: 40
  },
  sizeIcon: {
    fontSize: 20
  },

  align: {
    display: "flex"
  },
  button: {
    display: "block",
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150
  },
  editButton:{
    backgroundColor: "transparent",
    boxShadow: "none",
    color: "black"
  },
  cardIconTitle:{
    color:"black"
  }
  
});

class ProjectList extends React.Component {
  constructor() {
    super();
    this.state = {
      allProjectArray: [],
      isDisabled: true,
      editStatus:false
    };
    this.editStatus = this.editStatus.bind(this);
  }

  componentDidMount() {
    this.props.getProjectParams(); //get all  projects
 
  }

  componentWillReceiveProps(newProps) {
    if (newProps && newProps.projectName.data) {
      this.getAllProjectsCalc(newProps.projectName.data);
    }   
  }

  getAllProjectsCalc(response) {
    let tempArray;
    if (response && Array.isArray(response)) {
      tempArray = response.map(obj => {
        return (
          <tr key={obj._id}>
            <td>{obj.projectName}</td>
            <td>
              <Checkbox checked={obj.active} disabled={this.state.isDisabled} />
            </td>
            <td>
             <Button
              type="submit"
              color="logoBlue"
              style={{backgroundColor: "transparent",
              boxShadow: "none",
              color: "#02569B",
              }}
              onClick={() => this.editStatus(obj)}
              
            >
          <Edit />
        </Button>
             <Button
              type="submit"
              color="logoBlue"
              style={{backgroundColor: "transparent",
              boxShadow: "none",
              color: "#02569B",
              }}
              onClick={event => this.delete(event,obj)}
            >
          <Delete />
        </Button></td>
          </tr>
        );
      });
    }
    this.setState({ allProjectArray: tempArray });
  }

  delete(e,object){
  if(object.hasOwnProperty('projectName')){
     let deleteObject = {
       projectName : object.projectName,
       _id: object._id
   }
      this.props.deleteProjectRelease(deleteObject);
  }
  if(object.hasOwnProperty('release')){
     let deleteObject = {
       release : object.release,
       _id: object._id
   }
      this.props.deleteProjectRelease(deleteObject);
  } 
 }

  editStatus(object){
   this.props.setModalOpen(object);   
  }

  render() {
    const { classes } = this.props;
    const custom = {
      gridSpace: {
        margin: "20px"
      },
      tableWidth: {
        width: "100%"
      }
    };
    return (
      <div>
            <Card>
              <CardHeader color="logoBlue" icon>
                <CardIcon color="logoBlue">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Project List</h4>
              </CardHeader>
              <CardBody>
                <table style={custom.tableWidth}>
                  <thead>
                    <tr>
                      <td>
                        <h4>Project Name</h4>
                      </td>

                      <td>
                        <h4>Status</h4>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.allProjectArray.length > 0
                      ? this.state.allProjectArray
                      : null}
                  </tbody>
                </table>
              </CardBody>
            </Card>
       <SimpleModal  />
      </div>
    );
  }
}

ProjectList.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ jenkins }) {
  return {
    projectName: jenkins.projectName
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {
      getProjectParams,
      deleteProjectRelease,
      setModalOpen
     
    }
  )(ProjectList)
);