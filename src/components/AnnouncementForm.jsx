import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import postAnnouncement from '../actions/post_announcement';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';
import { withRouter } from 'react-router';
import Rating from 'react-rating';
import './css/font-awesome/css/font-awesome.min.css';
import './css/rating/rating.css';
import getJobCategories from '../actions/get_job_categories';
import cookie from 'react-cookies';


class AnnouncementForm extends Component{

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps){
      this.setState({
        job_categories:nextProps.job_categories,
        job:nextProps.job_categories[0]
      });

    }
  }

  componentDidMount() {
    this.props.getJobCategories();
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
      job_subtype:null,
      location:'',
      job:null,
      job_categories:[],
      title:'',
      description:''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleJobSelectChange = this.handleJobSelectChange.bind(this);
    this.handleJobSubtypeSelectChange = this.handleJobSubtypeSelectChange.bind(this);
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
    let days = [];
    for (var property in this.state.availability) {
        if (this.state.availability.hasOwnProperty(property)) {
            if(this.state.availability[property]){
              days.push(property);
            }
        }
    }
    let publish_date = new Date(); //time now
    let expire_date = new Date(publish_date);
    expire_date.setFullYear(expire_date.getFullYear() + 1);
    let data = {
      publish_date:publish_date.toJSON(),
      expire_date:expire_date.toJSON(),
      movility:this.state.movility,
      job_id:this.state.job.id,
      professional_id:cookie.load('user').id,
      availability:days,
      location:this.state.location,
      title:this.state.title,
      description:this.state.description
    }
    if(this.state.job_subtype){
      data.job_subtype_id = this.state.job_subtype.id;
    }
    this.props.postAnnouncement(data);
    this.props.toggle();
  }

  handleCheckBoxChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let availability = {...this.state.availability};
    availability[name] = value;
    this.setState({availability:availability});

  }

  handleJobSelectChange(event){
    this.setState({
      job:this.state.job_categories[event.target.value],
      job_subtype:this.state.job_categories[event.target.value].sub_type[0] ? this.state.job_categories[event.target.value].sub_type[0] : null
    });
  }
  handleJobSubtypeSelectChange(event){
    this.setState({
      job_subtype:this.state.job.sub_type[event.target.value]
    });
  }

  render(){
    if(!this.state.job){
      return null;
    }
    return (
      <Form>
      <FormGroup>
        <Label for="title">Título</Label>
        <Input  name="title" id="title"
        value={this.state.title} onChange={this.handleInputChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="description">Descripción</Label>
        <Input  name="description" id="description"
        value={this.state.description} onChange={this.handleInputChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="movility">Movilidad</Label>
        <Input  name="movility" id="movility"
        value={this.state.movility} onChange={this.handleInputChange}/>
      </FormGroup>
      <FormGroup>
        <Label for="location">Ubicación</Label>
        <Input  name="location" id="location"
        value={this.state.location} onChange={this.handleInputChange}/>
      </FormGroup>
      <FormGroup>
         <Label for="job">Trabajo</Label>
         <Input type="select" name="job" id="job" onChange={this.handleJobSelectChange}>
           {this.state.job_categories.map((category, index) => {
              return <option key={category.id} value={index}>{category.job_type}</option>
           })}
         </Input>
      </FormGroup>
      <FormGroup hidden={this.state.job.sub_type.length === 0}>
         <Label for="job_subtype">Subtipo de trabajo</Label>
         <Input type="select" name="job_subtype" id="job_subtype" onChange={this.handleJobSubtypeSelectChange}>
           {this.state.job.sub_type.map((sub_job, index) => {
              return <option key={sub_job.id} value={index}>{sub_job.job_sub_type}</option>
           })}
         </Input>
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
    post_announcement: state.post_announcement,
    job_categories: state.job_categories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postAnnouncement: postAnnouncement,
    getJobCategories:getJobCategories
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnnouncementForm));
