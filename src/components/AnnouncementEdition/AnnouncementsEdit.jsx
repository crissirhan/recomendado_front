import React, { Component } from 'react';
import { connect } from 'react-redux';
import getUserAnnouncements from '../../actions/get_user_announcements';
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
import updateAnnouncements from '../../actions/update_announcement';
import getAnnouncements from '../../actions/get_announcements';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import cookie from 'react-cookies';

class AnnouncementsEdit extends Component {

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      let days = this.state.availability;
      nextProps.announcements.availability.map((day) => days[day] = true);
      this.setState({
        availability: days,
        movility: nextProps.announcements.movility,
        title: nextProps.announcements.title,
        description: nextProps.announcements.description,
        price: nextProps.announcements.price,
        location: nextProps.announcements.location,
        professional_id:nextProps.announcements.professional.id
      })
    }
  }

  componentDidMount() {
    this.props.getAnnouncements(this.props.announcement_id,null)
  }

  constructor(props) {
    super(props);
    let days = {
      'lun':false,
      'mar':false,
      'mier':false,
      'jue':false,
      'vier':false,
      'sab':false,
      'dom':false
    }
    this.state = {
      availability:days,
      movility:'',
      title:'',
      description:'',
      price:'',
      location:'',
      professional_id:null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  toAnnouncements(){
    if(this.props.announcements[0]){
      return this.props.announcements[0].id;
    } else{
      return null;
    }
  }

  dayRenderer(props){
    if(!props.value){
      return '';
    }
    var days=props.value.split(',');
    return (days.map(day => <span key={day.toString()}>{day} </span>));
  }

  editRenderer(props){
    if(!props.value){
      return '';
    }
    var url = '/profesional/'+props.value.professional.id+'/announcement/'+props.value.id+'/';
    return <Link to={url}>Editar</Link>;
  }
  handleSubmit(){
    let days = [];
    for (var property in this.state.availability) {
        if (this.state.availability.hasOwnProperty(property)) {
            if(this.state.availability[property]){
              days.push(property);
            }
        }
    }
    let data = {'availability': days, 'movility': this.state.movility};
    this.props.updateAnnouncements(this.props.announcement_id,data);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCheckBoxChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let availability = {...this.state.availability};
    availability[name] = value;
    this.setState({availability:availability});

  }

  render(){
    let owner = false;
    if(cookie.load('user') && cookie.load('user').id === this.state.professional_id){
      owner = true;
    }
    return (
      <Container>
        <AvForm>
          <AvGroup>
            <Label for="movility">Movilidad</Label>
            <AvInput  name="movility" id="movility"
            value={this.state.movility} onChange={this.handleInputChange}/>
          </AvGroup>
          <AvGroup>
            <Label for="location">Ubicación</Label>
            <AvInput  name="location" id="location"
            value={this.state.location} onChange={this.handleInputChange}/>
          </AvGroup>
          <AvGroup>
            <Label for="title">Título</Label>
            <AvInput  name="title" id="title"
            value={this.state.title} onChange={this.handleInputChange}/>
          </AvGroup>
          <AvGroup>
            <Label for="description">Descripción</Label>
            <AvInput  name="description" id="description"
            value={this.state.description} onChange={this.handleInputChange}/>
          </AvGroup>
          <AvGroup>
            <Label for="price">Precio</Label>
            <AvInput type="number" name="price" id="price"
            value={this.state.price} onChange={this.handleInputChange}/>
          </AvGroup>
          <Label>Disponibilidad</Label>
          <AvGroup check>
            <Label check>
              <AvInput type="checkbox" name="lun" checked={this.state.availability.lun} onChange={this.handleCheckBoxChange} />{' '}
              Lunes
            </Label>
          </AvGroup>
          <AvGroup check>
            <Label check>
              <AvInput type="checkbox" name="mar" checked={this.state.availability.mar} onChange={this.handleCheckBoxChange} />{' '}
              Martes
            </Label>
          </AvGroup>
          <AvGroup check>
            <Label check>
              <AvInput type="checkbox" name="mier" checked={this.state.availability.mier} onChange={this.handleCheckBoxChange} />{' '}
              Miércoles
            </Label>
          </AvGroup>
          <AvGroup check>
            <Label check>
              <AvInput type="checkbox" name="jue" checked={this.state.availability.jue} onChange={this.handleCheckBoxChange} />{' '}
              Jueves
            </Label>
          </AvGroup>
          <AvGroup check>
            <Label check>
              <AvInput type="checkbox" name="vier" checked={this.state.availability.vier} onChange={this.handleCheckBoxChange} />{' '}
              Viernes
            </Label>
          </AvGroup>
          <AvGroup check>
            <Label check>
              <AvInput type="checkbox" name="sab" checked={this.state.availability.sab} onChange={this.handleCheckBoxChange} />{' '}
              Sábado
            </Label>
          </AvGroup>
          <AvGroup check>
            <Label check>
              <AvInput type="checkbox" name="dom" checked={this.state.availability.dom} onChange={this.handleCheckBoxChange} />{' '}
              Domingo
            </Label>
          </AvGroup>
          {owner? <Button onClick={() => {this.handleSubmit()} }>Enviar</Button> : null}
        </AvForm>
      </Container>
     )
  }

}

function mapStateToProps(state){
  return {
    update_announcement: state.update_announcement,
    announcements: state.announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateAnnouncements: updateAnnouncements,
    getAnnouncements: getAnnouncements
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsEdit);
