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
    if(this.state.fetched_user){
      return;
    }
    if(this.props != nextProps) {
      console.log(nextProps);
      if(nextProps.token && !this.state.fetch_user){
        this.props.getClientByUsername(nextProps.token.username);
        this.props.getProfessionalByUsername(nextProps.token.username);
        this.setState({
          fetched_user: true
        });
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      signUpModal: false,
      logged_in_user:null,
      fetched_user:false
    };
    this.loginToggle = this.loginToggle.bind(this);
    this.signUpToggle = this.signUpToggle.bind(this);
    this.getLoggedInUserUrl = this.getLoggedInUserUrl.bind(this);
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

  getLoggedInUserUrl(){
    if(this.props.token.token_key && this.props.logged_in_client[0]){
      return '/clientes/'+this.props.logged_in_client[0].id+'/';
    }
    if(this.props.token.token_key && this.props.logged_in_professional[0]){
      return '/profesionales/'+this.props.logged_in_professional[0].id+'/';
    }
    return null;
  }
  render() {
    console.log(this.state.logged_in_user);
    console.log(this.props);
    let buttons = null;
    console.log(this.getLoggedInUserUrl());
    if(this.getLoggedInUserUrl()){
      buttons =
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to={this.getLoggedInUserUrl()}>
            <div color="primary">Perfil</div>{' '}
          </Link>
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
