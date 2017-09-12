import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
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
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
              </NavItem>
              <NavItem>
                <div>
                  <Button color="primary" onClick={this.loginToggle}>Login</Button>{' '}
                  <Modal isOpen={this.state.loginModal} toggle={this.loginToggle} className={this.props.className}>
                    <ModalHeader toggle={this.loginToggle}>Login</ModalHeader>
                    <ModalBody>
                      <LoginForm/>
                    </ModalBody>
                  </Modal>
                </div>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>Welcome to React</h1>
                <p>
                  <Button
                    tag="a"
                    color="success"
                    size="large"
                    href="http://reactstrap.github.io"
                    target="_blank"
                  >
                    View Reactstrap Docs
                  </Button>
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
