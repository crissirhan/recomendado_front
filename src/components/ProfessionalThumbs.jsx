import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfessionalThumb from './ProfessionalThumb';
import {
  CardGroup,
} from 'reactstrap';
import getReviews from '../actions/get_reviews';

class ProfessionalThumbs extends Component {

  componentDidMount() {
    this.props.getReviews();
  }

  componentWillReceiveProps(nextProps) {

    if(this.props != nextProps){
      let random_professional_ids_with_reviews = [...new Set(nextProps.get_reviews.map(review => review.service.announcement.professional.id))].sort(() => .5 - Math.random()).slice(0,3);

      console.log(random_professional_ids_with_reviews);
      let random_reviews = nextProps.get_reviews.filter(function( review ) {
        let index = random_professional_ids_with_reviews.indexOf(review.service.announcement.professional.id);
        if(index !== -1){
          random_professional_ids_with_reviews.splice(index, 1);
        }
        return index !== -1;
      }).sort(() => .5 - Math.random()).slice(0,3);
      console.log(random_reviews);
      this.setState({
        random_reviews:random_reviews
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
      <CardGroup>
        {this.state.random_reviews.map(review =>
          <ProfessionalThumb review={review} professional={review.service.announcement.professional} professional_id={review.service.announcement.professional.id} key={review.id.toString()}/>
        )}
      </CardGroup>
    );
  }
}
function mapStateToProps(state){
  return {
    get_reviews:state.get_reviews
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getReviews:getReviews
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalThumbs);
