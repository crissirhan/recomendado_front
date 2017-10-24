import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Form, FormGroup, Label,Button, FormFeedback } from 'reactstrap';
import signUpClient from '../../actions/signup_client';
import signUpProfessional from '../../actions/signup_professional';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';
import { withRouter } from 'react-router';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';


class SignUpClientForm extends Component{
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkRut = this.checkRut.bind(this);
    this.validateRut = this.validateRut.bind(this);
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
    console.log("asd")
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
      console.log("asd")
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
    //this.props.history.push("/");
  }

  validateRut(value, ctx, input, cb) {
    if (!value || value === '') {
      cb(false);
      return;
    }
    return this.checkRut(value) ? cb(true) : cb('Rut inválido');
}

  render(){
    if(this.props.sign_up_client.success){
      return <div className="message--info">¡Usuario creado con éxito!</div>;
    }
    return (
      <AvForm onValidSubmit={this.handleSubmit}>
        <AvGroup>
          <Label for="exampleEmail">Correo electrónico</Label>
          <AvInput type="email" name="email" id="exampleEmail" placeholder="Ingrese su correo electrónico"
          value={this.state.email} onChange={this.handleInputChange} required />
          <AvFeedback>Debe ingresar un coreo electrónico válido</AvFeedback>
        </AvGroup>
        <AvGroup>
          <Label for="examplePassword1">Contraseña</Label>
          <AvInput type="password" name="password1" id="examplePassword1" placeholder="Ingrese su contraseña"
          value={this.state.password1} onChange={this.handleInputChange} required />
          <AvFeedback>Las contraseñas deben coincidir</AvFeedback>
        </AvGroup>
        <AvGroup>
          <Label for="examplePassword1">Repita su contraseña</Label>
          <AvInput  type="password" name="password2" id="examplePassword2" placeholder="Ingrese su contraseña nuevamente"
          value={this.state.password2} onChange={this.handleInputChange} required validate={{match:{value:'password1'}}} />
          <AvFeedback>Las contraseñas deben coincidir</AvFeedback>
        </AvGroup>
        <AvGroup >
          <Label for="first_name">Nombre</Label>
          <AvInput  name="first_name" id="first_name" placeholder="Ingrese su nombre"
          value={this.state.first_name} onChange={this.handleInputChange} required />
        </AvGroup>
        <AvGroup >
          <Label for="last_name">Apellido</Label>
          <AvInput  name="last_name" id="last_name" placeholder="Ingrese su apellido"
          value={this.state.last_name} onChange={this.handleInputChange} required />
        </AvGroup>
        {this.props.sign_up_client.error ? <div className="message--error">¡Error! {this.props.sign_up_client.error_type}</div> : null}
        <FormGroup>
          <Button>Registrarse</Button>
        </FormGroup>
      </AvForm>
    )
  }
  checkRut(rutCompleto) {
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.replace('.','').split('-');
		var digv	= tmp[1];
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (this.dv(rut) == digv );
	}
	dv(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpClientForm));
