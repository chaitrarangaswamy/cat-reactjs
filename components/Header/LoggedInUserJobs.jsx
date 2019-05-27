import React from "react";
import { myJobsSearch, getSeleniumJobsCount, getSoapJobsCount } from "../../actions";
// import Button from "../CustomButtons/Button";
import { connect } from "react-redux";
import moment from "moment";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Switch from '@material-ui/core/Switch';

class LoggedInUserJobs extends React.Component {
	constructor(props) {
		super(props);
		this.startDate = moment();
		this.startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
		this.startDate.toISOString();
		this.startDate.format();
		//  console.log(this.startDate,"m")
		this.endDate = moment();
		this.endDate.set({ hour: 23, minute: 59, second: 0, millisecond: 0 });
		this.endDate.toISOString();
		this.endDate.format();

		this.state = {
			checkedA: false,
		};
	}

    handleChange = (e,loddedInUserData,jobName) => {
          this.setState({ checkedA: e.target.checked },()=>{
               this.changeData(loddedInUserData,jobName)
          });
        // this.setState(function (prevState) {
        //     // console.log(prevState,prevState.user,"+++")
        //     return { user: !prevState.user }
        // });
        // this.changeData(loddedInUserData)
    };
    changeData = (loddedInUserData,jobName) => {
        const { checkedA } = this.state
        // console.log(this.state.checkedA, loddedInUserData,jobName)
        if(Object.keys(jobName.myJobsWithJobname).length === 0){
            if (!checkedA) {
                const searchData = {};
                searchData["refresh"] = "false";
                searchData["rangeFrom"] = 0;
                //searchData["rangeCount"] = "*";
                searchData["rangeStartStartDateTime"] = this.startDate;
                searchData["rangeEndStartDateTime"] = this.endDate;
                this.props.getSeleniumJobsCount(searchData);
                this.props.getSoapJobsCount(searchData);
                this.props.myJobsSearch(false);
            }
            else {
                const searchData = {};
                searchData["refresh"] = "false";
                searchData["rangeFrom"] = 0;
                //searchData["rangeCount"] = "*";
                // var obj = {
                //     userId: "mk9j",
                //     userName: "Malathy Venkatesan"
                // }
                let obj = {
                userId:loddedInUserData.userid,
                userName:loddedInUserData.name
                }
                searchData["triggeredBy"] = obj;
                this.props.getSeleniumJobsCount(searchData);
                this.props.getSoapJobsCount(searchData);
                this.props.myJobsSearch(true);
            }
        }
        else if(Object.keys(jobName.myJobsWithJobname).length > 0){
            if (!checkedA) {
                const searchData = {};
                searchData["refresh"] = "false";
                searchData["rangeFrom"] = 0;
                //searchData["rangeCount"] = "*";
                 searchData["jobName"] = jobName.myJobsWithJobname;
                this.props.getSeleniumJobsCount(searchData);
                this.props.getSoapJobsCount(searchData);
                this.props.myJobsSearch(false);
            }
            else {
                const searchData = {};
                searchData["refresh"] = "false";
                searchData["rangeFrom"] = 0;
                 searchData["jobName"] = jobName.myJobsWithJobname;
                let obj = {
                userId:loddedInUserData.userid,
                userName:loddedInUserData.name
                }
                searchData["triggeredBy"] = obj;
                this.props.getSeleniumJobsCount(searchData);
                this.props.getSoapJobsCount(searchData);
                this.props.myJobsSearch(true);
            }
        }
    }

    userLoggedIn(){
        return(
            <div>
                <Switch
                checked={this.state.checkedA}
                onChange={e =>this.handleChange(e,this.props.authDetails,this.props.searchJobName)}
                value="checkedA"
                color="primary"
                />
                <p  style={{display:"inline-block",marginLeft: "20px",fontSize: "18px"}}>My jobs</p>
          </div>
        )
    }
   
    render() {
        // console.log(this.props.auth)
        return (
        <div>
            {this.props.authenticated === true ? this.userLoggedIn():""}
            </div>
        );
    }
}

function mapStateToProps({ auth,userJobsReducer }) {
    return {
        authDetails: auth.user,
        authenticated:auth.isAuthenticated,
        searchJobName : userJobsReducer
    };
}

export default compose(
	connect(
		mapStateToProps,
		{
			myJobsSearch, getSeleniumJobsCount, getSoapJobsCount
		}
	),
	withRouter
)(LoggedInUserJobs)
