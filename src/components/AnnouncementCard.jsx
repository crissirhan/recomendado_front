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
    console.log(announcement)
    return (
              <Card className="shadow-box round-border" style={{marginBottom:20,minHeight:300,height:300,width:230, overflow:"hidden" }} size="sm" >
                <Link to ={'/anuncios/' + announcement.id}>
                  <CardImg top style={{height:142,width:230}} src={announcement.announcement_thumbnail} />
                </Link>

                <Row>
                  <Col sm="1">
                    <img className="center-cropped img-circle" style={{height:24,width:24}} src={announcement.professional.profile_picture} />
                  </Col>
                  <Col>
                    <Link to={'/profesionales/' + announcement.professional.id}>
                      <p style={{fontSize:16}}>{announcement.professional.user.first_name} {announcement.professional.user.last_name}</p>
                    </Link>
                  </Col>
                </Row>
                <Link to ={'/anuncios/' + announcement.id}>
                  <CardTitle>{announcement.title}</CardTitle>
                </Link>
                <Row style={{height:26, position:"absolute", bottom:10, fontSize:"10px"}}>
                  <Col sm="1">
                    <Rating className="text-center" syle={{fontSize:"10px"}}
                        empty="fa fa-star-o fa-2x orange-star"
                        full="fa fa-star fa-2x orange-star"
                        initialRate={1}
                        stop={1}
                        readonly/>
                  </Col>
                  <Col>
                    <CardText style={{}}>
                      <Row>
                        <Col sm="1">
                          <p style={{color:"#ffbf00", fontSize:"14px", marginLeft:-5 }}>{announcement.review_average ? Math.round(announcement.review_average * 10) / 10 : 0}</p>
                        </Col>
                        <Col>
                          <p style={{color: "#b2b2b2", fontSize:"14px", marginLeft:-10}}>({announcement.review_count} evaluaciones)</p>
                        </Col>
                      </Row>
                    </CardText>
                  </Col>
                </Row>
              </Card>
    );
  }
}


export default AnnouncementCard;
