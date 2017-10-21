import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SubJobCategories from './SubJobCategories';
import ReactTable from 'react-table';
import {
  Link,
} from 'react-router-dom';
import { Container, Col, Jumbotron, Button, Row } from 'reactstrap';
import getAnnouncements from '../actions/get_announcements';
import './css/images.css';


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
      return <Container>Cargando</Container>
    }
    return (
      <Container>
        <Row>
          <Col sm="6" >
              <h1 className="display-3">{this.state.announcement.title}</h1>
              <img className="center-cropped announcement-thumbnail" src={this.state.announcement.announcement_thumbnail} alt="Imagen anuncio" />
              <p className="lead">{this.state.announcement.description}</p>
              <hr className="my-2" />
              <p className="lead">Por: 
                <Button color="link">
                  <Link to={'/profesionales/'+this.state.announcement.professional.id}>
                    {this.state.announcement.professional.user.first_name} {this.state.announcement.professional.user.last_name}
                  </Link>
                </Button>
              </p>
          </Col>
          <Col sm="6" >
            <p>Precio: ${this.state.announcement.price}</p>
            <p>Expira el: {new Date(this.state.announcement.expire_date).toLocaleDateString()}</p>
            <p>Lugar: {this.state.announcement.location}</p>
            <p>Movilidad: {this.state.announcement.movility}</p>
            <p>Días de atención: {this.state.announcement.availability_display}</p>

          </Col>
        </Row>
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
