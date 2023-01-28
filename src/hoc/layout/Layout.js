import React, { Component } from "react";
import Header from "./header/Header";
import AuthFooter from "../authLayout/AuthFooter"
import Footer from "./footer/Footer";
import { connect } from 'react-redux'
import TostarMessages from '../../components/alertMessages/TostarMessages'
import { history } from '../../_helpers/history'
import { toggle_theme_navBar } from '../../actions/componentRedirectionActions'
import {
  get_dealer_profile_data,
  get_user_profile_data,
  get_dealer_user_profile_data
} from '../../actions/userProfileActions'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      linkLogin: history.location.pathname === '/login' ? true : false,
      linkRegister: history.location.pathname === '/register' ? true : false
    }
    if (history.location.pathname === '/login' || history.location.pathname === '/register' || history.location.pathname === '/seller/register' || history.location.pathname === '/dealer/register') {
      (this.props.toggle_theme_navBar(false))
    } else {
      (this.props.toggle_theme_navBar(true))
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    history.listen((location) => {
      if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/seller/register' || history.location.pathname === '/dealer/register') {
        (this.props.toggle_theme_navBar(false))
        this.setState({
          ...this.state,
          linkLogin: location.pathname === '/login' ? true : false,
          linkRegister: location.pathname === '/register' ? true : false
        })
      } else {
        this.props.toggle_theme_navBar(true)
      }
    })
    if (this.props.user_id && Number(localStorage.getItem('user_type')) === 2 && Object.keys(this.props.get_user_profile).length === 0) {
      if(localStorage.getItem("is_staff") !== "true"){
        this.props.get_dealer_profile_data(this.props.user_id)
      }else {
        this.props.get_dealer_user_profile_data(this.props.user_id)

      }
    }
    if (this.props.user_id && Number(localStorage.getItem('user_type')) === 1 && Object.keys(this.props.get_user_profile).length === 0) {
      this.props.get_user_profile_data(this.props.user_id)
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.toggle_theme_bar ? <Header linkLogin={this.state.linkLogin} linkRegister={this.state.linkRegister} /> : <Header linkLogin={this.state.linkLogin} linkRegister={this.state.linkRegister} />}
        {this.props.children}
        <TostarMessages />
        {history.location.pathname === '/' || history.location.pathname === '/about-us' || history.location.pathname === '/contact-us' || history.location.pathname === '/privacy' || history.location.pathname === '/terms' || history.location.pathname === '/how-it-works' || history.location.pathname === '/dealer-how-it-work' ? this.props.toggle_theme_bar ? <Footer /> : <AuthFooter /> : ''}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toggle_theme_bar: state.componentFilter.componentFilterReducer.toggle_theme_bar,
    user_id: state.authReducer.authentication.user.user_id,
    get_user_profile: state.userProfileReducer.get_user_profile,
  }
}
export default connect(mapStateToProps, {
  toggle_theme_navBar, get_dealer_profile_data,
  get_user_profile_data,
  get_dealer_user_profile_data
})(Layout);