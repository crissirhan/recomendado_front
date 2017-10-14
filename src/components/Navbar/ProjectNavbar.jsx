import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavbarBrand, Nav, NavItem, Navbar } from 'reactstrap';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import AnnouncementForm from '../AnnouncementForm';
import '../css/navbar/navbar.css';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import cookie from 'react-cookies';
import getClientByUsername from '../../actions/get_client_by_username';
import getProfessionalByUsername from '../../actions/get_professional_by_username';

class ProjectNavbar extends Component {

  componentWillReceiveProps(nextProps) {

    if(this.props != nextProps){
      if(nextProps.logged_in_professional[0]){
        this.setState({
          user:nextProps.logged_in_professional[0],
          isProfessional:true
        });
        cookie.save('token', this.props.token.token_key, { path: '/' });
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
        cookie.save('token', this.props.token.token_key, { path: '/' });
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
      if(nextProps.token && !this.state.fetch_user){
        this.props.getClientByUsername(nextProps.token.username);
        this.props.getProfessionalByUsername(nextProps.token.username);
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
      announcementModal: false
    };
    this.loginToggle = this.loginToggle.bind(this);
    this.signUpToggle = this.signUpToggle.bind(this);
    this.getLoggedInUserUrl = this.getLoggedInUserUrl.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.announcementToggle = this.announcementToggle.bind(this);
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
    window.location.reload()
    //history.push('/');
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
  render() {
    let buttons = null;

    let aux_exists = cookie.load('user') ? cookie.load('user').user : false; //TODO: quita esto y hazlo bien
    if(aux_exists && (cookie.load('token') != undefined )){
      /*
      if(!this.state.cookie_setted){
        //TODO: mover esto a algún lugar donde haga más sentido!


        if(this.props.isProfessional){
          cookie.save('token', this.props.token.token_key, { path: '/' });
          cookie.save('user', this.state.user, { path: '/' });
          cookie.save('isProfessional', true, { path: '/' });
          cookie.save('isClient', false, { path: '/' });

        }
        if(this.state.isClient){
          cookie.save('token', this.props.token.token_key, { path: '/' });
          cookie.save('user', this.state.user, { path: '/' });
          cookie.save('isProfessional', false, { path: '/' });
          cookie.save('isClient', true, { path: '/' });
        }
        this.setState({
          cookie_setted:true
        });
      }
      */
      let annoucement_modal = null;
      if(cookie.load('isProfessional') === "true"){
        annoucement_modal =
        <NavItem>
          <Button color="primary" onClick={this.announcementToggle}>Crear anuncio</Button>{' '}
          <Modal isOpen={this.state.announcementModal} toggle={this.announcementToggle} className="navbar">
            <ModalHeader toggle={this.announcementToggle}>Crear anuncio</ModalHeader>
            <ModalBody>
              <AnnouncementForm toggle={this.announcementToggle}/>
            </ModalBody>
          </Modal>
        </NavItem>
      }
      buttons =
      <Nav className="ml-auto" navbar>
        {annoucement_modal}
        <NavItem>
          <Link to={this.getLoggedInUserUrl()}>
            <Button color="primary">Perfil</Button>{' '}
          </Link>
        </NavItem>
        <NavItem>
          <Button color="primary" onClick={() => this.onLogout()}>Logout</Button>{' '}
        </NavItem>
      </Nav>
    } else{
      buttons =
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Button color="primary" onClick={this.loginToggle}>Login</Button>{' '}
          <Modal isOpen={this.state.loginModal} toggle={this.loginToggle} className="navbar">
            <ModalHeader toggle={this.loginToggle}>Login</ModalHeader>
            <ModalBody>
              <LoginForm toggle={this.loginToggle}/>
            </ModalBody>
          </Modal>
        </NavItem>
        <NavItem>
          <Link to="/registro/">
            <Button color="primary" onClick={this.signUpToggle}>Registrarse</Button>
          </Link>
        </NavItem>
      </Nav>
    }
    return (
      <Navbar color="inverse" inverse>
        <Link to='/'>
          <NavbarBrand>Recomendado</NavbarBrand>
        </Link>
        {buttons}
      </Navbar>
    );
  }
}
function mapStateToProps(state){
  return {
    token:state.token,
    login:state.login,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNavbar);
