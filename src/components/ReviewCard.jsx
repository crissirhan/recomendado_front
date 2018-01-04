import React, { Component } from 'react';
import { Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import './css/images.css';
import './css/box.css';
import { ENDPOINT_URI } from '../Globals';
import Rating from 'react-rating';

class AnnouncementCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let review = this.props.review
    let image_url = review.service.client.profile_picture ? review.service.client.profile_picture.full_size : "https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180";
    return (<Card style={{minHeight:320}} className="shadow-box round-border min-width">
                <CardText className="text-center"><i>"{review.client_comment}"</i></CardText>
                <Rating className="text-center"
                    empty="fa fa-star-o fa-2x orange-star"
                    full="fa fa-star fa-2x orange-star"
                    initialRate={review.rating}
                    readonly/>
                <CardText className="text-center">
                  <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                </CardText>
                <CardText className="text-center">
                  {review.service.announcement.job_tags.map((tag,index) => {
                    return <Link to={'/categorias/'+tag.job.job_category.job_type+'/'+tag.job.job_sub_type}>{tag.job.job_sub_type}{index + 1 < review.service.announcement.job_tags.length? ' | ': null }</Link>
                  })}
                </CardText>
                <img className="img-circle center-cropped review-client-profile" src={image_url}/>
                <CardText className="text-center">{review.service.client.user.first_name} {review.service.client.user.last_name}</CardText>
              </Card>)
  }
}


export default AnnouncementCard;
