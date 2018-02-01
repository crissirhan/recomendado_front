import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SubJobCategories from './SubJobCategories';
import ReactTable from 'react-table';
import {
  Link,
} from 'react-router-dom';
import { Col, Jumbotron, Button, Row, Card, CardTitle, CardText, CardGroup, Modal, ModalBody, ModalHeader, ModalFooter, Collapse} from 'reactstrap';
import getAnnouncements from '../actions/get_announcements';
import getReviews from '../actions/get_reviews';
import './css/images.css';
import putService from '../actions/put_service'
import cookie from 'react-cookies';
import Rating from 'react-rating';
import { ENDPOINT_URI } from '../Globals';
import { updateSearchParams } from '../actions/search'
import { withRouter } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ReviewList from './ReviewList'
import './css/loading.css'

class AnnouncementPage extends Component {

  componentDidMount(){
    //this.props.updateSearchParams({search:this.state.searchTerm, visible:true})
    this.props.getAnnouncements({'id':this.props.announcement_id});
    this.props.getReviews({announcement_id:this.props.announcement_id,page_size:10, ordering:'-date'})
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      if(nextProps.put_service !== this.props.put_service){
        if(nextProps.put_service.success){
          this.handleSuccessPutService()
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
      if(nextProps.reviews !== this.props.reviews){
        if(nextProps.reviews.result !== this.props.reviews.result){
          this.setState({
            announcement_reviews: nextProps.reviews.result
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
    toast.success("Contactado")
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
        cost: this.state.announcement.price ? this.state.announcement.price : 0,
        creation_date: creation_date.toJSON(),
        contacted:true,
        contacted_date: creation_date.toJSON(),
      }
      this.props.putService(data);
    }else{
      alert('Debes logearte como cliente para realizar esta acción')
    }
  }

  toggleContactCollapse(){
    if(!this.state.contact_collapse){
      this.handleCreateService()
    }
    this.setState({
      contact_collapse:true
    })
  }

  handleToggleContactCollapse(){
    if(cookie.load('isClient') === "true"){
      this.toggleContactCollapse()
    } else {
      this.props.history.push('/login?from=' + this.props.history.location.pathname)
    }
  }
  handleReviewPageChange(pageNumber){
    let new_query = Object.assign({}, this.props.reviews.params, {page:pageNumber})
    this.props.getReviews(new_query)
  }
  render(){
    if(this.state.loading || !this.state.announcement_reviews){
      return <div class="container"><div class="loader"></div></div>
    }
    if(this.state.error){
      return <div class="container">Ha ocurrido un error</div>
    }
    if(!this.state.announcement){
      return <div class="container">Ha ocurrido un error</div>
    }
    let owner = false;
    if(cookie.load('user') && cookie.load('user').id === this.state.announcement.professional.id && cookie.load('isProfessional') === "true"){
      owner = true;
    }
    //let serviceButton = <Link to={'/contratar/aviso/' + this.state.announcement.id}><Button>Contactar</Button></Link>;
    let serviceButton = <Button onClick={this.toggleContactModal}>Contactar</Button>
    return (
      <div>
        <section style={{background: 'url('+this.state.announcement.announcement_thumbnail +')'}} class="hero listing-single-hero d-flex align-items-end">
          <div class="container">
            <div class="content d-flex justify-content-between align-items-start flex-column flex-lg-row align-items-lg-end">
              <div class="heading-info">
                {this.state.announcement.job_tags.map(tag => {
                  return <Link key={tag.id} to={'/categorias/'+tag.job.job_category.job_type + '/' + tag.job.job_sub_type + '/'}>
                      <div class="badge-transparent">
                        {tag.job.job_sub_type}
                      </div>
                    </Link>
                })}
                <h1 >{this.state.announcement.title}</h1>
                <p><i class="icon-localizer"></i> {this.state.announcement.location}</p>
                <div class="listing-rate d-flex align-items-center">
                  <Rating
                    class="text-warning"
                    empty="fa fa-star-o fa-2x orange-star rate list-inline"
                    full="fa fa-star fa-2x orange-star rate list-inline"
                    initialRate={this.state.announcement.review_average? this.state.announcement.review_average : 0}
                    readonly
                  /><span class="reviewers">{Math.round( this.state.announcement.review_average * 10) / 10} estrellas</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="container">
          <div class="row">
            <main class="col-lg-8">
              <div class="block about-listing">
                <header>
                  <h3 class="has-lines"><small>Aviso</small> Acerca del Aviso</h3>
                </header>
                  <p>{this.state.announcement.description.substr(0,20)+'...'}</p>
                </div>
                <ReviewList
                  reviews={this.props.reviews.result}
                  pagination={this.props.reviews.pagination}
                  handlePageChange={this.handleReviewPageChange.bind(this)}
                  owner={owner}
                  />
            </main>
            <aside class="col-lg-4">
              <div class="widget opening-hours">
                <header>
                  <h3 class="has-lines"><small>Atención</small> Días de atención </h3>
                </header>
                <div class="days">
                  {this.state.announcement.availability_display.replace(/ /g,'').split(",").map( day => <div class="day d-flex justify-content-between"><strong>{day}</strong></div> )}
                </div>
              </div>
              <div class="widget contact">
                <header>
                  <h3 class="has-lines"><small>Contacto</small> Acerca del profesional</h3>
                </header>
                <div class="info">
                  <Link to={'/profesionales/'+this.state.announcement.professional.id}>
                    <img className="img-circle center-cropped" style={{maxWidth:'100%'}} src={this.state.announcement.professional.profile_picture } alt="" />
                    <div class="item"><i class="fa fa-user"></i>{this.state.announcement.professional.user.first_name} {this.state.announcement.professional.user.last_name}</div>
                  </Link>
                  {cookie.load('isClient') == "true" ? <div class="item"><div class="btn btn-primary has-shadow" onClick={this.handleToggleContactCollapse} style={{ marginBottom: '1rem' }}>Contactar</div>
                  <Collapse isOpen={this.state.contact_collapse}>
                    <div>
                      <div class="item"><i class="fa fa-phone"></i> {this.state.announcement.professional.phone_number}</div>
                      <div class="item"><i class="fa fa-envelope-o"></i>{this.state.announcement.professional.user.email}</div>
                    </div>
                  </Collapse> </div>: null}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
     )
  }
}


function mapStateToProps(state){
  return {
    announcements: state.announcements,
    put_service: state.put_service,
    reviews:state.reviews
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncements: getAnnouncements,
    putService: putService,
    getReviews:getReviews,
    updateSearchParams:updateSearchParams
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnnouncementPage));
