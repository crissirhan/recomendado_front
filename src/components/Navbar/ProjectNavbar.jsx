import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavbarBrand, Nav, NavItem, Navbar } from 'reactstrap';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
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
    console.log(nextProps);
    console.log(this.state.fetched_user);

    if(this.props != nextProps){
      if(nextProps.logged_in_professional[0]){
        this.setState({
          user:nextProps.logged_in_professional[0],
          isProfessional:true
        });
        cookie.save('token', this.props.token.token_key, { path: '/' });
        console.log(nextProps.logged_in_professional[0]);
        console.log(this.state.user);
        cookie.save('user', this.state.user, { path: '/' });
        cookie.save('isProfessional', false, { path: '/' });
        cookie.save('isClient', true, { path: '/' });
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
        cookie.save('user', this.state.user, { path: '/' });
        cookie.save('isProfessional', false, { path: '/' });
        cookie.save('isClient', true, { path: '/' });
        this.setState({
          cookie_setted:true
        });
      }

      if(this.state.fetched_user){
        console.log("ceerrando props asd");
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
      console.log(nextProps);

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
      isProfessional:false
    };
    this.loginToggle = this.loginToggle.bind(this);
    this.signUpToggle = this.signUpToggle.bind(this);
    this.getLoggedInUserUrl = this.getLoggedInUserUrl.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  loginToggle(){
    this.setState({
      loginModal: !this.state.loginModal
    });
  }

  signUpToggle(){
    this.setState({
      signUpModal: !this.state.signUpModal
    });
  }

  onLogout(){
    console.log("LOGOUT");
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });
    cookie.remove('isProfessional', { path: '/' });
    cookie.remove('isClient', { path: '/' });
    window.location.reload()
    //history.push('/');
  }

  getLoggedInUserUrl(){
    console.log(cookie.loadAll());
    console.log(cookie.load('user'));
    console.log(cookie.load('user') != "undefined");
    console.log(this.state.isProfessional);
    if(cookie.load('user') != "undefined"){
      if(cookie.load('isProfessional') && cookie.load('user').user){
        console.log(this.state.user);
        console.log(cookie.load('user'));
        return '/profesionales/' + cookie.load('user').user.id;
      }
      if(cookie.load('isClient') && cookie.load('user').user){
        return '/clientes/' + cookie.load('user').user.id;
      }
    } else{
      if(this.state.isClient){
        return '/clientes/'+this.state.user.id+'/';
      }
      if(this.state.isProfessional){
        console.log("asd");
        return '/profesionales/'+this.state.user.id+'/';
      }
    }
    console.log(this.state);
    console.log(cookie.loadAll());
    return '/';
  }
  render() {
    console.log(this.state.logged_in_user);
    console.log(this.props);
    let buttons = null;
    console.log(this.getLoggedInUserUrl());

    if(cookie.load('user').user && (cookie.load('token') != undefined )){
      console.log(this.state.user);
      console.log(cookie.load('token'));
      console.log(this.state.user || (cookie.load('token') != undefined ));
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
      console.log(this.getLoggedInUserUrl());
      buttons =
      <Nav className="ml-auto" navbar>
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
    console.log(cookie.loadAll());
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
