import React, { Component } from 'react';
import { connect } from 'react-redux';
import getUserReviews from '../actions/get_user_reviews';
import getProfessional from '../actions/get_professional';
import getClient from '../actions/get_client';
import { bindActionCreators } from 'redux';
import Rating from 'react-rating';
import './css/font-awesome/css/font-awesome.min.css';
import './css/rating/rating.css';
import { Card, CardBlock, Button, CardTitle, CardText, CardImg, Col } from 'reactstrap';
import ClientName from './ClientName';

class ProfessionalThumb extends Component {

  componentDidMount() {
    this.props.getUserReviews(this.props.professional_id);
    this.props.getProfessional(this.props.professional_id);
  }

  constructor(props) {
    super(props);
    this.state = {
      client_id: null,
      review: null
    };
  }

  render() {
    let comment = null;
    if(this.props.user_reviews.reviews){
      if(!this.state.review){
        this.state.review = this.props.user_reviews.reviews[Math.floor(Math.random()*this.props.user_reviews.reviews.length)]
        this.state.client_id = this.state.review.client;
      }
      comment = <div>{'"'+this.state.review.comment}'"' - <ClientName client_id={this.state.client_id}/> </div>;
    } else{
      comment = <div></div>;
    }
    return (
      <Col sm="4">
        <Card>
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180" alt="foto perfil" />
          <CardTitle>{this.props.professional.first_name} {this.props.professional.last_name}</CardTitle>
          <Rating
            empty="fa fa-star-o fa-2x orange-star"
            full="fa fa-star fa-2x orange-star"
            initialRate={this.props.user_reviews.average}
            readonly
          />
          <CardText>
            <small className="text-muted">{this.props.user_reviews.count} evaluaciones</small>
          </CardText>
          <CardText>
            {comment}
          </CardText>
        </Card>
      </Col>
    );
  }
}
function mapStateToProps(state){
  return {
    user_reviews: state.user_reviews,
    professional: state.professional
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserReviews: getUserReviews,
    getProfessional: getProfessional
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalThumb);
