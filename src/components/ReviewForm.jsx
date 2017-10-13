import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import postReview from '../actions/post_review';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';
import { withRouter } from 'react-router';
import Rating from 'react-rating';
import './css/font-awesome/css/font-awesome.min.css';
import './css/rating/rating.css';


class ReviewForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rating:1,
      client_comment:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStarChange = this.handleStarChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleStarChange(value){
    this.setState({
      rating:value
    });
  }

  handleSubmit(){
    let date = new Date().toJSON(); //time now
    let data = {
      service_id:this.props.service_id,
      rating:this.state.rating,
      client_comment:this.state.client_comment,
      date:date
    }
    this.props.postReview(data);
  }
  render(){
    return (
      <Form>
        <FormGroup >
          <Rating
            empty="fa fa-star-o fa-2x orange-star"
            full="fa fa-star fa-2x orange-star"
            initialRate={this.state.rating}
            onClick={this.handleStarChange}
          />
        </FormGroup>
        <FormGroup >
          <Label for="client_comment">Comentario</Label>
          <Input  name="client_comment" id="client_comment" 
          value={this.state.client_comment} onChange={this.handleInputChange}/>
        </FormGroup>
        <Button onClick={() => {this.handleSubmit()} }>Enviar</Button>
      </Form>
    )
  }
}

function mapStateToProps(state){
  return {
    post_review: state.post_review
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postReview: postReview
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewForm));
