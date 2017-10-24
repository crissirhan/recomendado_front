import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import { login } from '../services/UserServices';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import login from '../../actions/login_user';
import '../css/messages.css';
import { withRouter } from 'react-router';

class LoginForm extends Component{

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      if(nextProps.login_state.loggedIn){
        this.handleLogin();
        this.props.history.push("/");
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginRequest = this.loginRequest.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(){
    
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  loginRequest(){
    this.props.login(this.state.username, this.state.password);
  }

  render(){
    return (
      <div style={{ opacity: this.props.login_state.loading ? 0.5 : 1 }}>
        <Form>
           <FormGroup>
             <Label for="exampleEmail">Correo electrónico</Label>
             <Input type="email" name="username" id="exampleEmail" placeholder="Ingrese su correo electrónico"
             value={this.state.username} onChange={this.handleInputChange}/>
           </FormGroup>
           <FormGroup>
             <Label for="examplePassword">Contraseña</Label>
             <Input type="password" name="password" id="examplePassword" placeholder="Ingrese su contraseña"
             value={this.state.password} onChange={this.handleInputChange}/>
           </FormGroup>
           {this.props.login_state.error ? <div className="message--error">Usuario o contraseña incorrecto</div> : null}
           <Button onClick={() => this.loginRequest() }>Login</Button>
         </Form>
       </div>
     )
  }
}
function mapStateToProps(state){
  return {
    login_state: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login: login
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
