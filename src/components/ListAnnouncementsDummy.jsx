import React, { Component } from 'react';
import { CardImg, CardGroup, Col, Card, CardTitle, CardSubtitle, CardText, Row } from 'reactstrap';
import CategoryPage from './CategoryPage';
import getAnnouncements from '../actions/get_announcements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Link,
  withRouter
} from 'react-router-dom';
import SearchAnnouncements from './SearchAnnouncements';
import './css/images.css';
import './css/box.css';

class ListAnnouncements extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    if(this.props.announcements_array.length === 0){
      return <div>No existen avisos</div>;
    }
    console.log(this.props)
    return (
      <CardGroup>
        {this.props.announcements_array.map(announcement =>{
          let image_url = announcement.announcement_thumbnail ? announcement.announcement_thumbnail : "https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180";
          return <Col  height="360px" sm="4" key={announcement.id}>
                  <Card className="shadow-box round-border" size="sm" >
                    <Link to ={'/avisos/' + announcement.id}>
                      <img className={this.props.image_class} src={image_url}/>
                      <CardTitle>{announcement.title}</CardTitle>
                    </Link>
                    <CardSubtitle><Link to={'/profesionales/'+announcement.professional.id}>{announcement.professional.user.first_name} {announcement.professional.user.last_name}</Link></CardSubtitle>
                     <CardText>{announcement.description}</CardText>
                  </Card>
                </Col>
        })}
      </CardGroup>
    );
  }
}

function mapStateToProps(state){
  return {
    announcements: state.announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncements: getAnnouncements
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAnnouncements));
