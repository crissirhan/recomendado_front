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
import SignUpForm from './components/signup/SignUpForm';
import SearchAnnouncements from './components/SearchAnnouncements';
import { signUp } from './services/UserServices';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class App extends Component {
  componentDidMount() {
  }
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.loginToggle = this.loginToggle.bind(this);
    this.signUpToggle = this.signUpToggle.bind(this);
    this.state = {
      isOpen: false,
      loginModal: false,
      signUpModal: false
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

  signUpToggle(){
    this.setState({
      signUpModal: !this.state.signUpModal
    });
  }

  submit = (values) => {
    signUp(values.username, values.password1, values.password2, values.email);
    console.log(this.props);
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
              <NavItem>
                <Button color="primary" onClick={this.signUpToggle}>Registrarse</Button>{' '}
                <Modal isOpen={this.state.signUpModal} toggle={this.signUpToggle} className={this.props.className}>
                  <ModalHeader toggle={this.signUpToggle}>Registro</ModalHeader>
                  <ModalBody>
                    <SignUpForm onSubmit={this.submit} />
                  </ModalBody>
                </Modal>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <Container>
            <SearchAnnouncements/>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

//export default App;
