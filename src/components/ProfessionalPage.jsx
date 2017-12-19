import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getProfessional from '../actions/get_professional';
import getReviews from '../actions/get_reviews';
import getAnnouncements from '../actions/get_announcements';
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
import { ENDPOINT_URI } from '../Globals';
import AnnouncementListGroup from './AnnouncementListGroup'
import ReviewList from './ReviewList'
import './css/loading.css'

class ProfessionalPage extends Component {

  componentDidMount() {
    this.props.getProfessional(this.props.professional_id);
    this.props.getReviews({professional_id:this.props.professional_id,page_size:9, ordering:'-date'});
    //this.props.getUserAnnouncements(this.props.professional_id);
    if(this.state.owner){
      this.props.getAnnouncements({professional_id:this.props.professional_id});
    } else {
      this.props.getAnnouncements({professional_id:this.props.professional_id, visible:true});
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.professional_id !== this.props.professional_id){
      this.props.getProfessional(nextProps.professional_id);
      this.props.getReviews({professional_id:nextProps.professional_id,page_size:9,ordering:'-date'});
      this.setState({owner:(cookie.load('isProfessional') === "true" && cookie.load('user').id == nextProps.professional_id)},
      () => {
        if(this.state.owner){
          this.props.getAnnouncements({professional_id:this.props.professional_id});
        } else {
          this.props.getAnnouncements({professional_id:this.props.professional_id, visible:true});
        }
      }
    )


    }
    if(this.props != nextProps) {
      if(this.props.professional !== nextProps.professional){
        this.setState({
          professional:nextProps.professional
        })
      }
      if(this.props.reviews.result !== nextProps.reviews.result){
        this.setState({
          reviews: nextProps.reviews.result,
          average: nextProps.reviews.result.average,
          count: nextProps.reviews.result.count,
        });
      }
      if(this.props.user_announcements !== nextProps.user_announcements){
        if(nextProps.user_announcements.result){
          this.setState({
            announcements: nextProps.user_announcements.result
          })
        }
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
      reviewCollapse:false,
      owner: (cookie.load('isProfessional') === "true" && cookie.load('user').id == this.props.professional_id)
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
  handlePageChange(pageNumber){
    let new_query = Object.assign({}, this.props.announcements.params, {page:pageNumber})
    this.props.getAnnouncements(new_query)
  }
  handleReviewPageChange(pageNumber){
    let new_query = Object.assign({}, this.props.reviews.params, {page:pageNumber})
    this.props.getReviews(new_query)
  }
  render() {
    if(!this.state.professional || !this.state.professional.user || !this.state.reviews){
      return <Container><div class="loader"></div></Container>
    }
    let image_url = this.state.professional.profile_picture ? this.state.professional.profile_picture : "https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180";
    return (
      <Container className="container">
        <Row>
          <Col sm="4">
            <Card block className="text-center" >
              <img className="img-circle center-cropped professional-profile" src={image_url} alt="foto perfil" />
              <Rating
                empty="fa fa-star-o fa-2x orange-star"
                full="fa fa-star fa-2x orange-star"
                initialRate={this.state.professional.average}
                readonly
              />
              <CardText>
                <small className="text-muted">({this.state.professional.count} evaluaciones)</small>
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
                {this.state.professional.experience? <CardText>
                  <i>"{this.state.professional.experience}"</i>
                </CardText> : null}
              </Card>
            </Col>
        </Row>
        <Container>
          <p></p>
          <p></p>
        </Container>
        <Container>
          <Row style={{marginTop:100}}>
            <p className="h4"><b>Avisos  </b></p>
            {(cookie.load('isProfessional') === "true" && cookie.load('user').id ===this.state.professional.id)? <Link to={'/crear/anuncio/'}><Button color="link"><p className="h4" style={{position:'absolute',top:0}}><b>Crear Aviso</b></p></Button></Link> : null}
          </Row>
          <Jumbotron>
            <AnnouncementListGroup
            extend_button={(cookie.load('isProfessional') === "true" && cookie.load('user').id ===this.state.professional.id)}
            visible_button={(cookie.load('isProfessional') === "true" && cookie.load('user').id ===this.state.professional.id)}
            pagination={this.props.announcements.pagination}
            announcements={this.props.announcements.result}
            handlePageChange={this.handlePageChange.bind(this)}
            />
          </Jumbotron>
        </Container>
        <Container>
          <p className="h4"><b>Reviews</b></p>
          <Jumbotron>
            <ReviewList
            reviews={this.props.reviews.result}
            pagination={this.props.reviews.pagination}
            handlePageChange={this.handleReviewPageChange.bind(this)}
            />
          </Jumbotron>
        </Container>
      </Container>
    );
  }
}
function mapStateToProps(state){
  return {
    professional: state.professional,
    reviews: state.reviews,
    announcements: state.announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProfessional: getProfessional,
    getReviews: getReviews,
    getAnnouncements:getAnnouncements
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalPage);
