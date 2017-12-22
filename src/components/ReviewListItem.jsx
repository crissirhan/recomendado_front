import React, { Component } from 'react';
import { Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText,Collapse, Button } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import './css/images.css';
import './css/box.css';
import { ENDPOINT_URI } from '../Globals';
import Rating from 'react-rating';
import updateReview from '../actions/update_review';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ReviewListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse:false,
      value:'',
      shouldRespond: !this.props.review.professional_response,
      hasResponded: false,
      professional_response: this.props.review.professional_response
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  handleChange(event) {
   this.setState({value: event.target.value});
 }

 handleSubmitResponse(){
   this.setState({shouldRespond:false, hasResponded:true, professional_response:this.state.value},
   () => this.props.updateReview(this.props.review.id, {professional_response:this.state.value}))

 }

 handleCancel(){
   this.setState({value:'', collapse:false})
 }

  render() {
    let review = this.props.review
    let image_url = review.service.client.profile_picture ? review.service.client.profile_picture : null;
    return (
      <div>
        <div style={{border:'none'}} class="card">
          <Rating
              syle={{fontSize:"10px"}}
              empty="fa fa-star-o fa-2x orange-star small"
              full="fa fa-star fa-2x orange-star small"
              initialRate={review.rating}
              readonly/>
          <p>{review.client_comment}</p>
          <small class="text-muted">Evaluado por {review.service.client.user.first_name} {review.service.client.user.last_name} {image_url ? <img class="text-sized-image" src={image_url}/> : null} el {new Date(review.date).toLocaleDateString()}</small>
        </div>
        {!this.state.shouldRespond && <div class="card bg-light text-right">
          <p>{this.state.professional_response}</p>
          <small class="text-muted">Respuesta del profesional {review.service.announcement.professional.user.first_name} {review.service.announcement.professional.user.last_name} {review.service.announcement.professional.profile_picture && <img class="text-sized-image" src={review.service.announcement.professional.profile_picture}/>}</small>
        </div>}
        {this.props.owner && this.state.shouldRespond &&
          <div class="float-right">
            <button class="btn" type="button" hidden={this.state.collapse} onClick={this.toggle.bind(this)}>Añadir respuesta</button>
            <Collapse isOpen={this.state.collapse}>
              <div >
                <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
                <div class="row">
                  <button class="btn" type="button" onClick={this.handleSubmitResponse.bind(this)} disable={this.props.update_review.loading}>Comentar</button>
                  <button class="btn" type="button" onClick={this.handleCancel.bind(this)}>Cancelar</button>
                </div>
              </div>
            </Collapse>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    update_review: state.update_review,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateReview: updateReview,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewListItem);
