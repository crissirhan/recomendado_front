import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavbarBrand, Nav, NavItem, Navbar } from 'reactstrap';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import AnnouncementForm from '../AnnouncementForm';
import SearchAnnouncements from '../SearchAnnouncements';
import {
  Link,withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import cookie from 'react-cookies';
import getClientByUsername from '../../actions/get_client_by_username';
import { setUserData, userLogout, getUserUrl } from '../../actions/user_actions';
import getProfessionalByUsername from '../../actions/get_professional_by_username';
import ReactDOM from 'react-dom'

class TopBar extends Component {

  componentWillMount(){
  }

  componentDidUpdate(){
    var rect = ReactDOM.findDOMNode(this).offsetTop;
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
        if(nextProps.logged_in_professional[0].id !== this.props.user.id){
          this.props.setUserData({
            name:nextProps.logged_in_professional[0].user.first_name,
            lastname:nextProps.logged_in_professional[0].user.last_name,
            id:nextProps.logged_in_professional[0].id,
            type:'professional'
          })
        }
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
        if(nextProps.logged_in_client[0].id !== this.props.user.id){
          this.props.setUserData({
            name:nextProps.logged_in_client[0].user.first_name,
            lastname:nextProps.logged_in_client[0].user.last_name,
            id:nextProps.logged_in_client[0].id,
            type:'client'
          })
        }

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
    this.props.userLogout()
    //window.location.assign('/')
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

    }

    //let aux_exists = cookie.load('user') ? cookie.lo7ad('user').user : false; //TODO: quitar esto y hacer los checkeos mejor
    if(this.props.user.id && this.props.user.id !== ''){
      buttons =
      <div class="CTAs">
        <Link to={this.props.user.url} class="login">
          <i class="fa fa-user"></i>
          <span class="d-none d-md-inline">{this.props.user.name} {this.props.user.lastname}</span>
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
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    login_state:state.login,
    logged_in_professional:state.logged_in_professional,
    logged_in_client:state.logged_in_client,
    user:state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getClientByUsername:getClientByUsername,
    getProfessionalByUsername:getProfessionalByUsername,
    setUserData:setUserData,
    userLogout:userLogout,
    getUserUrl:getUserUrl
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
