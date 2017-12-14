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
import './css/select.css';
import cookie from 'react-cookies';
import Rating from 'react-rating';
import ListGroupService from './ListGroupService';
import ReviewCardGroup from './ReviewCardGroup'
import ServiceListGroup from './ServiceListGroup'
import ServiceAnnouncementListGroup from './ServiceAnnouncementListGroup'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class ClientPage extends Component {

  componentDidMount() {
    this.props.getClient(this.props.client_id);
    this.updateServices()
    this.props.getReviews({client_id:this.props.client_id,page_size:3});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.post_review !== this.props.post_review){
      if(nextProps.post_review.success){
        this.updateServices()
      }
    }
    if(nextProps.update_service != this.props.update_service){
      if(nextProps.update_service.success){
        this.updateServices()
      }
    }
    if(nextProps.put_service != this.props.put_service){
      if(nextProps.put_service.success){
        this.updateServices()
      }
    }
    if(nextProps.client_id !== this.props.client_id){
      this.props.getClient(nextProps.client_id);
      this.updateServices()
      this.props.getReviews({client_id:nextProps.client_id,page_size:3});
    }
    if(nextProps.client !== this.props.client) {
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
    if(nextProps.services !== this.props.services && nextProps.services.success){
      console.log(nextProps.services)
        if(nextProps.services.params.contacted){

          this.setState({
            contacted_services:nextProps.services.result,
            contacted_pagination:nextProps.services.pagination
          })
        }
        if(nextProps.services.params.hired === true){
          this.setState({
            hired_services:nextProps.services.result,
            hired_pagination:nextProps.services.pagination
          })
        }
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      client:null,
      user:{},
      client_services:null,
      client_reviews:null,
      owner:false,
      showReviewModal: false,
      fakeUpdate:false,
      contacted_services:[],
      contacted_pagination:{},
      hired_services:[],
      hired_pagination:{},
      contactedAllParams : {client_id:this.props.client_id, contacted:true},
      pendingParams : {client_id:this.props.client_id, contacted:true,hired:false, professional_rejected:false},
      acceptedParams : {client_id:this.props.client_id, contacted:true,hired:true, professional_rejected:false},
      rejectedParams : {client_id:this.props.client_id, contacted:true,hired:false, professional_rejected:true},
      hiredAllParams: {client_id:this.props.client_id, hired:true},
      hiredParamsReviewed : {client_id:this.props.client_id, hired:true, reviewed:true},
      hiredParamsPendingReview : {client_id:this.props.client_id, hired:true, reviewed:false},
      contactedQuery: {client_id:this.props.client_id, contacted:true},
      hiredQuery:{client_id:this.props.client_id, hired:true},
      contactedSelectValue:null,
      hiredSelectValue:null
    };
   this.handleInputChange = this.handleInputChange.bind(this);
   this.toggle = this.toggle.bind(this);
   this.updateServices = this.updateServices.bind(this)
   this.toggleTab = this.toggleTab.bind(this)
  }

  updateServices(){
    this.props.getServices(this.state.contactedQuery);
    this.props.getServices(this.state.hiredQuery);
  }
  handleSwitchQuery(new_query){
    this.setState(new_query,() => this.updateServices())
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

  handlePendingServicePageChange(pageNumber){
    let new_query = Object.assign({}, {client_id:this.props.client_id, contacted:true,hired:false}, {page:pageNumber})
    this.props.getServices(new_query)
  }
  handleAcceptedServicePageChange(pageNumber){
    let new_query = Object.assign({}, {client_id:this.props.client_id, contacted:true,hired:false}, {page:pageNumber})
    this.props.getServices(new_query)
  }
  handleRejectedServicePageChange(pageNumber){
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

  handleContactedServicePageChange(pageNumber){
    let new_query = Object.assign({}, this.state.contactedQuery, {page:pageNumber})
    this.props.getReviews(new_query)
  }

  handleHiredServicePageChange(pageNumber){
    let new_query = Object.assign({}, this.state.hiredQuery, {page:pageNumber})
    this.props.getReviews(new_query)
  }

   toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleHiredTab(tab) {
    if (this.state.hiredActiveTab !== tab) {
      this.setState({
        hiredActiveTab: tab
      });
    }
  }

  handleChangeContactedOrder(new_order){
    console.log(Object.assign({}, this.state.contactedQuery, {ordering:new_order.value}))
    this.setState({
      contactedQuery: Object.assign({}, this.state.contactedQuery, {ordering:new_order.value}),
      contactedSelectValue:new_order
    },() => this.updateServices())
  }

  handleChangeHiredOrder(new_order){
    this.setState({
      hiredQuery: Object.assign({}, this.state.hiredQuery, {ordering:new_order.value}),
      hiredSelectValue:new_order
    },() => this.updateServices())
  }

  render() {
    if(!this.state.client || !this.state.client_reviews){
      return <Container>Cargando</Container>
    }
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
          <Row style={{marginTop:100}}>
            <p className="h4"><b>Servicios Contactados</b></p>
            <Button onClick={() => this.handleSwitchQuery({contactedQuery:this.state.contactedAllParams})} color="link"><p className="h8" style={{top:0}}>Todos</p></Button>
            <p  style={{top:0}}> | </p>
            <Button onClick={() => this.handleSwitchQuery({contactedQuery:this.state.pendingParams})} color="link"><p className="h8" style={{top:0}}>Pendientes</p></Button>
            <p  style={{top:0}}> | </p>
            <Button onClick={() => this.handleSwitchQuery({contactedQuery:this.state.acceptedParams})} color="link"><p className="h8" style={{top:0}}>Aceptados</p></Button>
            <p  style={{top:0}}> | </p>
            <Button onClick={() => this.handleSwitchQuery({contactedQuery:this.state.rejectedParams})} color="link"><p className="h8" style={{top:0}}>Rechazados</p></Button>
          </Row>
          <Jumbotron>
            <Select
               name="contacted-order-by"
               multi={false}
               options={[{ value: 'creation_date', label: 'Fecha contactado ascendiente' },{ value: '-creation_date', label: 'Fecha contactado descendiente' }]}
               onChange={this.handleChangeContactedOrder.bind(this)}
               searchable={false}
               autosize={true}
               clearable={false}
               closeOnSelect={true}
               placeholder={'Ordenar por...'}

             />
            <ListGroup>
              {this.state.owner ? <ServiceListGroup
                services={this.state.contacted_services}
                pagination={this.state.contacted_pagination}
                value={this.state.contactedSelectValue}
                handlePageChange={this.handleContactedServicePageChange.bind(this)}
                />
              : <div>Tienes que estar logeado como {this.state.client.user.first_name} {this.state.client.user.last_name} para ver los servicios contratados</div>}
            </ListGroup>
          </Jumbotron>
        </Container>
        <Container>
        <Row style={{marginTop:100}}>
          <p className="h4"><b>Servicios Contratados</b></p>
          <Button onClick={() => this.handleSwitchQuery({hiredQuery:this.state.hiredAllParams})} color="link"><p className="h8" style={{top:0}}>Todos</p></Button>
          <p  style={{top:0}}> | </p>
          <Button onClick={() => this.handleSwitchQuery({hiredQuery:this.state.hiredParamsPendingReview})} color="link"><p className="h8" style={{top:0}}>Evaluación Pendiente</p></Button>
          <p  style={{top:0}}> | </p>
          <Button onClick={() => this.handleSwitchQuery({hiredQuery:this.state.hiredParamsReviewed})} color="link"><p className="h8" style={{top:0}}>Evaluados</p></Button>

        </Row>
          <Jumbotron>
            <Select
               name="hired-order-by"
               multi={true}
               options={[{ value: 'creation_date', label: 'Fecha contrado ascendiente' },{ value: '-creation_date', label: 'Fecha contrado descendiente' }]}
               onChange={this.handleChangeHiredOrder.bind(this)}
               searchable={false}
               autosize={true}
               clearable={false}
               closeOnSelect={true}
               placeholder={'Ordenar por...'}

             />
            <ListGroup>
              {this.state.owner ? <ServiceAnnouncementListGroup
                services={this.state.hired_services}
                pagination={this.state.hired_pagination}
                handlePageChange={this.handleHiredServicePageChange.bind(this)}
                pending={true}
                rejected={false}
                />
              : <div>Tienes que estar logeado como {this.state.client.user.first_name} {this.state.client.user.last_name} para ver los servicios contratados</div>}
            </ListGroup>
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
    services:state.services,
    update_service:state.update_service,
    put_service:state.put_service,
    post_review:state.post_review
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
