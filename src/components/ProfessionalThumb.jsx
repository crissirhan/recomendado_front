import React, { Component } from 'react';
import { connect } from 'react-redux';
import getUserReviews from '../actions/get_user_reviews';
import getProfessional from '../actions/get_professional';
import getClient from '../actions/get_client';
import { bindActionCreators } from 'redux';
import Rating from 'react-rating';
import './css/rating/rating.css';
import './css/font-awesome/css/font-awesome.min.css';
import { Card, CardBlock, Button, CardTitle, CardText, CardImg, Col } from 'reactstrap';
import ClientName from './ClientName';
import {
  Link,
} from 'react-router-dom';
import './css/images.css';
import './css/col.css';
import './css/box.css';

class ProfessionalThumb extends Component {

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps){
      if(nextProps.user_reviews.reviews && nextProps.user_reviews.reviews[0] && nextProps.user_reviews.reviews[0].service.announcement.professional.id === this.props.professional.id){
        this.setState({
          average:nextProps.user_reviews.average,
          count:nextProps.user_reviews.count
        });
      }
    }
  }

  componentDidMount() {
    this.props.getUserReviews(this.props.professional.id);
  }

  constructor(props) {
    super(props);
    this.state = {
      count:null,
      average:null
    };
  }

  render() {
    if(!this.state.count){
      return null;
    }
    let url = '/clientes/' + this.props.review.service.client.id + '/';
    let image_url = this.props.professional.profile_picture ? this.props.professional.profile_picture : "https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180";
    let comment = <div><div>"{this.props.review.client_comment}"</div><div style={{marginTop:5}}> <b>{this.props.review.service.client.user.first_name} {this.props.review.service.client.user.last_name}</b></div></div>
    return (
      <div class="col-sm-4" key={this.props.professional.id} >
        <div class="team-member">
          <img class="mx-auto rounded-circle" src={image_url} alt=""/>
          <h4>
            <Link to={'/profesionales/'+this.props.professional.id+'/'}>
              {this.props.review.service.announcement.professional.user ? this.props.review.service.announcement.professional.user.first_name + ' ' +this.props.review.service.announcement.professional.user.last_name : ''}
            </Link>
          </h4>
          <div class="row small text-center">
            <Rating
            empty="fa fa-star-o fa-2x orange-star small center"
            full="fa fa-star fa-2x orange-star small center"
            initialRate={this.state.average}
            readonly
            />
            <small className="text-muted">{this.state.count} evaluaciones</small>
          </div>
          <p class="text-muted">{comment}</p>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    user_reviews: state.user_reviews
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserReviews: getUserReviews,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalThumb);
