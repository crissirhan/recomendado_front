import React, { Component } from 'react';
import { Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText, Col, ListGroupItem, Row } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import './css/images.css';
import './css/box.css';
import Rating from 'react-rating';

class AnnouncementCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let image_url = this.props.announcement.announcement_thumbnail;
    if(!image_url){
      image_url = this.props.announcement.professional.profile_picture
    }
    let announcement = this.props.announcement
    return (<div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                  <a href="#"></a>
                  <Link to ={'/avisos/' + announcement.id}>
                    <img class="card-img-top" src={announcement.announcement_thumbnail} alt=""/>
                  </Link>
                  <div class="card-body">
                    <h4 class="card-title">
                      <Link to ={'/avisos/' + announcement.id}>
                        {announcement.title}
                      </Link>
                    </h4>
                    <h5>{announcement.price? '$'+announcement.price : 'Precio no definido'}</h5>
                    <p class="card-text">{announcement.description}</p>
                    <Link class="card-text row" to={'/profesionales/' + announcement.professional.id}>
                      {announcement.professional.user.first_name} {announcement.professional.user.last_name} {announcement.professional.profile_picture? <img className="center-cropped img-circle text-sized-image" src={announcement.professional.profile_picture}/> : null}
                    </Link>
                  </div>
                  <div class="card-footer">
                    <Rating
                        className="text-center" 
                        empty="fa fa-star-o fa-2x orange-star text-muted"
                        full="fa fa-star fa-2x orange-star text-muted"
                        initialRate={announcement.review_average ? Math.round(announcement.review_average * 10) / 10 : 0}
                        readonly/>
                  </div>
                </div>
              </div>
    );
  }
}


export default AnnouncementCard;
