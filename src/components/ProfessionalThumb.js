import React, { Component } from 'react';
import { connect } from 'react-redux';
import getUserReviews from '../actions/get_user_reviews';
import getProfessional from '../actions/get_professional';
import { bindActionCreators } from 'redux';

class ProfessionalThumb extends Component {

  componentDidMount() {
    this.props.getUserReviews(this.props.professional_id);
    this.props.getProfessional(this.props.professional_id);
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props.user_reviews);
    console.log(this.props.professional);
    return (
      <div>
        promedio = {this.props.user_reviews.average} , cantidad = {this.props.user_reviews.count}
      </div>
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
