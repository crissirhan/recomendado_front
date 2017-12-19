import React, { Component } from 'react';
import { ListGroupItem, CardTitle, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import './css/images.css';
import './css/box.css';
import Rating from 'react-rating';
import SwitchButton from 'react-switch-button';
import 'react-switch-button/dist/react-switch-button.css';
import updateAnnouncements from '../actions/update_announcement';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ReviewForm from './ReviewForm'

class AnnouncementsListElement extends Component {


  toastId = null;
  announcement_toast = null;

  componentWillReceiveProps(nextProps){
    if(nextProps !== this.props){
      if(nextProps.update_announcement !== this.props.update_announcement ){
        if(nextProps.update_announcement.success){
          if (! toast.isActive(this.toastId) && this.announcement_toast) {
            this.toastId = toast.success('Aviso editado con éxito')
            this.announcement_toast = false
          }

        }
      }
    }
    this.setState(this.state)
  }

  constructor(props) {
    super(props);
    this.state = {
      rating:null,
      modal: false,
      reviewed:false
    };
    this.toggle = this.toggle.bind(this);
    this.ratingCallback = this.ratingCallback.bind(this)
  }
  ratingCallback(new_rating){
    this.setState({rating:new_rating, reviewed:true},()=>this.toggle())
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSwitchChange(event){
    this.setState({visible:!this.state.visible},
    () => this.props.updateAnnouncements(this.props.announcement.id, {visible:this.state.visible}))

  }

  handleExpireButton(event){
    let today = new Date()
    let new_expire_date = this.state.expire_date > today ? this.state.expire_date : today
    new_expire_date.setMonth(new_expire_date.getMonth() + 1)
    this.setState({expire_date:new_expire_date},
    () => {
      this.props.updateAnnouncements(this.props.announcement.id, {expire_date:this.state.expire_date.toJSON()})
      this.announcement_toast = true
  })

  }

  handleStarChange(value){
    this.setState({rating:value}, () => this.toggle())
  }

  render() {
    let image_url = this.props.service.announcement.announcement_thumbnail;
    if(!image_url){
      image_url = this.props.service.announcement.professional.profile_picture
    }
    let service = this.props.service
    let announcement = service.announcement
    let today = new Date()
    let review = ((service.review ? service.review.length : -1) > 0) ? service.review[0] : {}
    return (
              <div class="card card-outline-primary mb-3 shadow-box round-border" key={announcement.id}>
                <div class="card-block">
                  <div class="row">
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                          <ModalHeader toggle={this.toggle}>Evaluación del servicio</ModalHeader>
                          <ModalBody>
                            <ReviewForm ratingCallback={this.ratingCallback} rating={this.state.rating} service_id={service.id}/>
                          </ModalBody>
                        </Modal>
                      <div class="col-3">
                        <Rating className="text-center"
                            empty="fa fa-star-o fa-2x orange-star"
                            full="fa fa-star fa-2x orange-star"
                            initialRate={review.rating}
                            onClick={this.handleStarChange.bind(this)}
                            readonly={review.rating || this.state.reviewed}
                            />
                        {review.rating || this.state.reviewed ? <p class="text-center" style={{color: "#b2b2b2", fontSize:"14px"}}>Evaluación completa</p>
                        : <p class="text-center" style={{color: "#FF0000", fontSize:"14px"}}>EVALÚA A {announcement.professional.user.first_name.toUpperCase()}</p>}
                        <Link to={'/profesionales/' + announcement.professional.id}>
                          <img className="center-cropped img-circle" style={{height:90,width:90}} src={announcement.professional.profile_picture} />
                          <p style={{}}>{announcement.professional.user.first_name} {announcement.professional.user.last_name}</p>
                        </Link>
                        <div>
                          {this.props.extend_button ? <Button disabled={this.props.update_announcement.loading} onClick={this.handleExpireButton.bind(this)}>Extender</Button> : null}
                        </div>
                      </div>
                      <div class="col" >
                        <div>
                          <Link to ={'/avisos/' + announcement.id}>
                            <div class="card-title"><b>{announcement.title}</b></div>
                          </Link>
                        </div>
                        <div>
                          <i>{announcement.description}</i>
                        </div>
                        <div>
                          tags: {announcement.job_tags.map((tag,index) => {
                            return <Link to={'/categorias/'+tag.job.job_category.job_type+'/'+tag.job.job_sub_type}>{tag.job.job_sub_type}{index + 1 < announcement.job_tags.length? ' | ': null }</Link>
                          })}
                        </div>
                      </div>
                      <div class="col-3" >
                        <div>
                          Publicado: {new Date(announcement.publish_date).toLocaleDateString().replace(new RegExp("-", 'g'),"/")}
                        </div>
                        <div>
                          Contratado: {new Date(service.hired_date).toLocaleDateString().replace(new RegExp("-", 'g'),"/")}
                        </div>
                        {announcement.announcement_thumbnail? <img  style={{height:150,width:200}} src={announcement.announcement_thumbnail} /> : null}
                      </div>
                    </div>
                  </div>
                </div>

    );
  }
}

function mapStateToProps(state){
  return {
    update_announcement: state.update_announcement,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateAnnouncements: updateAnnouncements,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsListElement);
