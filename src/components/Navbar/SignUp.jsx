import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Form, FormGroup, Label,Button, FormFeedback } from 'reactstrap';
import signUp from '../../actions/signup';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { ToastContainer, toast } from 'react-toastify';

class SignUp extends Component{

  componentWillReceiveProps(nextProps){
    if(nextProps.sign_up !== this.props.sign_up){
      if(this.props.sign_up.success !== nextProps.sign_up.success){
        if(nextProps.sign_up.success){
          this.handleSuccess()
        }
      }
      if(this.props.sign_up.error !== nextProps.sign_up.error){
        console.log(nextProps)
        if(nextProps.sign_up.error){
          this.handleError()
        }
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password1: '',
      password2:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(){
  if(this.state.password1 !== this.state.password2){
      alert("Las contraseñas deben coincidir")
      return;
    }
    let user_data = {
      username: this.state.email, //username === email
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2
    }
    console.log(user_data)
    this.props.signUp(user_data);
  }


  handleSuccess(){
    toast.success("¡Usuario creado con éxito!", {
      position: toast.POSITION.BOTTOM_RIGHT})
    this.props.history.push('/login/');
  }

  handleError(){
    toast.error("Error al procesar la solicitud. Intente nuevamente más tarde.", {
      position: toast.POSITION.BOTTOM_RIGHT})
  }

  render(){
    return (
      <div class="panel panel-default">
        <fieldset>
          <legend class="panel-heading">
            <h2 class="panel-title">Registro de usuario</h2>
          </legend>
          <div class="panel-body" style={{ opacity: this.props.sign_up.loading ? 0.5 : 1 }}>
            <AvForm onValidSubmit={this.handleSubmit} disabled={this.props.sign_up.loading}>
              <AvGroup>
                <Label for="exampleEmail">Correo electrónico</Label>
                <AvInput type="email" name="email" id="exampleEmail" placeholder="correo@ejemplo.com"
                value={this.state.email} onChange={this.handleInputChange} required />
                <AvFeedback>Debe ingresar un coreo electrónico válido</AvFeedback>
              </AvGroup>
              <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6">
                  <div class="form-group">
                    <AvGroup>
                      <Label for="examplePassword1">Contraseña</Label>
                      <AvInput type="password" name="password1" id="examplePassword1" minLength="8" placeholder="Ingrese su contraseña"
                      value={this.state.password1} onChange={this.handleInputChange} required />
                      <AvFeedback>Las contraseñas deben coincidir y ser de un largo mínimo de 8 carácteres</AvFeedback>
                    </AvGroup>
                  </div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6">
                  <div class="form-group">
                  <AvGroup>
                    <Label for="examplePassword1">Confirme su contraseña</Label>
                    <AvInput  type="password" name="password2" id="examplePassword2" minLength="8" placeholder="Ingrese su contraseña nuevamente"
                    value={this.state.password2} onChange={this.handleInputChange} required validate={{match:{value:'password1'}}} />
                    <AvFeedback>Las contraseñas deben coincidir y ser de un largo mínimo de 8 carácteres</AvFeedback>
                  </AvGroup>
                  </div>
                </div>
              </div>
              <FormGroup>
                <Button disabled={this.props.sign_up.loading}>Registrarse</Button>
              </FormGroup>
            </AvForm>
          </div>
        </fieldset>
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
