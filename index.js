import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
// import setAuthToken from './utils/setAuthToken';
import store from './store';
import { setCurrentUser, get_user, log_out } from './actions';
// import { createBrowserHistory } from "history";
import indexRoutes from './routes/index';
import './assets/scss/material-dashboard-pro-react.css?v=1.2.0';

//check for token, following code avoids flushing out userdata in redux store when clicked on refresh
if (localStorage.jwtToken) {
	//set auth token header auth
	//Not required for Now!
	//setAuthToken(localStorage.jwtToken);

	//decode
	const decoded = jwt_decode(localStorage.jwtToken);
	//set user is Authenticated
	store.dispatch(setCurrentUser(decoded));
	store.dispatch(get_user());
	//Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(log_out());
		//Redirect to Login
		window.location.href = "/pages/login-page";
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				{indexRoutes.map((prop, key) => {
					return (
						<Route path={prop.path} component={prop.component} key={key} />
					);
				})}
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("root")
);
