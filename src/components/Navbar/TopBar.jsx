import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavbarBrand, Nav, NavItem, Navbar } from 'reactstrap';
import LoginForm from './LoginForm';
import AnnouncementForm from '../AnnouncementForm';
import SearchAnnouncements from '../SearchAnnouncements';
import {
  Link,withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import cookie from 'react-cookies';
import { setUserData, userLogout, getUserUrl } from '../../actions/user_actions';
import getProfileByUsername from '../../actions/get_profile_by_username';
import ReactDOM from 'react-dom'
import FacebookLoginButton from './FacebookLoginButton';

class TopBar extends Component {

  componentWillMount(){
  }

  componentDidUpdate(){
    var rect = ReactDOM.findDOMNode(this).offsetTop;
  }

  componentDidMount(){
    this.updateWindowDimensions();
    window.addEventListener('onscroll', this.updateWindowDimensions);
    if(this.props.user.id){
      this.props.getProfileByUsername(this.props.user.profile.username);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('onscroll', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ offset: window.pageYOffset });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps){
      if(nextProps.update_profile !== this.props.update_profile){
        if(nextProps.update_profile.success){
          this.props.getProfileByUsername(this.props.user.profile.username);
        }
      }
      if(nextProps.logged_in_user[0] !== this.props.logged_in_user[0]){
        this.setState({
          user:nextProps.logged_in_user[0]
        });
        let user_data = {
          name:nextProps.logged_in_user[0].name,
          id:nextProps.logged_in_user[0].id,
          type:nextProps.logged_in_user[0].is_professional ? 'professional' : 'client',
          profile: nextProps.logged_in_user[0],
          token: this.props.login_state.token
        }
        cookie.save('user', user_data, { path: '/' });
        if(nextProps.logged_in_user[0].id !== this.props.user.id){
          this.props.setUserData(user_data)
        }
        this.setState({
          cookie_setted:true
        });
      }

      if(this.state.fetched_user){
        return;
      }
      if(nextProps.login_state.loggedIn){
        if(!this.props.user.id){
          this.props.getProfileByUsername(nextProps.login_state.username);
          this.setState({
            fetched_user: true
          });
        }
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      signUpModal: false,
      logged_in_user:null,
      fetched_user:false,
      cookie_setted:false,
      user:null,
      isClient:false,
      isProfessional:false,
      announcementModal: false,
      offset:0,
      element:null
    };
    this.loginToggle = this.loginToggle.bind(this);
    this.signUpToggle = this.signUpToggle.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.announcementToggle = this.announcementToggle.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  loginToggle(){
    this.setState({
      loginModal: !this.state.loginModal
    });
  }

  announcementToggle(){
    this.setState({
      announcementModal: !this.state.announcementModal
    });
  }

  signUpToggle(){
    this.setState({
      signUpModal: !this.state.signUpModal
    });
  }

  onLogout(){
    this.props.userLogout()
    //window.location.assign('/')
  }


  render() {
    let buttons = null;
    let url = '/perfiles/' + this.props.user.id + '/'
    if( this.props.user.id !== null){
      buttons =
      <div class="CTAs">
        <Link to={url} class="login">
          <i class="fa fa-user"></i>
          <span class="d-none d-md-inline">{this.props.user.name}</span>
        </Link>
        <a to={this.props.location.pathname} onClick={() => this.onLogout()} style={{cursor: "pointer"}}>
          <i class="fa fa-sign-out"></i>
          <span class="d-none d-md-inline">Cerrar sesión</span>
        </a>
      </div>
    } else{
      buttons =
      <div class="CTAs">
        <Link to={"/login"+'?from=' + this.props.location.pathname} class="login">
          <i class="fa fa-sign-in"></i>
          <span class="d-none d-md-inline">Login</span>
        </Link>
        <Link to="/registro/" class="login">
          <i class="fa fa-user-plus"></i>
          <span class="d-none d-md-inline">Registro</span>
        </Link>
      </div>
    }
    return (
      <div class="top-bar">
        <div class="container-fluid">
          <div class="content-holder d-flex justify-content-between">
            <div class="info d-flex">
              <div class="contact d-flex">
                <p><a href="mailto:info@company.com"> <i class="fa fa-envelope-o text-primary"></i><span class="d-none d-md-inline">contacto@recomendado.cl</span></a></p>
                <p> <i class="fa fa-phone text-primary"></i><span class="d-none d-md-inline">+56 9 93226789</span></p>
              </div>
            </div>
            {buttons}
          </div>
          <FacebookLoginButton/>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    login_state:state.login,
    logged_in_user:state.logged_in_user,
    user:state.user,
    update_profile:state.update_profile
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProfileByUsername:getProfileByUsername,
    setUserData:setUserData,
    userLogout:userLogout,
    getUserUrl:getUserUrl
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
