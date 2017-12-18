import React, { Component } from 'react';
import { Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import './css/images.css';
import './css/box.css';
import { ENDPOINT_URI } from '../Globals';
import Rating from 'react-rating';

class ReviewListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let review = this.props.review
    let image_url = review.service.client.profile_picture ? review.service.client.profile_picture : "https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180";
    return (
      <div>
        <Rating
            syle={{fontSize:"10px"}}
            empty="fa fa-star-o fa-2x orange-star small"
            full="fa fa-star fa-2x orange-star small"
            initialRate={review.rating}
            readonly/>
        <p>{review.client_comment}</p>
        <small class="text-muted">Evaluado por {review.service.client.user.first_name} {review.service.client.user.last_name} el {new Date(review.date).toLocaleDateString()}</small>
      </div>
    )
  }
}


export default ReviewListItem;
