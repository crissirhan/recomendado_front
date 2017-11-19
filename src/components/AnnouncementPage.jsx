import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SubJobCategories from './SubJobCategories';
import ReactTable from 'react-table';
import {
  Link,
} from 'react-router-dom';
import { Container, Col, Jumbotron, Button, Row, Card, CardTitle, CardText, CardGroup, Modal, ModalBody, ModalHeader, ModalFooter, Collapse} from 'reactstrap';
import getAnnouncements from '../actions/get_announcements';
import getAnnouncementReviews from '../actions/get_announcement_reviews';
import './css/images.css';
import putService from '../actions/put_service'
import cookie from 'react-cookies';
import Rating from 'react-rating';
import { ENDPOINT_URI } from '../Globals';
import { updateSearchParams } from '../actions/search'
import { withRouter } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class AnnouncementPage extends Component {

  componentDidMount(){
    //this.props.updateSearchParams({search:this.state.searchTerm, visible:true})
    this.props.getAnnouncements({'id':this.props.announcement_id});
    this.props.getAnnouncementReviews(this.props.announcement_id)
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      if(nextProps.put_service !== this.props.put_service){
        if(nextProps.put_service.success){
          this.handleSuccessPutService()
        }
        if(nextProps.put_service.error){
          this.handleErrorPutService()
        }
      }
      if(nextProps.announcements != this.props.announcements){
        if(this.props.announcements.success !== nextProps.announcements.success){
          this.setState({
            success:nextProps.announcements.success
          })
        }
        if(this.props.announcements.error !== nextProps.announcements.error){
          this.setState({
            error:nextProps.announcements.error
          })
        }
        if(this.props.announcements.loading !== nextProps.announcements.loading){
          this.setState({
            loading:nextProps.announcements.loading
          })
        }
        if(nextProps.announcements.result !== this.props.announcements.result && nextProps.announcements.result ){
          this.setState({
            announcement: nextProps.announcements.result[0],
            images: nextProps.announcements.result[0].announcement_images
          })
        }
      }
      if(nextProps.announcement_reviews !== this.props.announcement_reviews){
        console.log(nextProps.announcement_reviews)
        if(nextProps.announcement_reviews.result !== this.props.announcement_reviews.result){
          this.setState({
            announcement_reviews: nextProps.announcement_reviews.result
          })
        }
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      announcement:null,
      announcement_reviews:{},
      success:false,
      error:false,
      loading:false,
      images:[],
      contact_collapse: false
    };
    this.handleCreateService = this.handleCreateService.bind(this);
    this.toggleContactCollapse = this.toggleContactCollapse.bind(this);
    this.handleToggleContactCollapse = this.handleToggleContactCollapse.bind(this);
    this.handleCreateService = this.handleCreateService.bind(this);
    this.handleSuccessPutService = this.handleSuccessPutService.bind(this)
    this.handleErrorPutService = this.handleErrorPutService.bind(this)
  }

  handleSuccessPutService(){
    toast.success("Notifcado. ¡Gracias!")
  }

  handleErrorPutService(){
    toast.error("Ha ocurrido un error")
  }

  handleCreateService(){
    if(cookie.load('user').user && cookie.load('isClient') === "true"){
      let creation_date = new Date();
      let data = {
        client_id:cookie.load('user').id,
        announcement_id:this.state.announcement.id,
        cost: this.state.announcement.price,
        creation_date: creation_date.toJSON()
      }
      console.log(data)
      this.props.putService(data);
    }else{
      alert('Debes logearte como cliente para realizar esta acción')
    }
  }

  toggleContactCollapse(){
    this.setState({
      contact_collapse:!this.state.contact_collapse
    })
  }

  handleToggleContactCollapse(){
    if(cookie.load('isClient') === "true"){
      this.toggleContactCollapse()
    } else {
      console.log(this.props.history)
      this.props.history.push('/login?from=' + this.props.history.location.pathname)
    }
  }

  render(){
    console.log(this.props)
    console.log(this.state.announcement)
    if(this.state.loading || !this.state.announcement_reviews){
      return <Container>Cargando</Container>
    }
    if(this.state.error){
      return <Container>Ha ocurrido un error</Container>
    }
    if(!this.state.announcement){
      return <Container>Ha ocurrido un error</Container>
    }
    let owner = false;
    if(cookie.load('user') && cookie.load('user').id === this.state.announcement.professional.id && cookie.load('isProfessional') === "true"){
      owner = true;
    }
    //let serviceButton = <Link to={'/contratar/aviso/' + this.state.announcement.id}><Button>Contactar</Button></Link>;
    let serviceButton = <Button onClick={this.toggleContactModal}>Contactar</Button>

    console.log(this.state.announcement)
    return (
      <Container>
        <Row style={{marginBottom:25}}>
          <Col >
            <h1 className="display-3">{this.state.announcement.title}</h1>
            <img className="center-cropped announcement-thumbnail" src={this.state.announcement.announcement_thumbnail} alt="Imagen anuncio" />
            <div>
              <Rating
                empty="fa fa-star-o fa-2x orange-star"
                full="fa fa-star fa-2x orange-star"
                initialRate={this.state.announcement_reviews.average ? this.state.announcement_reviews.average : 0}
                readonly
              />
            </div>
            <div>
              <small style={{textAlign:"center"}}className="text-muted">{new Date(this.state.announcement.publish_date).toLocaleDateString()}</small>
            </div>
          </Col>
          <Col sm="2">
            <Button color="primary" onClick={this.handleToggleContactCollapse} style={{ marginBottom: '1rem' }}>Contactar</Button>
            <Collapse isOpen={this.state.contact_collapse}>
              <div>
                <div>Nombre: {this.state.announcement.professional.user.first_name} {this.state.announcement.professional.user.last_name}</div>
                <div>Número de teléfono: {this.state.announcement.professional.phone_number}</div>
                <div>Correo electrónico: {this.state.announcement.professional.user.email}</div>
              </div>
              <Row>
                <Col>
                  <Button color="primary" onClick={this.handleCreateService} disabled={this.props.put_service.loading}>Trabajo aceptado</Button>
                </Col>
                <Col>
                  <Button color="primary" disabled={this.props.put_service.loading}>Trabajo rechazado</Button>
                </Col>
              </Row>
            </Collapse>
            { owner ? <Link to={'/editar/anuncio/'+this.state.announcement.id}><Button>Editar Anuncio</Button></Link> : null}
          </Col>
        </Row>
        <div style={{marginBottom:25}}>
          <i><p className="lead">{this.state.announcement.description}</p></i>
        </div>
        <div className="text-left">
          <Row>
            <Col>
              <p>→Ubicación: {this.state.announcement.location}</p>
            </Col>
            <Col>
              <p>→Monto: ${this.state.announcement.price}</p>
            </Col>
          </Row>
        </div>
        <div className="text-left" style={{marginBottom:25}}>
          <Row>
            <Col>
              <p>→Disponibilidad: {this.state.announcement.availability_display}</p>
            </Col>
            <Col>
              {/*}<p>→Movilidad: {this.state.announcement.movility}</p>*/}
            </Col>
          </Row>
        </div>
        <div>
          <p className="lead" style={{marginBottom:25}}>Tags:
            {this.state.announcement.job_tags.map(tag => {
              return <Button color="link" key={tag.id}>
                <Link to={'/categorias/'+tag.job.job_category.job_type + '/' + tag.job.job_sub_type + '/'}>
                  {tag.job.job_sub_type}
                </Link>
              </Button>
            })}
          </p>
        </div>
        <div>
          <Row style={{marginBottom:25}}>
            <Col sm="4">
              <img className="img-circle center-cropped professional-profile" src={this.state.announcement.professional.profile_picture} alt="foto perfil" />
            </Col>
            <Col>
              <div>
                <Link to={'/profesionales/'+this.state.announcement.professional.id}>
                  {this.state.announcement.professional.user.first_name} {this.state.announcement.professional.user.last_name}
                </Link>
              </div>
              {this.state.announcement.professional.experience? <div>
                <i>"{this.state.announcement.professional.experience}"</i>
              </div> : null}
            </Col>
          </Row>
        </div>
        <div>
          <Container>
            <p className="h4"><b>Reviews</b></p>
            <Jumbotron>
              <CardGroup>
                <Row>
                  {this.state.announcement_reviews.reviews.sort(() => .5 - Math.random()).slice(0,3).map(review => {
                    let image_url = review.service.client.profile_picture ? ENDPOINT_URI+review.service.client.profile_picture : "https://placeholdit.imgix.net/~text?txtsize=33&txt=180%C3%97180&w=318&h=180";
                    return (<Col  sm="4" key={review.id}>
                              <Card className="shadow-box round-border min-width">
                                <CardTitle className="text-center">{review.service.announcement.job_tags.map(tag => {
                                  return tag.job.job_sub_type
                                })}</CardTitle>
                                <Rating className="text-center"
                                    empty="fa fa-star-o fa-2x orange-star"
                                    full="fa fa-star fa-2x orange-star"
                                    initialRate={review.rating}
                                    readonly/>
                                <CardText className="text-center"><i>"{review.client_comment}"</i></CardText>
                                <CardText className="text-center">
                                  <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                                </CardText>
                                <img className="img-circle center-cropped review-client-profile" src={image_url}/>
                                <CardText className="text-center">{review.service.client.user.first_name} {review.service.client.user.last_name}</CardText>
                              </Card>
                            </Col>)
                    })}
                  </Row>
                </CardGroup>
              </Jumbotron>
          </Container>
        </div>
      </Container>
     )
  }
}


function mapStateToProps(state){
  return {
    announcements: state.announcements,
    put_service: state.put_service,
    announcement_reviews:state.announcement_reviews
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncements: getAnnouncements,
    putService: putService,
    getAnnouncementReviews:getAnnouncementReviews,
    updateSearchParams:updateSearchParams
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnnouncementPage));
