import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavbarBrand, Nav, NavItem, Navbar } from 'reactstrap';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import '../css/navbar/navbar.css';
import {
  Link,
} from 'react-router-dom';

class ProjectNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      signUpModal: false
    };
    this.loginToggle = this.loginToggle.bind(this);
    this.signUpToggle = this.signUpToggle.bind(this);
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

  render() {
    console.log(this.props.className);
    return (
      <Navbar color="inverse" inverse>
        <Link to='/'>
          <NavbarBrand>Recomendado</NavbarBrand>
        </Link>
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
      </Navbar>
    );
  }
}
export default ProjectNavbar;
