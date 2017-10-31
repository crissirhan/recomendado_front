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
  TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Jumbotron, CardImg, ListGroup, ListGroupItem,
  CardGroup, ModalBody, Modal, ModalHeader
} from 'reactstrap';
import classnames from 'classnames';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Rating from 'react-rating';
import cookie from 'react-cookies';
import './css/images.css';
import './css/col.css';
import './css/box.css';
import AnnouncementForm from './AnnouncementForm';

class ProfessionalPage extends Component {

  componentDidMount() {
    this.props.getProfessional(this.props.professional_id);
    this.props.getUserReviews(this.props.professional_id);
    this.props.getUserAnnouncements(this.props.professional_id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.professional_id !== this.props.professional_id){
      this.props.getProfessional(nextProps.professional_id);
      this.props.getUserReviews(nextProps.professional_id);
      this.props.getUserAnnouncements(nextProps.professional_id);
    }
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
      count:0,
      reviewCollapse:false
    };
     this.handleInputChange = this.handleInputChange.bind(this);
     this.toggle = this.toggle.bind(this);
     this.toggleReviewCollapse = this.toggleReviewCollapse.bind(this);
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

  toggleReviewCollapse(){
    this.setState({ collapse: !this.state.reviewCollapse });
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
  toggleAnnouccementModal(){
    this.setState({
      showAnnoucementModal:!this.state.showAnnoucementModal
    })
  }
  render() {
    if(!this.state.professional || !this.state.professional.user || !this.state.reviews){
      return <Container>Cargando</Container>;
    }

    let image_url = this.state.professional.profile_picture ? this.state.professional.profile_picture : "https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180";
    return (
      <Container>
        <Row>
          <Col sm="4">
            <Card block className="text-center" >
              <img className="img-circle center-cropped professional-profile" src={image_url} alt="foto perfil" />
              <Rating
                empty="fa fa-star-o fa-2x orange-star"
                full="fa fa-star fa-2x orange-star"
                initialRate={this.state.average}
                readonly
              />
              <CardText>
                <small className="text-muted">({this.state.count} evaluaciones)</small>
              </CardText>
            </Card>
            {(cookie.load('isProfessional') === "true" && cookie.load('user').id ===this.state.professional.id)? <Link to={'/editar/profesional/'+this.state.professional.id+'/'}><Button>Editar perfil</Button></Link> : null}
          </Col>
          <Col sm="8">
              <Card block className="text-left">
                <CardTitle>{this.state.professional.user.first_name} {this.state.professional.user.last_name}</CardTitle>
                <Row>
                  <Col sm="6">
                    <CardText className="text-left">
                      Región: {this.state.professional.region}
                    </CardText>
                  </Col>
                  <Col sm="6">
                    <CardText className="text-left">
                      Ciudad: {this.state.professional.city}
                    </CardText>
                  </Col>
                </Row>
                <CardText>

                </CardText>
                <CardText>

                </CardText>
                <CardText className="text-left">
                  Experiencia:
                </CardText>
                <CardText>
                  <i>"{this.state.professional.experience}"</i>
                </CardText>
              </Card>
            </Col>
        </Row>
        <Container>
          <p></p>
          <p></p>
        </Container>
        <Container>
          <Row>
            <p className="h4"><b>Anuncios</b></p>
            {(cookie.load('isProfessional') === "true" && cookie.load('user').id ===this.state.professional.id)? <Link to={'/crear/anuncio/'}><Button color="link">Crear anuncio</Button></Link> : null}
          </Row>
          <Jumbotron>
          {(cookie.load('isProfessional') === "true" && cookie.load('user').id ===this.state.professional.id) ?
            <ListAnnouncementsDummy image_class="center-cropped announcement-thumbnail" announcements_array={this.state.announcements}/> :
          <div>Debes estar logeado/a como {this.state.professional.user.first_name} {this.state.professional.user.last_name} para ver los anuncios</div>}
          </Jumbotron>
        </Container>
        <Container>
          <p className="h4"><b>Reviews</b></p>
          <Jumbotron>
            <CardGroup>
              <Row>
                {this.state.reviews.map(review => {
                  let image_url = review.service.client.profile_picture ? "http://35.196.31.174"+review.service.client.profile_picture : "https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180";
                  return (<Col  sm="4" key={review.id}>
                            <Card className="shadow-box round-border">
                              <CardTitle className="text-center">{review.service.announcement.job_subtype.job_sub_type}</CardTitle>
                              <Rating className="text-center"
                                  empty="fa fa-star-o fa-2x orange-star"
                                  full="fa fa-star fa-2x orange-star"
                                  initialRate={review.rating}
                                  readonly/>
                              <CardText className="text-center"><i>"{review.client_comment}"</i></CardText>
                              <CardText className="text-center">
                                <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                              </CardText>
                              <Link to={'/clientes/'+review.service.client.id}>
                                <img className="img-circle center-cropped review-client-profile" src={image_url}/>
                                <CardText className="text-center">{review.service.client.user.first_name} {review.service.client.user.last_name}</CardText>
                              </Link>
                            </Card>
                          </Col>)
                  })}
                </Row>
              </CardGroup>
            </Jumbotron>
        </Container>
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
