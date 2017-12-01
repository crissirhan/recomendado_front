import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getClient from '../actions/get_client';
import updateClient from '../actions/update_client';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import getServices from '../actions/get_services';
import getReviews from '../actions/get_reviews';
import {
  Container,
  Collapse,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Jumbotron, CardGroup,ListGroupItem, ListGroup,
  ModalBody, Modal, ModalHeader
} from 'reactstrap';
import classnames from 'classnames';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import ServiceList from './ServiceList';
import './css/images.css';
import './css/col.css';
import './css/box.css';
import cookie from 'react-cookies';
import Rating from 'react-rating';
import ListGroupService from './ListGroupService';
import ReviewCardGroup from './ReviewCardGroup'
import ServiceListGroup from './ServiceListGroup'
import ServiceAnnouncementListGroup from './ServiceAnnouncementListGroup'

class ClientPage extends Component {

  componentDidMount() {
    this.props.getClient(this.props.client_id);
    this.props.getServices({client_id:this.props.client_id, contacted:true,hired:false});
    this.props.getServices({client_id:this.props.client_id, contacted:true,hired:true});
    this.props.getReviews({client_id:this.props.client_id,page_size:3});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.client_id !== this.props.client_id){
      this.props.getClient(nextProps.client_id);
      this.props.getServices({client_id:this.props.client_id, contacted:true,hired:false});
      this.props.getServices({client_id:this.props.client_id, contacted:true,hired:true});
      this.props.getReviews({client_id:nextProps.client_id,page_size:3});
    }
    if(nextProps.client !== this.props.client) {
      //this.syncPropToState(nextProps);
      if(cookie.load('user')){
        if(cookie.load('user').id === nextProps.client.id){
          this.setState({
            owner: true
          })
        }
      }
      this.setState({
        client:nextProps.client
      });
    }
    if(nextProps.client_services !==this.props.client_services){
      this.setState({
        client_services:nextProps.client_services
      })
    }
    if(nextProps.reviews !== this.props.reviews){
      this.setState({
        client_reviews:nextProps.reviews.result
      })
    }
    if(nextProps.services !== this.props.services){
      if(nextProps.services.result.length > 0){
        if(nextProps.services.result[0].contacted && !nextProps.services.result[0].hired){
          this.setState({
            contacted_services:nextProps.services.result,
            contacted_pagination:nextProps.services.pagination
          })
        }
        if(nextProps.services.result[0].contacted && nextProps.services.result[0].hired){
          this.setState({
            hired_services:nextProps.services.result,
            hired_pagination:nextProps.services.pagination
          })
        }
      }
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      client:null,
      user:{},
      activeTab: '1',
      client_services:null,
      client_reviews:null,
      owner:false,
      showReviewModal: false,
      fakeUpdate:false,
      contacted_services:[],
      contacted_pagination:{},
      hired_services:[],
      hired_pagination:{}
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
      user:user
    }
    this.props.updateClient(this.props.client_id, data);
    this.editMode();
  }

  handleCancel(){
    this.props.getClient(this.props.client_id);
    this.editMode();
  }

  handleContactedServicePageChange(pageNumber){
    let new_query = Object.assign({}, {client_id:this.props.client_id, contacted:true,hired:false}, {page:pageNumber})
    this.props.getServices(new_query)
  }
  handleHiredServicePageChange(pageNumber){
    let new_query = Object.assign({}, {client_id:this.props.client_id, contacted:true,hired:true}, {page:pageNumber})
    this.props.getServices(new_query)
  }

  handleReviewPageChange(pageNumber){
    let new_query = Object.assign({}, this.props.reviews.params, {page:pageNumber})
    this.props.getReviews(new_query)
  }

  render() {
    if(!this.state.client || !this.state.client_reviews){
      return <Container>Cargando</Container>;
    }
    console.log(this.props)
    let image_url = this.state.client.profile_picture ? this.state.client.profile_picture : "https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180";
    return (
      <Container>
        <Row>
          <Col sm="4">
            <Card block className="text-center" >
              <img className="img-circle center-cropped professional-profile" src={image_url} alt="foto perfil" />
            </Card>
            {(cookie.load('isClient') === "true" && cookie.load('user').id ===this.state.client.id)? <Link to={'/editar/cliente/'+this.state.client.id+'/'}><Button>Editar perfil</Button></Link> : null}
          </Col>
          <Col sm="8">
              <Card block className="text-left">
                <CardTitle>{this.state.client.user.first_name} {this.state.client.user.last_name}</CardTitle>
                <Row hidden={true}>
                  <Col sm="6">
                    <CardText className="text-left">
                      Región: {this.state.client.region}
                    </CardText>
                  </Col>
                  <Col sm="6">
                    <CardText className="text-left">
                      Ciudad: {this.state.client.city}
                    </CardText>
                  </Col>
                </Row>
                <CardText>
                  Servicios contratados: {this.props.services.result ? this.props.services.result.length : null}
                </CardText>
              </Card>
            </Col>
        </Row>
        <Container>
          <p></p>
          <p></p>
        </Container>
        <Container>
          <p className="h4"><b>Servicios contactados</b></p>
          <Jumbotron>
            <ListGroup>
              {this.state.owner ? <ServiceListGroup
                services={this.state.contacted_services}
                pagination={this.state.contacted_pagination}
                handlePageChange={this.handleContactedServicePageChange.bind(this)}
                />
              : <div>Tienes que estar logeado como {this.state.client.user.first_name} {this.state.client.user.last_name} para ver los servicios contratados</div>}
            </ListGroup>
          </Jumbotron>
        </Container>
        <Container>
          <p className="h4"><b>Servicios contratados</b></p>
          <Jumbotron>
            <ListGroup>
              {this.state.owner ? <ServiceAnnouncementListGroup
                services={this.state.hired_services}
                pagination={this.state.hired_pagination}
                handlePageChange={this.handleHiredServicePageChange.bind(this)}
                />
              : <div>Tienes que estar logeado como {this.state.client.user.first_name} {this.state.client.user.last_name} para ver los servicios contratados</div>}
            </ListGroup>
          </Jumbotron>
        </Container>
        <Container>
          <p className="h4"><b>Reviews</b></p>
          <Jumbotron>
            <ReviewCardGroup
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
    client: state.client,
    update_client: state.update_client,
    reviews:state.reviews,
    services:state.services
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getClient: getClient,
    updateClient: updateClient,
    getReviews:getReviews,
    getServices:getServices
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
