import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import { login } from '../services/UserServices';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import login from '../../actions/login_user';


class LoginForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
    console.log(this.props);
    console.log(this.props.token);
  }

  render(){
    return (
      <Form>
         <FormGroup>
           <Label for="exampleUsername">Nombre de usuario</Label>
           <Input type="username" name="username" id="exampleUsername" placeholder="Ingrese su nombre de usuario"
           value={this.state.username} onChange={this.handleInputChange}/>
         </FormGroup>
         <FormGroup>
           <Label for="examplePassword">Contraseña</Label>
           <Input type="password" name="password" id="examplePassword" placeholder="Ingrese su contraseña"
           value={this.state.password} onChange={this.handleInputChange}/>
         </FormGroup>
         <Button onClick={() => {this.loginRequest()} }>Login</Button>
       </Form>
     )
  }
}
function mapStateToProps(state){
  return {
    token: state.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login: login
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
