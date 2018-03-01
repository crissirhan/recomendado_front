import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import getSubJobCategories from '../actions/get_job_sub_categories';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Rating from 'react-rating';
import './css/font-awesome/css/font-awesome.min.css';
import './css/rating/rating.css';
import getAnnouncements from '../actions/get_announcements';
import {updateSearchParams} from '../actions/search';
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import './css/date.css'

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
      min_price:0,
      max_price:100000,
      min_rating:0,
      visible:true,
      search:'',
      page_size:6
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
    },
  ()=>{
    this.props.updateSearchParams(Object.assign(this.props.search.searchParams, {min_publish_date:this.state.min_publish_date ? this.state.min_publish_date.toISOString() : null}))
    this.props.getAnnouncements(this.props.search.searchParams)
  });
  }

  handleMaxDateChange(date) {
    this.setState({
      max_publish_date: date
    },
  ()=>{
    this.props.updateSearchParams(Object.assign(this.props.search.searchParams, {max_publish_date:this.state.max_publish_date ? this.state.max_publish_date.toISOString() : null}))
    this.props.getAnnouncements(this.props.search.searchParams)
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
    },
  ()=>{
    this.props.updateSearchParams(Object.assign(this.props.search.searchParams, {min_rating:this.state.min_rating}))
    this.props.getAnnouncements(this.props.search.searchParams)
  });
  }

  handlePriceChange(value){
    this.setState({min_price:value.min, max_price:value.max},
    ()=> {
      this.props.updateSearchParams(Object.assign(this.props.search.searchParams, {min_price:this.state.min_price, max_price:this.state.max_price}))
      this.props.getAnnouncements(this.props.search.searchParams)
  })
  }

  render() {
    return (
      <Form>
         <FormGroup>
           <Label for="min_price">Precio mínimo/máximo</Label>
           <InputRange
              formatLabel={value => `$ ${value}`}
              step={1000}
              maxValue={100000}
              minValue={0}
              value={{min: this.state.min_price, max: this.state.max_price}}
              onChange={this.handlePriceChange.bind(this)}
            />
         </FormGroup>
         <FormGroup>
           <Label for="min_publish_date">Publicado después del</Label>
           <DatePicker
              locale={'es-Es'}
              dateFormat="DD/MM/YYYY"
              todayButton={"Hoy"}
              selected={this.state.min_publish_date}
              onChange={this.handleMinDateChange.bind(this)}
              placeholderText="Selecciona fecha"
              isClearable={true}
              className="short-input"
           />
         </FormGroup>
         <FormGroup>
           <Label for="max_publish_date">Publicado antes de</Label>
           <DatePicker
              locale={'es-Es'}
              todayButton={"Hoy"}
              dateFormat="DD/MM/YYYY"
              selected={this.state.max_publish_date}
              onChange={this.handleMaxDateChange.bind(this)}
              placeholderText="Selecciona fecha"
              isClearable={true}
              className="short-input"
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
       </Form>
    );
  }
}
function mapStateToProps(state){
  return {
    job_sub_categories: state.job_sub_categories,
    search:state.search
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSubJobCategories: getSubJobCategories,
    getAnnouncements:getAnnouncements,
    updateSearchParams:updateSearchParams
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedFilter);
