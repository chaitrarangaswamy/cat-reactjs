import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "../../../components/Snackbar/Snackbar";


const styles = theme => ({
	paper: {
		position: "absolute",
		width: theme.spacing.unit * 10,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		overflow: "auto",
		maxHeight: 300
	}
});

class UploadMetaDataResponse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			renderResponse: "",
			renderElementBgColor: "success",
			reponselength: false
		};
		this.calc = this.calc.bind(this)
	}
	componentWillReceiveProps(newProps) {
		// console.log(newProps, "newProps")
		this.calc(newProps)
		// if (newProps)
		//   this.setState({ open: true });
	}
	calc(newProps) {
		var errorMsg = ''
		if (newProps.uploadMetaDataResponse && Object.keys(newProps.uploadMetaDataResponse.uploadResponse).length > 0) {
			if (newProps.uploadMetaDataResponse.check === "csv" &&
				newProps.uploadMetaDataResponse.uploadResponse &&
				newProps.uploadMetaDataResponse.uploadResponse.length > 0) { // this applies only to CSV
				var outputMsg = '';
				newProps.uploadMetaDataResponse.uploadResponse.forEach(function (uploadResult) {
					if (outputMsg.length > 0) {
						outputMsg += '; ';
					}
					outputMsg += (' ' + uploadResult.projectName + ' ' + uploadResult.result);
				});

				this.setState({ renderResponse: outputMsg, renderElementBgColor: "success", open: true, reponselength: outputMsg.length > 1000 ? true : false })
			}
			else {
				this.setState({ renderResponse: newProps.uploadMetaDataResponse.uploadResponse.success, renderElementBgColor: "success", open: true, reponselength: newProps.uploadMetaDataResponse.uploadResponse.length > 1000 ? true : false })
			}
		}
		if (newProps.uploadMetaDataResponse.apiError && Object.keys(newProps.uploadMetaDataResponse.apiError).length > 0) {
			errorMsg = newProps.uploadMetaDataResponse.apiError.error ? newProps.uploadMetaDataResponse.apiError.error : newProps.uploadMetaDataResponse.apiError;
			this.setState({ renderResponse: errorMsg, renderElementBgColor: "danger", open: true, reponselength: errorMsg.length > 1000 ? true : false })
		}
	}
	close = () => {
		this.setState({ open: false });
		// window.location.reload();
	}

	render() {
		const response = this.state.reponselength ? true : false
		return (
			<div>
				<React.Fragment>
					<Snackbar
						place="br"
						color={this.state.renderElementBgColor}
						message={<p style={{ width: response ? "100%" : "", height: response ? "100px" : "", overflowY: response ? "auto" : "", overflowX: response ? "hidden" : "", }}>
							{this.state.renderResponse}</p>}
						open={this.state.open}
						closeNotification={this.close}
						close
					/>
				</React.Fragment>
			</div>
		)
	}
}

function mapStateToProps({ uploadMetaDataReducer }) {
	return {
		uploadMetaDataResponse: uploadMetaDataReducer
	}
}


export default compose(
	withStyles(styles, { withTheme: true }),
	connect(
		mapStateToProps
	)
)(UploadMetaDataResponse);