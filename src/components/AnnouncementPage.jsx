import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SubJobCategories from './SubJobCategories';
import ReactTable from 'react-table';
import {
  Link,
} from 'react-router-dom';
import { Container, Col, Jumbotron, Button, Row } from 'reactstrap';
import getAnnouncements from '../actions/get_announcements';
import './css/images.css';
import putService from '../actions/put_service'
import cookie from 'react-cookies';

class AnnouncementPage extends Component {

  componentDidMount(){
    this.props.getAnnouncements(this.props.announcement_id,null);
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
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
        if(nextProps.announcements.result !== this.props.announcements.result){
          this.setState({
            announcement: nextProps.announcements.result
          })
        }
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      announcement:null,
      success:false,
      error:false,
      loading:false
    };
    this.handleCreateService = this.handleCreateService.bind(this);
  }

  handleCreateService(){
    if(cookie.load('user').user){
      let data = {
        client_id:cookie.load('user').id,
        announcement_id:this.state.announcement.id
      }
      console.log(data);
      this.props.putService(data);
    }else{
      alert('Debes logearte como cliente para realizar esta acción')
    }
  }

  render(){
    console.log(this.props)
    console.log(this.state.announcement)
    if(this.state.loading){
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
    let serviceButton = <Link to={'/contratar/aviso/' + this.state.announcement.id}><Button color="link">Contactar</Button></Link>;
    console.log(this.state.announcement.job_tags)
    return (
      <Container>
        <Row>
          <Col sm="6" >
              <h1 className="display-3">{this.state.announcement.title}</h1>
              <img className="center-cropped announcement-thumbnail" src={this.state.announcement.announcement_thumbnail} alt="Imagen anuncio" />
              <p className="lead">{this.state.announcement.description}</p>
              <hr className="my-2" />
              <p className="lead">Por:
                <Button color="link">
                  <Link to={'/profesionales/'+this.state.announcement.professional.id}>
                    {this.state.announcement.professional.user.first_name} {this.state.announcement.professional.user.last_name}
                  </Link>
                </Button>
              </p>
              <p className="lead">Tags:
                {this.state.announcement.job_tags.map(tag => {
                  return <Button color="link" key={tag.id}>
                    <Link to={'/categorias/'+tag.job.job_category.job_type + '/' + tag.job.job_sub_type + '/'}>
                      {tag.job.job_sub_type}
                    </Link>
                  </Button>
                })}
              </p>
          </Col>
          <Col sm="6" >
            <p>Precio: ${this.state.announcement.price}</p>
            <p>Expira el: {new Date(this.state.announcement.expire_date).toLocaleDateString()}</p>
            <p>Lugar: {this.state.announcement.location}</p>
            <p>Movilidad: {this.state.announcement.movility}</p>
            <p>Días de atención: {this.state.announcement.availability_display}</p>
            {cookie.load('isClient') === "true"? serviceButton : null}
            { owner ? <Link to={'/editar/anuncio/'+this.state.announcement.id}><Button>Editar Anuncio</Button></Link> : null}
          </Col>
        </Row>
      </Container>
     )
  }
}


function mapStateToProps(state){
  return {
    announcements: state.announcements,
    putService: state.putService
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncements: getAnnouncements,
    putService: putService
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementPage);
