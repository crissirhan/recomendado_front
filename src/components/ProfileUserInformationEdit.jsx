import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  Link
} from 'react-router-dom';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import {
  Container,
  Collapse,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col
} from 'reactstrap';
import updateProfile from '../actions/update_profile';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { ToastContainer, toast } from 'react-toastify';
import { setUserData } from '../actions/user_actions';


class ProfileNameEdit extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.update_profile !== this.props.update_profile){
      console.log(nextProps.update_profile)
      if(this.props.update_profile.success ){
        this.handleSuccess()
      }
      if(this.props.update_profile.error){
        this.handleError()
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.user.profile.first_name,
      last_name: this.props.user.profile.last_name,
      second_name: this.props.user.profile.second_name,
      second_lastname: this.props.user.profile.second_lastname
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSuccess(){
    this.props.setUserData({
      name:this.state.first_name + ' ' + this.state.last_name,
      profile: Object.assign({},this.props.user.profile, this.state)
    })
    toast.success("¡Nombres editados con éxito!", {
      position: toast.POSITION.BOTTOM_RIGHT})
  }

  handleError(){
    toast.error("Error al procesar la solicitud. Intente nuevamente más tarde.", {
      position: toast.POSITION.BOTTOM_RIGHT})
  }

  handleSubmit(){
    let new_name = {
      first_name: this.state.first_name,
      second_name: this.state.second_name,
      last_name: this.state.last_name,
      second_lastname: this.state.second_lastname
    }
    this.props.updateProfile(this.props.user.id,new_name);
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

  render(){
    console.log(this.props.user.profile)
    return (
      <div class="container" style={{margin:"30px"}}>
        <div style={{ opacity: this.props.update_profile.loading ? 0.5 : 1 }}>
          <AvForm disabled={this.props.update_profile.loading} onValidSubmit={this.handleSubmit}>
          <AvGroup >
            <Label for="first_name">Primer nombre*</Label>
            <AvInput  name="first_name" id="first_name" placeholder="Nombre"
            value={this.state.first_name} onChange={this.handleInputChange} required/>
            <AvFeedback>Escriba su nombre por favor</AvFeedback>
          </AvGroup>
          <AvGroup >
            <Label for="second_name">Segundo nombre</Label>
            <AvInput  name="second_name" id="second_name" placeholder="Segundo nombre"
            value={this.state.second_name} onChange={this.handleInputChange}/>
            <AvFeedback>Escriba su segundo nombre por favor</AvFeedback>
          </AvGroup>
          <AvGroup >
            <Label for="last_name">Apellido*</Label>
            <AvInput  name="last_name" id="last_name" placeholder="Apellido"
            value={this.state.last_name} onChange={this.handleInputChange} required/>
            <AvFeedback>Escriba su apellido por favor</AvFeedback>
          </AvGroup>
          <AvGroup >
            <Label for="second_lastname">Segundo apellido</Label>
            <AvInput  name="second_lastname" id="second_lastname" placeholder="Segundo apellido"
            value={this.state.second_lastname} onChange={this.handleInputChange}/>
            <AvFeedback>Escriba su segundo apellido por favor</AvFeedback>
          </AvGroup>
          <FormGroup>
            <Button>Guardar</Button>
          </FormGroup>
        </AvForm>
        </div>
      </div>
     )
  }

}

function mapStateToProps(state){
  return {
    update_profile: state.update_profile,
    user:state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateProfile: updateProfile,
    setUserData:setUserData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNameEdit);
