import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import signUpClient from '../../actions/signup_client';
import signUpProfessional from '../../actions/signup_professional';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';
import { withRouter } from 'react-router';


class SignUpForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password1: '',
      password2:'',
      switch_professional:false,
      switch_client:true,
      first_name:'',
      last_name:'',
      rut: '',
      region: '',
      city: '',
      street: '',
      house_number: '',
      phone_number: '',
      identification:null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSwitchChange(){
    this.setState({
      switch_client: !this.state.switch_client,
      switch_professional: !this.state.switch_professional
    });
  }

  handleSubmit(){
    if(this.state.password1 != this.state.password2){
      return;
    }
    let user_data = {
      username: this.state.email, //username === email
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password1
    }
    let request = {
      user: user_data
    }
    if(this.state.switch_client){
      this.props.signUpClient(request);
    }
    if(this.state.switch_professional){
      request.rut = this.state.rut;
      request.region = this.state.region;
      request.city = this.state.city;
      request.street = this.state.street;
      request.house_number = this.state.house_number;
      request.phone_number = this.state.phone_number;
      request.identification = this.state.identification;
      this.props.signUpProfessional(request);
    }
    //this.props.signUp(this.state.email, this.state.password1, this.state.password2, this.state.email);
    //this.props.toggle();
    this.props.history.push("/");
  }

  render(){
    return (
      <Form>
        <SwitchButton name="switch-8" defaultChecked={this.state.switch_client} label="Escoger tipo de usuario" mode="select" labelRight="Cliente" label="Profesional" onChange={this.handleSwitchChange}/>
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
        <FormGroup >
          <Label for="first_name">Nombre</Label>
          <Input  name="first_name" id="first_name" placeholder="Ingrese su nombre"
          value={this.state.first_name} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup >
          <Label for="last_name">Apellido</Label>
          <Input  name="last_name" id="last_name" placeholder="Ingrese su apellido"
          value={this.state.last_name} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup hidden={!this.state.switch_professional}>
          <Label for="rut">Rut</Label>
          <Input  name="rut" id="rut" placeholder="Ingrese su rut"
          value={this.state.rut} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup hidden={!this.state.switch_professional}>
          <Label for="region">Región</Label>
          <Input  name="region" id="region" placeholder="Región"
          value={this.state.region} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup hidden={!this.state.switch_professional}>
          <Label for="city">Ciudad</Label>
          <Input  name="city" id="city" placeholder="Ciudad"
          value={this.state.city} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup hidden={!this.state.switch_professional}>
          <Label for="street">Calle</Label>
          <Input  name="street" id="street" placeholder="Calle"
          value={this.state.street} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup hidden={!this.state.switch_professional}>
          <Label for="house_number">Número de casa</Label>
          <Input  name="house_number" id="house_number" placeholder="Número de casa"
          value={this.state.house_number} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup hidden={!this.state.switch_professional}>
          <Label for="phone_number">Número de teléfono</Label>
          <Input  name="phone_number" id="phone_number" placeholder="Número de teléfono"
          value={this.state.phone_number} onChange={this.handleInputChange}/>
        </FormGroup>
        <Button onClick={() => {this.handleSubmit()} }>Enviar</Button>
      </Form>
    )
  }
}

function mapStateToProps(state){
  return {
    sign_up_client: state.sign_up_client,
    sign_up_professional: state.sign_up_professional
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signUpClient: signUpClient,
    signUpProfessional: signUpProfessional
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));
