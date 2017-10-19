import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SubJobCategories from './SubJobCategories';
import ReactTable from 'react-table';
import {
  Link,
} from 'react-router-dom';
import { Container, Col, Jumbotron, Button } from 'reactstrap';
import getAnnouncements from '../actions/get_announcements';


class AnnouncementPage extends Component {

  componentDidMount(){
    this.props.getAnnouncements(this.props.announcement_id,null);
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.setState({
        announcement:nextProps.announcements
      })
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      announcement:null
    };
  }

  render(){
    if(!this.state.announcement){
      return <Container></Container>
    }
    return (
      <Container>
        <Col sm="6" >
          <Jumbotron>
            <h1 className="display-3">{this.state.announcement.title}</h1>
            <p className="lead">{this.state.announcement.description}</p>
            <hr className="my-2" />
            <p>${this.state.announcement.price}</p>
            <p>WIP</p>
            <p className="lead">
              <Button color="link">
                <Link to={'/profesionales/'+this.state.announcement.professional.id}>
                  {this.state.announcement.professional.user.first_name} {this.state.announcement.professional.user.last_name}
                </Link>
              </Button>
            </p>
          </Jumbotron>
        </Col>
      </Container>
     )
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

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementPage);
