import React, { Component } from 'react';
import { ListGroupItem, CardTitle, Col, Button } from 'reactstrap';
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
        if(nextProps.update_announcement.error){
          toast.error('Ha ocurrido un error al editar el aviso')
        }
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      visible:this.props.announcement.visible,
      expire_date:new Date(this.props.announcement.expire_date)
    };
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

  render() {
    let image_url = this.props.announcement.announcement_thumbnail;
    if(!image_url){
      image_url = this.props.announcement.professional.profile_picture
    }
    let announcement = this.props.announcement
    let today = new Date()
    return (  <ListGroupItem style={{marginBottom:20}} className="shadow-box round-border" key={announcement.id}>
                <Col sm="3">
                  <Rating className="text-center"
                      empty="fa fa-star-o fa-2x orange-star"
                      full="fa fa-star fa-2x orange-star"
                      initialRate={announcement.review_average}
                      readonly/>
                  <div>
                    <small style={{textAlign:"center"}}className="text-muted">{announcement.review_count} evaluaciones</small>
                  </div>

                  <div>
                    Publicado: {new Date(announcement.publish_date).toLocaleDateString().replace(new RegExp("-", 'g'),"/")}
                  </div>
                  <div>
                    Expira: {this.state.expire_date.toLocaleDateString().replace(new RegExp("-", 'g'),"/")}
                  </div>
                  <div>
                    {today > this.state.expire_date ? <font size="3" color="red">EXPIRADO</font> : <font size="3" color="gray">Vigente</font>}
                  </div>
                  <div>
                    {this.props.extend_button ? <Button disabled={this.props.update_announcement.loading} onClick={this.handleExpireButton.bind(this)}>Extender</Button> : null}
                  </div>
                </Col>
                <Col style={{marginTop:-90}}>
                  <div>
                    <Link to ={'/anuncios/' + announcement.id}>
                      <CardTitle><b>{announcement.title}</b></CardTitle>
                    </Link>
                  </div>
                  <div>
                    <i>{announcement.description}</i>
                  </div>
                  <div style={{allign:"right", bottom: -90, position: "absolute"}}>
                    tags: {announcement.job_tags.map((tag,index) => {
                      return <Link to={'/categorias/'+tag.job.job_category.job_type+'/'+tag.job.job_sub_type}>{tag.job.job_sub_type}{index + 1 < announcement.job_tags.length? ' | ': null }</Link>
                    })}
                  </div>
                </Col>
                <Col sm="1" style={{marginTop:-100}}>
                  <div>
                    {this.props.visible_button ? <SwitchButton label={this.state.visible? 'Visible' : 'Oculto'} key={announcement.id} name={"switch-"+announcement.id} defaultChecked={announcement.visible} onChange={this.handleSwitchChange.bind(this)} />: null}
                  </div>
                </Col>
              </ListGroupItem>
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
