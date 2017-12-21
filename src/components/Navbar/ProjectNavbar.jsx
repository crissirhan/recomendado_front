import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavbarBrand, Nav, NavItem, Navbar } from 'reactstrap';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import AnnouncementForm from '../AnnouncementForm';
import SearchAnnouncements from '../SearchAnnouncements';
import '../css/navbar/navbar.css';
import {
  Link,withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import cookie from 'react-cookies';
import getClientByUsername from '../../actions/get_client_by_username';
import getProfessionalByUsername from '../../actions/get_professional_by_username';
import ReactDOM from 'react-dom'

class ProjectNavbar extends Component {

  componentDidUpdate(){
    var rect = ReactDOM.findDOMNode(this).offsetTop;
    console.log(rect);
  }

  componentDidMount(){
    this.updateWindowDimensions();
    window.addEventListener('onscroll', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('onscroll', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ offset: window.pageYOffset });
  }
  componentWillReceiveProps(nextProps) {

    if(this.props != nextProps){
      if(nextProps.logged_in_professional[0]){
        this.setState({
          user:nextProps.logged_in_professional[0],
          isProfessional:true
        });
        cookie.save('token', this.props.login_state.token, { path: '/' });
        cookie.save('user', nextProps.logged_in_professional[0], { path: '/' });
        cookie.save('isProfessional', true, { path: '/' });
        cookie.save('isClient', false, { path: '/' });
        this.setState({
          cookie_setted:true
        });
      }
      if(nextProps.logged_in_client[0]){
        this.setState({
          user:nextProps.logged_in_client[0],
          isClient:true
        });
        cookie.save('token', this.props.login_state.token, { path: '/' });
        cookie.save('user', nextProps.logged_in_client[0], { path: '/' });
        cookie.save('isProfessional', false, { path: '/' });
        cookie.save('isClient', true, { path: '/' });
        this.setState({
          cookie_setted:true
        });
      }

      if(this.state.fetched_user){
        return;
      }
      if(nextProps.login_state.loggedIn){
        this.props.getClientByUsername(nextProps.login_state.username);
        this.props.getProfessionalByUsername(nextProps.login_state.username);
        this.setState({
          fetched_user: true
        });
      }
    }
    if(this.props != nextProps) {

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
    this.getLoggedInUserUrl = this.getLoggedInUserUrl.bind(this);
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
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });
    cookie.remove('isProfessional', { path: '/' });
    cookie.remove('isClient', { path: '/' });
    window.location.assign('/')
  }

  getLoggedInUserUrl(){
    if(cookie.load('user') != "undefined"){
      if(cookie.load('isProfessional') === "true" && cookie.load('user').user){
        return '/profesionales/' + cookie.load('user').id;
      }
      if(cookie.load('isClient') === "true" && cookie.load('user').user){
        return '/clientes/' + cookie.load('user').id;
      }
    } else{
      if(this.state.isClient){
        return '/clientes/'+this.state.user.id+'/';
      }
      if(this.state.isProfessional){
        return '/profesionales/'+this.state.user.id+'/';
      }
    }
    return '/';
  }

  getLoggedInUserName(){
    if(cookie.load('user') != "undefined"){
      if(cookie.load('user').user){
        return cookie.load('user').user.first_name + ' ' + cookie.load('user').user.last_name ;
      } else {
        return 'Perfil'
      }
    } else{
      return this.state.user.first_name + ' ' + this.state.user.last_name
    }
  }

  render() {
    let buttons = null;
    if(this.state.element){
      console.log(this.state.offset)

    }

    let aux_exists = cookie.load('user') ? cookie.load('user').user : false; //TODO: quitar esto y hacer los checkeos mejor
    if(aux_exists && (cookie.load('token') != undefined )){
      buttons =
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link" href={this.getLoggedInUserUrl()}>
            {this.getLoggedInUserName()}
          </a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" onClick={() => this.onLogout()}>
            Logout
          </a>
        </li>
      </ul>
    } else{
      buttons =
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <a class="nav-link" onClick={this.loginToggle} href={"/login"+'?from=' + this.props.location.pathname}>
            Login
          </a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" onClick={this.signUpToggle} href="/registro/">
            Registrarse
          </a>
        </li>
      </ul>
    }
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <div class="container">
          <a class="navbar-brand js-scroll-trigger" href='/'>
              Recomendado
          </a>
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fa fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            {buttons}
          </div>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state){
  return {
    login_state:state.login,
    logged_in_professional:state.logged_in_professional,
    logged_in_client:state.logged_in_client
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getClientByUsername:getClientByUsername,
    getProfessionalByUsername:getProfessionalByUsername
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectNavbar));
