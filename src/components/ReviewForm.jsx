import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import postReview from '../actions/post_review';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';
import { withRouter } from 'react-router';


class ReviewForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rating:'',
      client_comment:''
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

  handleSubmit(){
    let date = "2017-10-13T05:13:08Z"; //time now
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
          <Label for="rating">rating</Label>
          <Input  name="rating" id="rating" placeholder="Ingrese su rating"
          value={this.state.rating} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup >
          <Label for="client_comment">client_comment</Label>
          <Input  name="client_comment" id="client_comment" placeholder="Ingrese su client_comment"
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
