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
import {
  Link,
} from 'react-router-dom';

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
    if(this.props.user_reviews.count === 0){
      return <div/>;
    }
    if(this.props.user_reviews.length === 0){
      return null;
    }
    if(!this.props.user_reviews.reviews || this.props.user_reviews.reviews.length === 0){
      return null;
    }
    let comment = null;
    if(this.props.user_reviews.reviews){
      if(!this.state.review){
        if(this.props.user_reviews.reviews){
          this.setState({
            review : this.props.user_reviews.reviews[Math.floor(Math.random()*this.props.user_reviews.reviews.length)]
          });
          if(this.state.review){
            if(this.state.review.service.client){
              this.setState({
                client_id : this.state.review.service.client.id
              });
            }
          }
        }
      }

      if(this.state.review){
        let url = '/clientes/' + this.state.review.service.client.id + '/';
        console.log("ASD");
        console.log(this.state.review);
        console.log(this.state.review.service.client.id);
        console.log("ASD");
        comment = <div>"{this.state.review.client_comment}" - <Link to={url}><ClientName client_id={this.state.review.service.client.id}/> </Link></div>;
      }
    } else{
      comment = <div></div>;
    }
    if(!this.state.review){
      return null;
    }
    if(!this.state.review.service){
      return null;
    }
    if(!this.state.review.service.announcement){
      return null;
    }
    if(this.props.professional_id != this.state.review.service.announcement.professional.id){
      return null;
    }
    return (
      <Col sm="4">
        <Card block className="text-center">
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180" alt="foto perfil" />
          <Link to={'/profesionales/'+this.props.professional_id+'/'}>
            <CardTitle>{this.props.professional.user ? this.props.professional.user.first_name + ' ' +this.props.professional.user.last_name : ''}</CardTitle>
          </Link>
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
