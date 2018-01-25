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
    let image_url = this.props.professional.profile_picture
    let comment = <div><div>"{this.props.review.client_comment}"</div><div style={{marginTop:5}}> <b>{this.props.review.service.client.user.first_name} {this.props.review.service.client.user.last_name}</b></div></div>
    return (
      <div class="col-lg-4" key={this.props.professional.id}>
        <div class="post">
          <div class="image"><img  src={image_url} alt="..."/></div>
          <div class="info d-flex align-items-end">
            <div class="content">
              <div class="post-meta">{new Date(this.props.review.date).toLocaleDateString()}</div>
                <Link to={'/profesionales/'+this.props.professional.id+'/'}>
                  <h3>{this.props.review.service.announcement.professional.user ? this.props.review.service.announcement.professional.user.first_name + ' ' +this.props.review.service.announcement.professional.user.last_name : ''}</h3>
                  <Rating
                    empty="fa fa-star-o fa-2x orange-star small text-center"
                    full="fa fa-star fa-2x orange-star small text-center"
                    initialRate={this.state.average}
                    readonly
                  />
                  <small className="text-muted">{this.state.count} evaluaciones</small>
                </Link>
              <p>{comment}</p>
            </div>
          </div><a href="#">
            <div class="badge badge-rounded text-uppercase">Tips</div></a>
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
