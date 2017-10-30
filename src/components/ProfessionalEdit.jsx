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
import updateProfessional from '../actions/update_professional';
import getProfessional from '../actions/get_professional';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import cookie from 'react-cookies';
import { RegionesYcomunas } from '../Globals';


class ProfessionalEdit extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.professional !== this.props.professional){
      this.setState({
        email:nextProps.professional.user.email,
        first_name: nextProps.professional.user.first_name,
        last_name: nextProps.professional.user.last_name,
        experience: nextProps.professional.experience,
        region: nextProps.professional.region,
        city: nextProps.professional.city,
        street: nextProps.professional.street,
        house_number: nextProps.professional.house_number,
        phone_number: nextProps.professional.phone_number,
        user_id: nextProps.professional.user.id,
        professional_id:nextProps.professional.id
      })
    }
    if(nextProps.update_professional !== this.props.update_professional){

      if(this.props.update_professional.success !== nextProps.update_professional.success){
        this.setState({
          success:nextProps.update_professional.success
        })
      }
      if(this.props.update_professional.error !== nextProps.update_professional.error){
        this.setState({
          error:nextProps.update_professional.error
        })
      }
      if(this.props.update_professional.loading !== nextProps.update_professional.loading){
        this.setState({
          loading:nextProps.update_professional.loading
        })
      }
    }
  }

  componentDidMount() {
    this.props.getProfessional(this.props.professional_id)
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name:'',
      last_name:'',
      experience:'',
      region: RegionesYcomunas.regiones[0].NombreRegion,
      city: RegionesYcomunas.regiones[0].comunas[0],
      street: '',
      house_number: '',
      phone_number: '',
      profile_picture:null,
      success:false,
      error:false,
      loading:false,
      user_id: null,
      professional_id:null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(){
    let user_data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    }
    let request = {
      user: user_data,
      profile_picture: this.state.profile_picture,
      experience:this.state.experience,
      region: this.state.region,
      city: this.state.city,
      street: this.state.street,
      house_number: this.state.house_number,
      phone_number: this.state.phone_number,
    }
    this.props.updateProfessional(this.props.professional_id,request);
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
    let owner = false;
    if( cookie.load('user') && cookie.load('user').id === this.state.professional_id && cookie.load('isProfessional') === "true"){
      owner = true;
    }
    if(!owner){
      return <div>No deberías estar acá</div>
    }
    if(this.state.success){
      return <Container><div className="message--info">Perfil editado con éxito!</div></Container>;
    }
    if(this.state.error){
      return <Container><div className="message--error">¡Ocurrió un error!</div></Container>;
    }
    return (
      <Container>
        <div style={{ opacity: this.state.loading ? 0.5 : 1 }}>
          <AvForm disabled={this.state.loading} onValidSubmit={this.handleSubmit}>
          <AvGroup>
            <Label for="profile_picture">Foto de perfil</Label>
            <AvInput type="file" disabled={true} accept="image/*" name="profile_picture" id="profile_picture"
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
          <AvGroup>
             <Label for="region">Región</Label>
             <AvInput type="select" name="region" id="region" onChange={this.handleInputChange} value={this.state.region}>
               {RegionesYcomunas.regiones.map((region, index) => {
                  return <option key={index} value={region.NombreRegion}>{region.NombreRegion}</option>
               })}
             </AvInput>
          </AvGroup>
          <AvGroup>
             <Label for="city">Comuna</Label>
             <AvInput type="select" name="city" id="city" onChange={this.handleInputChange} value={this.state.city}>
               {RegionesYcomunas.regiones.find(o => o.NombreRegion === this.state.region).comunas.map((comuna, index) => {
                  return <option key={index} value={comuna}>{comuna}</option>
               })}
             </AvInput>
          </AvGroup>
          <AvGroup >
            <Label for="street">Calle</Label>
            <AvInput  name="street" id="street" placeholder="Calle"
            value={this.state.street} onChange={this.handleInputChange} required />
            <AvFeedback>Debe ingresar una calle</AvFeedback>
          </AvGroup>
          <AvGroup >
            <Label for="house_number">Número</Label>
            <AvInput type="number" name="house_number" id="house_number" placeholder="Número de casa o departamento"
            value={this.state.house_number} onChange={this.handleInputChange} required />
            <AvFeedback>Número no válido</AvFeedback>
          </AvGroup>
          <AvGroup >
            <Label for="phone_number">Número de teléfono</Label>
            <AvInput  name="phone_number" id="phone_number" placeholder="Número de teléfono"
            value={this.state.phone_number} onChange={this.handleInputChange} />
          </AvGroup>
          {this.state.error ? <div className="message--error">¡Error! {this.state.error_type}</div> : null}
          <FormGroup>
            <Button>Guardar</Button>
          </FormGroup>
        </AvForm>
        </div>
      </Container>
     )
  }

}

function mapStateToProps(state){
  return {
    update_professional: state.update_professional,
    professional: state.professional
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateProfessional: updateProfessional,
    getProfessional: getProfessional
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalEdit);
