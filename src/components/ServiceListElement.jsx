import React, { Component } from 'react';
import { ListGroupItem, CardTitle, Col, Button, Row, Collapse } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import './css/images.css';
import './css/box.css';
import './css/tab.css';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import updateService from '../actions/update_service'
import putService from '../actions/put_service'
import cookie from 'react-cookies';

class ServiceListElement extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps != this.props){
      this.setState({
        shouldReRender:true
      })
    }
  }
  componentDidMount(){
    if(this.state.shouldReRender){
      this.setState({
        shouldReRender:false
      })
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      accepted:null,
      answered:false,
      contacted:false,
      pending: this.props.service.contacted === true && !this.props.service.professional_rejected  && !this.props.service.hired,
      shouldReRender:false,
      contactAgain:false
    };
    this.handleCreateService = this.handleCreateService.bind(this)
  }


  handleYes(){
    let today = new Date()
    this.props.updateService(this.props.service.id, {hired_date:today.toJSON(),hired:true, })
    this.setState({accepted:true, answered:true})
  }

  handleNo(){
    this.setState({accepted:false,answered:true})
    this.props.updateService(this.props.service.id, { professional_rejected:true})
  }

  handleDelete(){
    this.props.updateService(this.props.service.id, {deleted:true})
  }

  createService(){
    if(cookie.load('user').user && cookie.load('isClient') === "true"){
      let creation_date = new Date();
      let data = {
        client_id:cookie.load('user').id,
        announcement_id:this.props.service.announcement.id,
        cost: this.props.service.announcement.price,
        creation_date: creation_date.toJSON(),
        contacted:true,
        contacted_date: creation_date.toJSON(),
      }
      this.props.putService(data);
    }else{
      alert('Debes logearte como cliente para realizar esta acción')
    }
  }

  handleCreateService(){
    if(!this.state.contacted){
      this.createService()
    }
    this.setState({
      contacted:true
    })
  }
  handleContactAgain(){
    if(cookie.load('isClient') === "true"){
      this.setState({contactAgain:true},
      ()=>this.handleCreateService())

    } else {
      this.props.history.push('/login?from=' + this.props.history.location.pathname)
    }
  }

  render() {
    let service = this.props.service
    let announcement = service.announcement
    let image_url = announcement.announcement_thumbnail;
    if(!image_url){
      image_url = announcement.professional.profile_picture
    }
    let border_color = ''
    if(this.state.pending){
      border_color = 'yellow'
    } else if (service.professional_rejected) {
      border_color = 'red'
    } else if (service.hired) {
      border_color = 'GreenYellow'
    }
    return (
      <ListGroupItem style={{marginBottom:20, minHeight:200, borderColor:border_color}} className="shadow-box round-border" key={announcement.id}>
                <Row>
                  <Col sm="2">
                    <Link to={'/profesionales/' + announcement.professional.id}>
                      <img className="center-cropped img-circle" style={{height:100,width:100}} src={announcement.professional.profile_picture} />
                      <div>
                        {announcement.professional.user.first_name} {announcement.professional.user.last_name}
                      </div>
                    </Link>
                  </Col>
                  <Col style={{marginTop:0}} sm="6">
                    <div>
                      <Link to ={'/avisos/' + announcement.id}>
                        <CardTitle><b>{announcement.title}</b></CardTitle>
                      </Link>
                    </div>

                    <div>
                      <Row>
                        <Col>
                          <div  syle={{fontSize:"10px"}}>
                            <Rating className="text-center"
                                empty="fa fa-star-o fa-2x orange-star"
                                full="fa fa-star fa-2x orange-star"
                                initialRate={announcement.review_average}
                                readonly/>
                          </div>
                        </Col>
                        <Col>
                          <small style={{textAlign:"center", marginLeft:-70}}className="text-muted">{announcement.review_count? announcement.review_count : 0} evaluaciones</small>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <img  style={{height:120,width:150}} src={announcement.announcement_thumbnail} />
                    </div>
                    <div style={{allign:"right", }}>
                      tags: {announcement.job_tags.map((tag,index) => {
                        return <Link to={'/categorias/'+tag.job.job_category.job_type+'/'+tag.job.job_sub_type}>{tag.job.job_sub_type}{index + 1 < announcement.job_tags.length? ' | ': null }</Link>
                      })}
                    </div>
                  </Col>
                  <Col sm="4" style={{width:500}}>
                    <Button type="button" class="close" aria-label="Close" onClick={this.handleDelete.bind(this)} style={{position:"absolute", top:0, right:0, border:0, allign:"right"}}>
                      <span aria-hidden="true">&times;</span>
                    </Button>
                    <div>
                      Contactado:  {new Date(service.contacted_date).toLocaleDateString().replace(new RegExp("-", 'g'),"/")}
                    </div>
                    {this.props.pending ? <div style={{marginTop:30}}><div>
                      <b>Teléfono: {announcement.professional.phone_number}</b>
                    </div>
                    <div>
                      <b>Email: {announcement.professional.user.email}</b>
                    </div>
                    <div>
                      Publicado: {new Date(announcement.publish_date).toLocaleDateString().replace(new RegExp("-", 'g'),"/")}
                    </div>
                    <div>
                      Contactado: {new Date(service.contacted_date).toLocaleDateString().replace(new RegExp("-", 'g'),"/")}
                    </div></div> : null}
                    { !this.state.pending ? <div style={{marginTop:30}}>
                        <Button onClick={this.handleContactAgain.bind(this)} disabled={this.props.put_service.loading} color="primary">Volver a contactar</Button>
                        <Collapse isOpen={this.state.contactAgain}>
                          <div>
                            <div>Nombre: {announcement.professional.user.first_name} {announcement.professional.user.last_name}</div>
                            <div>Número de teléfono: {announcement.professional.phone_number}</div>
                            <div>Correo electrónico: {announcement.professional.user.email}</div>
                          </div>
                        </Collapse>
                        </div> :
                      <div style={{marginTop:30}}>
                      <div>
                        ¿Aceptó tu propuesta de trabajo?
                      </div>
                        <Row>
                          <Col sm="6">
                            <Button onClick={this.handleYes.bind(this)} disabled={this.props.update_service.loading} color="success">Si</Button>
                          </Col>
                          <Col sm="6">
                            <Button onClick={this.handleNo.bind(this)} disabled={this.props.update_service.loading} color="danger">No</Button>
                          </Col>
                        </Row>
                      </div>}
                  </Col>
                  <Col>

                  </Col>
                </Row>
              </ListGroupItem>
    );
  }
}

function mapStateToProps(state){
  return {
    update_service:state.update_service,
    put_service:state.put_service
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateService:updateService,
    putService: putService,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceListElement);
