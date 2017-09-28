import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavbarBrand, Nav, NavItem, Navbar } from 'reactstrap';
import LoginForm from './LoginForm';
import SignUpForm from './LoginForm';
import '../css/navbar/navbar.css'

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
      <Navbar color="inverse" inverse horizontal>
        <NavbarBrand href="/">Recomendado</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button color="primary" onClick={this.loginToggle}>Login</Button>{' '}
            <Modal isOpen={this.state.loginModal} toggle={this.loginToggle} className="navbar">
              <ModalHeader toggle={this.loginToggle}>Login</ModalHeader>
              <ModalBody>
                <LoginForm/>
              </ModalBody>
            </Modal>
          </NavItem>
          <NavItem>
            <Button color="primary" onClick={this.signUpToggle}>Registrarse</Button>{' '}
            <Modal isOpen={this.state.signUpModal} toggle={this.signUpToggle} className="navbar">
              <ModalHeader toggle={this.signUpToggle}>Registro</ModalHeader>
              <ModalBody>
                <SignUpForm/>
              </ModalBody>
            </Modal>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
export default ProjectNavbar;
