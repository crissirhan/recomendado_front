import React, { Component } from 'react';
import { CardImg, CardGroup, Col, Card, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import CategoryPage from './CategoryPage';
import getAnnouncements from '../actions/get_announcements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Link,
  withRouter
} from 'react-router-dom';
import SearchAnnouncements from './SearchAnnouncements';

class ListAnnouncements extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <CardGroup>
      {this.props.announcements_array.map(announcement =>{
        let image_url = announcement.announcement_thumbnail ? announcement.announcement_thumbnail : "https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180";
        return <Col sm="4" key={announcement.id}>
                <Card>
                  <CardImg top width="100%" src={image_url} alt="Card image cap" />
                  <CardTitle><Link to ={'/anuncios/' + announcement.id}>{announcement.title}</Link></CardTitle>
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
