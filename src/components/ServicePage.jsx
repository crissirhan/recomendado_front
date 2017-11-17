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

class ServicePage extends Component {

  componentDidMount(){
    this.props.getAnnouncements(this.props.announcement_id,null);
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      if(this.props.announcements !== nextProps.announcements)
      this.setState({
        announcement:nextProps.announcements
      })
      if(nextProps.put_service !== this.props.put_service){
        this.setState({
          success:nextProps.put_service.success,
          error: nextProps.put_service.error
        })
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      announcement:null,
      success: false,
      error: false,
      loading_service: false
    };
    this.handleCreateService = this.handleCreateService.bind(this);
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
      this.props.putService(data);
    }else{
      alert('Debes logearte como cliente para realizar esta acción')
    }
  }

  render(){
    console.log(this.props)
    if(this.state.success){
      return <Container><div className="message--info">Servicio contratado con éxito!</div></Container>;
    }
    if(!this.state.announcement){
      return <Container>Cargando</Container>
    }
    let serviceButton = <Link to={'/contratar/aviso/' + this.state.announcement.id}><Button color="link">Contratar</Button></Link>;

    return (
      <Container>
        <div style={{ opacity: this.props.put_service.loading ? 0.5 : 1 }}>
            <p>Título: {this.state.announcement.title}</p>
            <p>Descripción: {this.state.announcement.description}</p>
            <p>Precio: ${this.state.announcement.price}</p>
            <p>Profesional: <Link to={'/profesionales/'+this.state.announcement.professional.id}>
              {this.state.announcement.professional.user.first_name} {this.state.announcement.professional.user.last_name}
            </Link></p>
            <p>Expira el: {new Date(this.state.announcement.expire_date).toLocaleDateString()}</p>
            <p>Lugar: {this.state.announcement.location}</p>
            <p>Movilidad: {this.state.announcement.movility}</p>
            <p>Días de atención: {this.state.announcement.availability_display}</p>
            {this.props.put_service.error ? <div className="message--error">¡Error! {this.props.put_service.error_type}</div> : null}
            <Button onClick={this.handleCreateService} disabled={this.props.put_service.loading}>Contratar</Button>
          </div>
      </Container>
     )
  }
}


function mapStateToProps(state){
  return {
    announcements: state.announcements,
    put_service: state.put_service
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncements: getAnnouncements,
    putService: putService
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage);
