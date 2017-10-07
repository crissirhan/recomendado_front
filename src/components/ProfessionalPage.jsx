import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getProfessional from '../actions/get_professional';
import updateProfessional from '../actions/update_professional';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import {
  Container,
  Collapse
} from 'reactstrap';

class ProfessionalPage extends Component {

  componentDidMount() {
    this.props.getProfessional(this.props.professional_id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.syncPropToState(nextProps);
    }
  }

  syncPropToState(nextProps){
    if(this.state.lazyInitialization){
      for(var key in nextProps.professional) {
         if (nextProps.professional.hasOwnProperty(key)) {
            this.setState({
              [key]: nextProps.professional[key]
            });
         }
      }
      this.setState({
        lazyInitialization: false
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      lazyInitialization: true,
      editMode:false,
      username:'',
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      rut: '',
      region: '',
      city: '',
      street: '',
      house_number: '',
      phone_number: '',
      identification: ''
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

  editMode(){
    this.setState({
      editMode: !this.state.editMode
    });
  }

  handleSave(){
    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      rut: this.state.rut,
      region: this.state.region,
      city: this.state.city,
      street: this.state.street,
      house_number: this.state.house_number,
      phone_number: this.state.phone_number,
      username: this.state.username,
      email: this.state.username
    }
    console.log(data);
    this.props.updateProfessional(this.props.professional_id, data);
    this.editMode();
  }

  handleCancel(){
    this.props.getProfessional(this.props.professional_id);
    this.editMode();
  }
  render() {
    return (
      <Container>
        <Form >
          <FormGroup >
            <Label for="first_name">Nombre</Label><Input readOnly={!this.state.editMode} name="first_name" id="first_name"
            value={this.state.first_name} onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup >
            <Label for="last_name">Apellido</Label><Input readOnly={!this.state.editMode} name="last_name" id="last_name"
            value={this.state.last_name} onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup >
            <Label for="rut">Rut</Label><Input readOnly={!this.state.editMode} name="rut" id="rut"
            value={this.state.rut} onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup >
            <Label for="region">Región</Label><Input readOnly={!this.state.editMode} name="region" id="region"
            value={this.state.region} onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup >
            <Label for="rut">Ciudad</Label><Input readOnly={!this.state.editMode} name="city" id="city"
            value={this.state.city} onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup >
            <Label for="street">Calle</Label><Input readOnly={!this.state.editMode} name="street" id="street"
            value={this.state.street} onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup >
            <Label for="house_number">Número de casa</Label><Input readOnly={!this.state.editMode} name="house_number" id="house_number"
            value={this.state.house_number} onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup >
            <Label for="phone_number">Número de teléfono</Label><Input readOnly={!this.state.editMode} name="phone_number" id="phone_number"
            value={this.state.phone_number} onChange={this.handleInputChange}/>
          </FormGroup>
          <Button onClick={() => {this.editMode()}} hidden={this.state.editMode}>Editar</Button><Button hidden={!this.state.editMode} onClick={() => {this.handleSave()} }>Guardar</Button><Button hidden={!this.state.editMode} onClick={() => {this.handleCancel()} }>Cancelar</Button>
        </Form>
      </Container>
    );
  }
}
function mapStateToProps(state){
  return {
    professional: state.professional,
    update_professional: state.update_professional
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProfessional: getProfessional,
    updateProfessional: updateProfessional
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalPage);
