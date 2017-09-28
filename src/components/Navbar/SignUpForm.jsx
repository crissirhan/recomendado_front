import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import signUp from '../../actions/signup_user';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';



class SignUpForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password1: '',
      password2:''
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

  handleSubmit(){
      this.props.signUp(this.state.email, this.state.password1, this.state.password2, this.state.email);
  }

  render(){
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Correo electrónico</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="Ingrese su correo electrónico"
          value={this.state.email} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword1">Contraseña</Label>
          <Input type="password" name="password1" id="examplePassword1" placeholder="Ingrese su contraseña"
          value={this.state.password1} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword1">Repita su contraseña</Label>
          <Input type="password" name="password2" id="examplePassword2" placeholder="Ingrese su contraseña nuevamente"
          value={this.state.password2} onChange={this.handleInputChange}/>
        </FormGroup>
        <Button onClick={() => {this.handleSubmit()} }>Enviar</Button>
      </Form>
    )
  }
}

function mapStateToProps(state){
  return {
    sign_up: state.sign_up
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signUp: signUp
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
