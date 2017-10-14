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

class AnnouncementsEdit extends Component {

  componentDidMount() {
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
    this.props.availability.map((day) => days[day] = true);
    this.state = {
      availability:days,
      movility:this.props.movility
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
    return (
      <Form>
        <FormGroup>
          <Label for="movility">Movilidad</Label>
          <Input  name="movility" id="movility"
          value={this.state.movility} onChange={this.handleInputChange}/>
        </FormGroup>
        <Label>Disponibilidad</Label>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="lun" checked={this.state.availability.lun} onChange={this.handleCheckBoxChange} />{' '}
            Lunes
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="mar" checked={this.state.availability.mar} onChange={this.handleCheckBoxChange} />{' '}
            Martes
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="mier" checked={this.state.availability.mier} onChange={this.handleCheckBoxChange} />{' '}
            Miércoles
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="jue" checked={this.state.availability.jue} onChange={this.handleCheckBoxChange} />{' '}
            Jueves
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="vier" checked={this.state.availability.vier} onChange={this.handleCheckBoxChange} />{' '}
            Viernes
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="sab" checked={this.state.availability.sab} onChange={this.handleCheckBoxChange} />{' '}
            Sábado
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="dom" checked={this.state.availability.dom} onChange={this.handleCheckBoxChange} />{' '}
            Domingo
          </Label>
        </FormGroup>
        <Button onClick={() => {this.handleSubmit()} }>Enviar</Button>
      </Form>
     )
  }

}

function mapStateToProps(state){
  return {
    update_announcement: state.update_announcement
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateAnnouncements: updateAnnouncements
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsEdit);
