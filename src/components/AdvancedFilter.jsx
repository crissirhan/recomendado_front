import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import getSubJobCategories from '../actions/get_job_sub_categories';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Rating from 'react-rating';
import './css/font-awesome/css/font-awesome.min.css';
import './css/rating/rating.css';
import getAnnouncements from '../actions/get_announcements';

class AdvancedFilter extends Component {

  componentDidMount() {
    this.props.getSubJobCategories()
  }

  constructor(props) {
    super(props);
    this.state = {
      min_publish_date:null,
      max_publish_date:null,
      tags:[],
      title:'',
      description:'',
      first_name:'',
      last_name:'',
      min_price:'',
      max_price:'',
      min_rating:0,
      visible:true
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleSubmit(){
    let query = {}
    for (var key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        if(this.state[key]){
          query[key] = this.state[key]
        }
      }
    }
    if(this.state.min_publish_date){
      query.min_publish_date = this.state.min_publish_date.toISOString()
    }
    if(this.state.max_publish_date){
      query.max_publish_date = this.state.max_publish_date.toISOString()
    }
    query.tags = this.state.tags.map(tag => tag.value).join(", ")
    this.props.getAnnouncements(query)

  }

  handleMinDateChange(date) {
    this.setState({
      min_publish_date: date
    });
  }

  handleMaxDateChange(date) {
    this.setState({
      max_publish_date: date
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleKeyPress(target) {
    if(target.charCode==13){
            this.handleSubmit();
    }
  }
  handleTagChange(values){
    this.setState({
      tags:values
    })
  }

  handleStarChange(value){
    this.setState({
      min_rating:value
    });
  }

  render() {
    return (
      <Form>
         <FormGroup>
           <Label for="exampleEmail">Título del aviso</Label>
           <Input type="text" name="title" id="title"
           value={this.state.title} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}/>
         </FormGroup>
         <FormGroup>
           <Label for="exampleEmail">Descripción del aviso</Label>
           <Input type="text" name="description" id="description"
           value={this.state.description} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}/>
         </FormGroup>
         <FormGroup>
           <Label for="first_name">Nombre del profesional</Label>
           <Input type="text" name="first_name" id="first_name"
           value={this.state.first_name} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}/>
         </FormGroup>
         <FormGroup>
           <Label for="first_name">Apellido del profesional</Label>
           <Input type="text" name="last_name" id="last_name"
           value={this.state.last_name} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}/>
         </FormGroup>
         <FormGroup>
           <Label for="min_price">Precio mínimo</Label>
           <Input type="number" name="min_price" id="min_price"
           value={this.state.min_price} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}/>
         </FormGroup>
         <FormGroup>
           <Label for="max_price">Precio máximo</Label>
           <Input type="number" name="max_price" id="max_price"
           value={this.state.max_price} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}/>
         </FormGroup>
         <FormGroup>
           <Label for="min_publish_date">Publicado después del</Label>
           <DatePicker
              locale={'es-es'}
              dateFormat="DD/MM/YYYY"
              todayButton={"Hoy"}
              selected={this.state.min_publish_date}
              onChange={this.handleMinDateChange.bind(this)}
           />
         </FormGroup>
         <FormGroup>
           <Label for="max_publish_date">Publicado antes de</Label>
           <DatePicker
              locale={'es-es'}
              todayButton={"Hoy"}
              dateFormat="DD/MM/YYYY"
              selected={this.state.max_publish_date}
              onChange={this.handleMaxDateChange.bind(this)}
           />
         </FormGroup>
         <FormGroup>
           <Label for="job">Tags</Label>
           <Select
              name="form-field-name"
              value={this.state.tags}
              multi={true}
              placeholder={'Tags'}
              options={this.props.job_sub_categories ? this.props.job_sub_categories.map((tag) => {return {value:tag.id, label:tag.job_sub_type}}) : []}
              onChange={this.handleTagChange.bind(this)}
            />
         </FormGroup>
         <FormGroup>
           <Label for="rating">Rating mínimo</Label>
           <Rating
             empty="fa fa-star-o fa-2x orange-star"
             full="fa fa-star fa-2x orange-star"
             initialRate={this.state.min_rating}
             start={0}
             stop={5}
             onClick={this.handleStarChange.bind(this)}
           />
         </FormGroup>
         <Button onClick={() => this.handleSubmit() } >Buscar</Button>
       </Form>
    );
  }
}
function mapStateToProps(state){
  return {
    job_sub_categories: state.job_sub_categories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSubJobCategories: getSubJobCategories,
    getAnnouncements:getAnnouncements
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedFilter);
