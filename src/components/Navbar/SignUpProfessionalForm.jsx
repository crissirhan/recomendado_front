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
import '../css/messages.css';
import { RegionesYcomunas } from '../../Globals'
import { ToastContainer, toast } from 'react-toastify';


class signUpProfessionalForm extends Component{

  componentWillReceiveProps(nextProps){
    if(nextProps.sign_up_professional !== this.props.sign_up_professional){
      if(this.props.sign_up_professional.success !== nextProps.sign_up_professional.success){
        this.setState({
          success:nextProps.sign_up_professional.success
        })
      }
      if(this.props.sign_up_professional.error !== nextProps.sign_up_professional.error){
        this.setState({
          error:nextProps.sign_up_professional.error
        })
      }
      if(this.props.sign_up_professional.loading !== nextProps.sign_up_professional.loading){
        this.setState({
          loading:nextProps.sign_up_professional.loading
        })
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password1: '',
      password2:'',
      switch_professional:true,
      switch_client:false,
      first_name:'',
      last_name:'',
      rut: '',
      region: RegionesYcomunas.regiones[0].NombreRegion,
      city: RegionesYcomunas.regiones[0].comunas[0],
      street: '',
      house_number: '',
      phone_number: '',
      identification:null,
      profile_picture:null,
      loading:false,
      error:false,
      success:false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkRut = this.checkRut.bind(this);
    this.validateRut = this.validateRut.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleSuccess(){
    toast.success("¡Usuario creado con éxito!")
    this.props.history.push('/login');
  }

  handleError(){
    toast.error("Error al procesar la solicitud")
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleImageChange(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        profile_picture: reader.result
      })
    }
    reader.readAsDataURL(file);

  }

  handleSwitchChange(){
    this.setState({
      switch_client: !this.state.switch_client,
      switch_professional: !this.state.switch_professional
    });
  }

  handleSubmit(){
    let user_data = {
      username: this.state.email, //username === email
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password1
    }
    let request = {
      user: user_data,
    }
    if(this.state.profile_picture){
      request.profile_picture = this.state.profile_picture;
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
      request.phone_number = this.state.phone_number.replace(' ', '');
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

  validatePhoneNumber(value, ctx, input, cb){
    if (!value || value === '') {
      cb(false);
      return;
    }
    return this.checkPhoneNumber(value) ? cb(true) : cb('Número de teléfono inválido');
  }

  render(){
    if(this.state.success){
      this.handleSuccess()
    }
    if(this.state.error){
      this.handleError()
    }
    return (
      <div style={{ opacity: this.state.loading ? 0.5 : 1 }}>
        <AvForm onValidSubmit={this.handleSubmit} disabled={this.state.loading}>

          <AvGroup>
            <Label for="exampleEmail">Correo electrónico</Label>
            <AvInput type="email" name="email" id="exampleEmail" placeholder="ejemplo@correo.com"
            value={this.state.email} onChange={this.handleInputChange} required />
            <AvFeedback>Debe ingresar un coreo electrónico válido</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="examplePassword1">Contraseña</Label>
            <AvInput type="password" name="password1" id="examplePassword1" minLength="8" placeholder="Ingrese su contraseña"
            value={this.state.password1} onChange={this.handleInputChange} required />
            <AvFeedback>Las contraseñas deben coincidir y ser de un largo mínimo de 8 carácteres</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="examplePassword1">Repita su contraseña</Label>
            <AvInput  type="password" name="password2" id="examplePassword2" minLength="8" placeholder="Ingrese su contraseña nuevamente"
            value={this.state.password2} onChange={this.handleInputChange} required validate={{match:{value:'password1'}}} />
            <AvFeedback>Las contraseñas deben coincidir y ser de un largo mínimo de 8 carácteres</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="profile_picture">Foto de perfil</Label>
            <AvInput type="file" accept="image/*" name="profile_picture" id="profile_picture"
             onChange={this.handleImageChange.bind(this)} />
          </AvGroup>
          <AvGroup >
            <Label for="first_name">Nombre</Label>
            <AvInput  name="first_name" id="first_name" placeholder="Ingrese su nombre"
            value={this.state.first_name} onChange={this.handleInputChange} required />
            <AvFeedback>Debe ingresar un nombre</AvFeedback>
          </AvGroup>
          <AvGroup >
            <Label for="last_name">Apellido</Label>
            <AvInput  name="last_name" id="last_name" placeholder="Ingrese su apellido"
            value={this.state.last_name} onChange={this.handleInputChange} required />
            <AvFeedback>Debe ingresar un apellido</AvFeedback>
          </AvGroup>
          <AvGroup hidden={!this.state.switch_professional}>
            <Label for="rut">Rut</Label>
            <AvInput  name="rut" id="rut" placeholder="12345678-k"
            value={this.state.rut} onChange={this.handleInputChange} validate={{custom: this.validateRut}} required />
            <AvFeedback>Rut no válido</AvFeedback>
          </AvGroup>
          <AvGroup>
             <Label for="region">Región</Label>
             <AvInput type="select" name="region" id="region" onChange={this.handleInputChange}>
               {RegionesYcomunas.regiones.map((region, index) => {
                  return <option key={index} value={region.NombreRegion}>{region.NombreRegion}</option>
               })}
             </AvInput>
          </AvGroup>
          <AvGroup>
             <Label for="city">Comuna</Label>
             <AvInput type="select" name="city" id="city" onChange={this.handleInputChange}>
               {RegionesYcomunas.regiones.find(o => o.NombreRegion === this.state.region).comunas.map((comuna, index) => {
                  return <option key={index} value={comuna}>{comuna}</option>
               })}
             </AvInput>
          </AvGroup>
          <AvGroup hidden={!this.state.switch_professional}>
            <Label for="street">Calle</Label>
            <AvInput  name="street" id="street" placeholder="Calle"
            value={this.state.street} onChange={this.handleInputChange} required />
            <AvFeedback>Debe ingresar una calle</AvFeedback>
          </AvGroup>
          <AvGroup hidden={!this.state.switch_professional}>
            <Label for="house_number">Número de casa o departamento</Label>
            <AvInput type="number" name="house_number" id="house_number" placeholder="ejemplo: 320"
            value={this.state.house_number} onChange={this.handleInputChange} required />
            <AvFeedback>Número no válido</AvFeedback>
          </AvGroup>
          <AvGroup hidden={!this.state.switch_professional}>
            <Label for="phone_number">Número de teléfono</Label>
            <AvInput  name="phone_number" id="phone_number" placeholder="ejemplos: 12345678, +56912345678"
            value={this.state.phone_number} onChange={this.handleInputChange} validate={{custom: this.checkPhoneNumber}} required />
          </AvGroup>
          {this.state.error ? <div className="message--error">¡Error!</div> : null}
          <FormGroup>
            <Button disabled={this.state.loading}>Registrarse</Button>
          </FormGroup>
        </AvForm>
      </div>
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
  checkPhoneNumber(number){
    return /^\+?(\d+)\)?[-. ]?(\d+)$/.test(number)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(signUpProfessionalForm));
