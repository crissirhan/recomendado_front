import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getProfessional from '../actions/get_professional';
import getUserReviews from '../actions/get_user_reviews';
import getUserAnnouncements from '../actions/get_user_announcements';
import AnnouncementsList from './AnnouncementEdition/AnnouncementsList';
import ListAnnouncementsDummy from './ListAnnouncementsDummy';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import {
  Container,
  Collapse,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Jumbotron, CardImg, ListGroup, ListGroupItem
} from 'reactstrap';
import classnames from 'classnames';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Rating from 'react-rating';
import cookie from 'react-cookies';

class ProfessionalPage extends Component {

  componentDidMount() {
    this.props.getProfessional(this.props.professional_id);
    this.props.getUserReviews(this.props.professional_id);
    this.props.getUserAnnouncements(this.props.professional_id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      if(this.state.professional !== nextProps.professional){
        this.setState({
          professional:nextProps.professional
        })
      }
      if(this.state.reviews !== nextProps.user_reviews.reviews){
        this.setState({
          reviews: nextProps.user_reviews.reviews,
          average: nextProps.user_reviews.average,
          count: nextProps.user_reviews.count
        });
        if(this.state.count){
          this.setState({
            count:0
          })
        }
      }
      if(this.state.announcements !== nextProps.user_announcements){
        this.setState({
          announcements: nextProps.user_announcements
        })
      }
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      professional:null,
      announcements:[],
      reviews:[],
      average:0,
      count:0
    };
     this.handleInputChange = this.handleInputChange.bind(this);
     this.toggle = this.toggle.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  editMode(){
    this.setState({
      editMode: !this.state.editMode
    });
  }

  handleSave(){
    let user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name
    }
    let data = {
      user: user,
      rut: this.state.rut,
      region: this.state.region,
      city: this.state.city,
      street: this.state.street,
      house_number: this.state.house_number,
      phone_number: this.state.phone_number
    }
    this.props.updateProfessional(this.props.professional_id, data);
    this.editMode();
  }

  handleCancel(){
    this.props.getProfessional(this.props.professional_id);
    this.editMode();
  }
  timeSince(date){

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " años";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " meses";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " días";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " horas";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutos";
    }
    return Math.floor(seconds) + " segundos";
  }

  render() {
    console.log(this.state.reviews);
    if(!this.state.professional || !this.state.professional.user || !this.state.reviews){
      return <Container>Cargando</Container>;
    }
    return (
      <Container>
        <Row>
          <Col sm="3" style={{textAlign:"center"}}>
            <Card block className="text-center" >
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180" alt="foto perfil" />
              <CardTitle>{this.state.professional.user.first_name + ' ' +this.state.professional.user.last_name}</CardTitle>
              <Row>
                <Rating
                  empty="fa fa-star-o fa-2x orange-star"
                  full="fa fa-star fa-2x orange-star"
                  initialRate={this.state.average}
                  readonly
                />
                <CardText>
                  <b>{this.state.average}</b>
                </CardText>
                <CardText>
                  <small className="text-muted">({this.state.count} evaluaciones)</small>
                </CardText>
              </Row>
              <CardText>
                Región: {this.state.professional.region}
              </CardText>
              <CardText>
                Ciudad: {this.state.professional.city}
              </CardText>
            </Card>
            {(cookie.load('isProfessional') === "true" && cookie.load('user').id ===this.state.professional.id)? <Link to={'/crear/anuncio/'}><Button>Crear anuncio</Button></Link> : null}
          </Col>
          <Col sm="9">
              <Card block className="text-center">
                <CardTitle>Anuncios de {this.state.professional.user.first_name} {this.state.professional.user.last_name}</CardTitle>
              </Card>
              <ListAnnouncementsDummy announcements_array={this.state.announcements}/>
            <ListGroup>
              <ListGroupItem style={{display:"inherit"}}>
                  Reviews de {this.state.professional.user.first_name} {this.state.professional.user.last_name}
                  <Col sm="8"><Rating
                      empty="fa fa-star-o fa-2x orange-star"
                      full="fa fa-star fa-2x orange-star"
                      initialRate={this.state.average}
                      readonly/> <b>{this.state.average}</b></Col>
                  <Col ><small className="text-muted">({this.state.count} evaluaciones)</small></Col>
              </ListGroupItem>
              {this.state.reviews.map(review => {
                return <ListGroupItem key={review.id} style={{display:"block"}}>
                  <Row>
                    <Col><Rating
                        empty="fa fa-star-o fa-2x orange-star"
                        full="fa fa-star fa-2x orange-star"
                        initialRate={review.rating}
                        readonly/>        hace {this.timeSince(new Date(review.date))}</Col>
                  </Row>
                  <Row>
                    <Col sm="6">Review por <Link to={'/clientes/'+review.service.client.id}>{review.service.client.user.first_name} {review.service.client.user.last_name}</Link></Col>
                    <Col sm="6">{review.client_comment}</Col>
                  </Row>
                </ListGroupItem>;
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
function mapStateToProps(state){
  return {
    professional: state.professional,
    user_reviews: state.user_reviews,
    user_announcements: state.user_announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProfessional: getProfessional,
    getUserReviews: getUserReviews,
    getUserAnnouncements:getUserAnnouncements
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalPage);
