import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import LoginForm from './Navbar/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.loginToggle = this.loginToggle.bind(this);
    this.state = {
      isOpen: false,
      loginModal: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  loginToggle(){
    this.setState({
      loginModal: !this.state.loginModal
    });
  }

  render() {
    return (

      <div>
        <Navbar color="inverse" inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">Recomendado</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button color="primary" onClick={this.loginToggle}>Login</Button>{' '}
                <Modal isOpen={this.state.loginModal} toggle={this.loginToggle} className={this.props.className}>
                  <ModalHeader toggle={this.loginToggle}>Login</ModalHeader>
                  <ModalBody>
                    <LoginForm/>
                  </ModalBody>
                </Modal>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <Container>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
