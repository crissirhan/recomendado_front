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
import Truncate from 'react-truncate';

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
    return (
              <div class="card card-outline-primary mb-3 text-center shadow-box round-border" key={announcement.id}>
                <div class="card-block">
                  <div class="row">
                    <div class="col-3">
                      <Rating className="text-center"
                          empty="fa fa-star-o fa-2x orange-star medium"
                          full="fa fa-star fa-2x orange-star medium"
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
                    </div>
                    <div class="col-8 text-left">
                      <div>
                        <Link to ={'/avisos/' + announcement.id}>
                          <CardTitle><b>{announcement.title}</b></CardTitle>
                        </Link>
                      </div>
                      <div>
                        <Truncate lines={3} ellipsis={<span>... <a href='/link/to/article'>Read more</a></span>}>
                          <i>{announcement.description}</i>
                        </Truncate>
                      </div>
                      <div >
                        tags: {announcement.job_tags.map((tag,index) => {
                          return <Link to={'/categorias/'+tag.job.job_category.job_type+'/'+tag.job.job_sub_type}>{tag.job.job_sub_type}{index + 1 < announcement.job_tags.length? ' | ': null }</Link>
                        })}
                      </div>
                    </div>
                    <div class="col-1">
                      <div>
                        {this.props.visible_button ? <SwitchButton label={this.state.visible? 'Visible' : 'Oculto'} key={announcement.id} name={"switch-"+announcement.id} defaultChecked={announcement.visible} onChange={this.handleSwitchChange.bind(this)} />: null}
                      </div>
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
