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

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps){
      console.log(nextProps);
      this.setState({
        average:nextProps.user_reviews.average,
        count:nextProps.user_reviews.count
      })
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
    console.log(this.props)
    if(!this.state.count){
      return null;
    }
    let url = '/clientes/' + this.props.review.service.client.id + '/';
    let comment = <div>"{this.props.review.client_comment}" - <Link to={url}>{this.props.review.service.client.user.first_name} {this.props.review.service.client.user.last_name}</Link></div>
    return (
      <Col sm="4">
        <Card block className="text-center">
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180" alt="foto perfil" />
          <Link to={'/profesionales/'+this.props.professional.id+'/'}>
            <CardTitle>{this.props.review.service.announcement.professional.user ? this.props.review.service.announcement.professional.user.first_name + ' ' +this.props.review.service.announcement.professional.user.last_name : ''}</CardTitle>
          </Link>
          <Rating
            empty="fa fa-star-o fa-2x orange-star"
            full="fa fa-star fa-2x orange-star"
            initialRate={this.state.average}
            readonly
          />
          <CardText>
            <small className="text-muted">{this.state.count} evaluaciones</small>
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
    user_reviews: state.user_reviews
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserReviews: getUserReviews,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalThumb);
