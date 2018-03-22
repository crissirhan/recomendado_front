import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Form, FormGroup, Label,Button, FormFeedback } from 'reactstrap';
import signUpClient from '../../actions/signup_client';
import signUpProfessional from '../../actions/signup_professional';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { ToastContainer, toast } from 'react-toastify';



class SignUpClientForm extends Component{

  componentWillReceiveProps(nextProps){
    if(nextProps.sign_up_client !== this.props.sign_up_client){
      if(this.props.sign_up_client.success !== nextProps.sign_up_client.success){
        this.setState({
          success:nextProps.sign_up_client.success
        })
      }
      if(this.props.sign_up_client.error !== nextProps.sign_up_client.error){
        this.setState({
          error:nextProps.sign_up_client.error,
          error_types:[]
        })
      }
      if(this.props.sign_up_client.loading !== nextProps.sign_up_client.loading){
        this.setState({
          loading:nextProps.sign_up_client.loading
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
      identification:null,
      profile_picture:null,
      loading:false,
      error:false,
      success:false,
      error_types:[]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkRut = this.checkRut.bind(this);
    this.validateRut = this.validateRut.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
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

  handleSuccess(){
    toast.success("¡Usuario creado con éxito!", {
      position: toast.POSITION.BOTTOM_RIGHT})
    this.props.history.push('/');
  }

  handleError(){
    toast.error("Error al procesar la solicitud", {
      position: toast.POSITION.BOTTOM_RIGHT})
  }

  render(){
    if(this.state.success){
      this.handleSuccess()
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
          </AvGroup>
          <AvGroup >
            <Label for="last_name">Apellido</Label>
            <AvInput  name="last_name" id="last_name" placeholder="Ingrese su apellido"
            value={this.state.last_name} onChange={this.handleInputChange} required />
          </AvGroup>
          {this.state.error ? <div className="message--error">¡Error! {this.state.error_types.join(' ')}</div> : null}
          <FormGroup>
            <Button disabled={this.state.loading}>Registrarse</Button>
          </FormGroup>
        </AvForm>
        <div>
            <div class="">
            <div class="">
            	<div class="panel panel-default">
            		<div class="panel-heading">
    			    		<h3 class="panel-title">Please sign up for Bootsnipp <small>It's free!</small></h3>
    			 			</div>
    			 			<div class="panel-body">
    			    		<form role="form">
    			    			<div class="row">
    			    				<div class="col-xs-6 col-sm-6 col-md-6">
    			    					<div class="form-group">
    			                <input type="text" name="first_name" id="first_name" class="form-control input-sm" placeholder="First Name"/>
    			    					</div>
    			    				</div>
    			    				<div class="col-xs-6 col-sm-6 col-md-6">
    			    					<div class="form-group">
    			    						<input type="text" name="last_name" id="last_name" class="form-control input-sm" placeholder="Last Name"/>
    			    					</div>
    			    				</div>
    			    			</div>

    			    			<div class="form-group">
    			    				<input type="email" name="email" id="email" class="form-control input-sm" placeholder="Email Address"/>
    			    			</div>

    			    			<div class="row">
    			    				<div class="col-xs-6 col-sm-6 col-md-6">
    			    					<div class="form-group">
    			    						<input type="password" name="password" id="password" class="form-control input-sm" placeholder="Password"/>
    			    					</div>
    			    				</div>
    			    				<div class="col-xs-6 col-sm-6 col-md-6">
    			    					<div class="form-group">
    			    						<input type="password" name="password_confirmation" id="password_confirmation" class="form-control input-sm" placeholder="Confirm Password"/>
    			    					</div>
    			    				</div>
    			    			</div>

    			    			<input type="submit" value="Register" class="btn btn-info btn-block"/>

    			    		</form>
    			    	</div>
    	    		</div>
        		</div>
        	</div>
        </div>
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
