import React, { Component } from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
// import Store from "./Store.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Store from './_helpers/store'
import * as ACTIONS from './actions/authActions'
import { Provider } from "react-redux";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import ReactGA from 'react-ga';
ReactGA.initialize("AW-10947237489/Xs42COSlztgDEPGshuQo");

// import "datatables.net-dt/css/jquery.dataTables.min.css"
let adminPath = window.location.pathname ? window.location.pathname : ''
adminPath = adminPath ? adminPath.split('/')[1] ? adminPath.split('/')[1] : '' : ''

// Store.dispatch(ACTIONS.get_user_location_by_ip());

if (adminPath !== 'admin') {
  if (localStorage.getItem('user')) {
    Store.dispatch(ACTIONS.user_remian_login(JSON.parse(localStorage.getItem('user'))))
    Store.dispatch(ACTIONS.admin_screens(JSON.parse(localStorage.getItem('dealerSccrens'))))
  }
}
if (adminPath === 'admin') {
  if (localStorage.getItem('admin')) {
    Store.dispatch(ACTIONS.admin_remian_login(JSON.parse(localStorage.getItem('admin'))))
    Store.dispatch(ACTIONS.admin_screens(JSON.parse(localStorage.getItem('adminSccrens'))))
  }
}


class App extends Component {

  render() {
    return (
      <Provider store={Store}>
        <Routes />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
