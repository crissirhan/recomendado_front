import React, { Component } from 'react';
import { Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import './css/images.css';
import './css/box.css';

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
    return (
              <Card className="shadow-box round-border" style={{marginBottom:20}} size="sm" >
                <Link to ={'/anuncios/' + announcement.id}>
                  <img className="center-cropped search-thumbnail" src={image_url}/>
                  <CardTitle>{announcement.title}</CardTitle>
                </Link>
                <CardSubtitle><Link to={'/profesionales/'+announcement.professional.id}>{announcement.professional.user.first_name} {announcement.professional.user.last_name}</Link></CardSubtitle>
                 <CardText>{announcement.description}</CardText>
              </Card>
    );
  }
}


export default AnnouncementCard;
