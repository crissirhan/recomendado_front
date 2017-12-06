import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfessionalThumb from './ProfessionalThumb';
import {
  CardGroup, Row
} from 'reactstrap';
import getReviews from '../actions/get_reviews';
import './css/col.css';
import './css/box.css';

class ProfessionalThumbs extends Component {

  componentDidMount() {
    this.props.getReviews({ordering:'-date', min_rating:4, page_size:3});
  }

  componentWillReceiveProps(nextProps) {

    if(this.props != nextProps && nextProps.reviews.result){
      console.log(nextProps.reviews.result)
      /*
      let random_professional_ids_with_reviews = [...new Set(nextProps.reviews.result.map(review => review.service.announcement.professional.id))].sort(() => .5 - Math.random()).slice(0,3);

      let random_reviews = nextProps.reviews.result.filter(function( review ) {
        let index = random_professional_ids_with_reviews.indexOf(review.service.announcement.professional.id);
        if(index !== -1){
          random_professional_ids_with_reviews.splice(index, 1);
        }
        return index !== -1;
      }).sort(() => .5 - Math.random()).slice(0,3);
      */
      this.setState({
        random_reviews:nextProps.reviews.result
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      random_reviews:null
    };
  }

  render() {
    if(!this.state.random_reviews){
      return null;
    }
    return (
      <CardGroup >
        <Row>
          {this.state.random_reviews.map(review =>
            <ProfessionalThumb review={review} professional={review.service.announcement.professional} professional_id={review.service.announcement.professional.id} key={review.id.toString()}/>
          )}
        </Row>
      </CardGroup>
    );
  }
}

function mapStateToProps(state){
  return {
    reviews:state.reviews
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getReviews:getReviews
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalThumbs);
