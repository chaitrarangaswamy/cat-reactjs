import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// @material-ui icons
import Search from '@material-ui/icons/Search';
// core components
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Button from '../CustomButtons/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import headerLinksStyle from '../../assets/jss/material-dashboard-pro-react/components/headerLinksStyle';
import SpinnerComponent from '../../views/spinner/spinner.jsx';
import { searchMetaDataTagsSoap, searchMetaDataTagsSelenium, seleniumTagValue, fetchSeleniumTags } from '../../actions/metaDataActions';

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 0
	},
	input: {
		display: 'flex',
		padding: 0
	},
	valueContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flex: 1,
		alignItems: 'center'
	},
	noOptionsMessage: {
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
	},
	singleValue: {
		fontSize: 16
	},
	placeholder: {
		position: 'absolute',
		left: 2,
		fontSize: 16
	},
	paper: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0
	},
	divider: {
		height: theme.spacing.unit * 2
	}
});

class HeaderMetaDataSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			loading: false,
			metaSearch: '',
			type: 'or',
		};
		this.searchHandler = this.searchHandler.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChangeSelect = this.onChangeSelect.bind(this);
	}

	onChangeSelect(e) {
		this.setState({ type: e.target.value }, () => { });
	}

	searchHandler(e, tabValue) {
		e.preventDefault();
		const { metaSearch, type } = this.state;
		const search = tabValue;
		const searchData = {};
		let metaTags;
		if (!R.isEmpty(metaSearch)) {
			const tags = metaSearch.split(',');
			if (type === "endsWith" || type === "startsWith") {
				metaTags = tags
			} else {
				metaTags = R.filter(tag => tag.startsWith('@'), tags);
			}
			if (search === 1) {
				searchData['metaTags'] = metaSearch;
				searchData['type'] = type;
				this.props.searchMetaDataTagsSoap(searchData);
				this.setState({ metaSearch: '' });
			} else if (search === 0) {
				this.props.seleniumTagValue({ metaTags, type });
				this.setState({ metaSearch: '' });
			}
		}
		this.setState({ metaSearch: "", type: "or" });
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { classes } = this.props;

		const custom = {
			spinner: {
				position: 'absolute',
				top: '250px',
				left: '0px',
				bottom: '0px',
				right: '0px',
				zIndex: 6
			},
			formWidth: {
				width: '100%',
				marginBottom: '20px'
			},
			jobnamealign: {
				marginTop: '15px',
				textAlign: 'center'
			},
			alignSelect: {
				float: 'right'
			},
			searchFieldAlign: {
				width: '100%',
				marginTop: '-15px'
			},
			searchContentAlign: {
				marginTop: '8px'
			}
		};

		const { loading } = this.state;

		const spinner = loading ? (
			<div style={custom.spinner}>
				<SpinnerComponent />
			</div>
		) : null;

		return (
			<React.Fragment>
				{spinner}
				<form style={custom.formWidth}>
					<GridContainer>
						<GridItem xs={1} sm={1} md={1}>
						</GridItem>
						<GridItem xs={2} sm={2} md={2}>
							<div style={custom.searchContentAlign}>
								<Select
									style={custom.alignSelect}
									value={this.state.type}
									onChange={this.onChangeSelect}
									inputProps={{
										name: 'type',
										id: 'type'
									}}
								>
									<MenuItem value='or'>OR</MenuItem>
									<MenuItem value='and'>AND</MenuItem>
									<MenuItem value="not">NOT</MenuItem>
									<MenuItem value="startsWith">Starts With</MenuItem>
									<MenuItem value="endsWith">Ends With</MenuItem>
								</Select>
							</div>
						</GridItem>
						<GridItem xs={6} sm={6} md={6}>
							<div style={custom.searchContentAlign}>
								<TextField
									id='standard-name'
									label='@Search'
									name='metaSearch'
									className={classes.textField}
									value={this.state.metaSearch}
									onChange={this.onChange}
									margin='normal'
									style={custom.searchFieldAlign}
								/>
							</div>
						</GridItem>
						<GridItem xs={2} sm={2} md={2}>
							{/* <div style={custom.searchContentAlign}>      */}
							<Button
								style={custom.alignBtn}
								type='submit'
								color='white'
								aria-label='edit'
								justIcon
								round
								onClick={(e) => this.searchHandler(e, this.props.tabValue)}
							>
								<Search
									className={
										classes.headerLinksSvg + " " + classes.searchIcon
									}
								/>
							</Button>
							{/* </div> */}
						</GridItem>
						<GridItem xs={1} sm={1} md={1}>
						</GridItem>
					</GridContainer>
				</form>
			</React.Fragment>
		);

	}
}

HeaderMetaDataSearch.propTypes = {
	classes: PropTypes.object.isRequired,
	rtlActive: PropTypes.bool,
	theme: PropTypes.object.isRequired
};

//Mapping the component to current state
function mapStateToProps({
	searchMetaDataSeleniumReducer
}) {
	return {
		tabValue: searchMetaDataSeleniumReducer.tabValue
	};
}
export default withStyles(styles, { withTheme: true }, headerLinksStyle)(
	connect(
		mapStateToProps,
		{ searchMetaDataTagsSelenium, searchMetaDataTagsSoap, seleniumTagValue, fetchSeleniumTags }
	)(HeaderMetaDataSearch)
);
