import React, { Component } from 'react';
import { connect } from 'react-redux';
import getUserAnnouncements from '../../actions/get_user_announcements';
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  Link
} from 'react-router-dom';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import {
  Container,
  Collapse,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col
} from 'reactstrap';
import updateAnnouncements from '../../actions/update_announcement';
import getAnnouncements from '../../actions/get_announcements';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import cookie from 'react-cookies';
import { ToastContainer, toast } from 'react-toastify';

class AnnouncementsEdit extends Component {

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      if(nextProps.announcements.result){
        let days = this.state.availability;
        let announcement = nextProps.announcements.result;
        announcement.availability.map((day) => days[day] = true);
        this.setState({
          availability: days,
          movility: announcement.movility,
          title: announcement.title,
          description: announcement.description,
          price: announcement.price,
          location: announcement.location,
          professional_id:announcement.professional.id,
          visible:announcement.visible
        })
      }
    }
    if(nextProps.update_announcement !== this.props.update_announcement){
      if(nextProps.update_announcement.success !== this.props.update_announcement.success){
        this.setState({
          success:nextProps.update_announcement.success
        })
      }
      if(nextProps.update_announcement.error !== this.props.update_announcement.error){
        this.setState({
          error:nextProps.update_announcement.error
        })
      }
      if(nextProps.update_announcement.loading !== this.props.update_announcement.loading){
        this.setState({
          loading:nextProps.update_announcement.loading
        })
      }
    }
  }

  componentDidMount() {
    this.props.getAnnouncements(this.props.announcement_id,null)
  }

  constructor(props) {
    super(props);
    let days = {
      'lun':false,
      'mar':false,
      'mier':false,
      'jue':false,
      'vier':false,
      'sab':false,
      'dom':false
    }
    this.state = {
      availability:days,
      movility:'',
      title:'',
      description:'',
      price:'',
      location:'',
      visible:false,
      thumbnail:null,
      professional_id:null,
      success:false,
      error:false,
      loading:false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleError(){
    toast.success("Aviso editado con éxito")
    this.props.history.push('/profesionales/' + cookie.load('user').id + '/' );
  }

  handleSuccess(){
    toast.error("Error al procesar la solicitud")
  }

  toAnnouncements(){
    if(this.props.announcements[0]){
      return this.props.announcements[0].id;
    } else{
      return null;
    }
  }

  dayRenderer(props){
    if(!props.value){
      return '';
    }
    var days=props.value.split(',');
    return (days.map(day => <span key={day.toString()}>{day} </span>));
  }

  editRenderer(props){
    if(!props.value){
      return '';
    }
    var url = '/profesional/'+props.value.professional.id+'/announcement/'+props.value.id+'/';
    return <Link to={url}>Editar</Link>;
  }
  handleSubmit(){
    let days = [];
    for (var property in this.state.availability) {
        if (this.state.availability.hasOwnProperty(property)) {
            if(this.state.availability[property]){
              days.push(property);
            }
        }
    }
    let data = {
      'availability': days,
      'movility': this.state.movility,
      'title': this.state.title,
      'description': this.state.description,
      'location':this.state.location,
      'price':this.state.price,
      'visible':this.state.visible
    };
    if(this.state.thumbnail){
      data.announcement_thumbnail=this.state.thumbnail
    }
    this.props.updateAnnouncements(this.props.announcement_id,data);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCheckBoxChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let availability = {...this.state.availability};
    availability[name] = value;
    this.setState({availability:availability});

  }
  handleImageChange(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        thumbnail: reader.result
      })
    }
    reader.readAsDataURL(file);

  }
  render(){
    let owner = false;
    if(cookie.load('user') && cookie.load('user').id === this.state.professional_id && cookie.load('isProfessional') === "true"){
      owner = true;
    }
    if(this.state.success){
      this.handleSuccess()
    }
    if(this.state.error){
      this.handleError()
    }
    return (
      <Container>
        <div style={{ opacity: this.state.loading ? 0.5 : 1 }}>
          <AvForm disabled={this.state.loading}>
            <AvGroup>
              <Label for="thumbnail">Imagén del aviso</Label>
              <AvInput type="file" accept="image/*" name="thumbnail" id="thumbnail"
               onChange={this.handleImageChange.bind(this)} />
            </AvGroup>
            <AvGroup>
              <Label for="movility">Movilidad</Label>
              <AvInput  name="movility" id="movility"
              value={this.state.movility} onChange={this.handleInputChange}/>
            </AvGroup>
            <AvGroup>
              <Label for="location">Ubicación</Label>
              <AvInput  name="location" id="location"
              value={this.state.location} onChange={this.handleInputChange}/>
            </AvGroup>
            <AvGroup>
              <Label for="title">Título</Label>
              <AvInput  name="title" id="title"
              value={this.state.title} onChange={this.handleInputChange}/>
            </AvGroup>
            <AvGroup>
              <Label for="description">Descripción</Label>
              <AvInput  name="description" id="description"
              value={this.state.description} onChange={this.handleInputChange}/>
            </AvGroup>
            <AvGroup>
              <Label for="price">Precio</Label>
              <AvInput type="number" name="price" id="price"
              value={this.state.price} onChange={this.handleInputChange}/>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="visible" checked={this.state.visible} onChange={this.handleInputChange} />{' '}
                Visible
              </Label>
            </AvGroup>
            <Label>Disponibilidad</Label>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="lun" checked={this.state.availability.lun} onChange={this.handleCheckBoxChange} />{' '}
                Lunes
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="mar" checked={this.state.availability.mar} onChange={this.handleCheckBoxChange} />{' '}
                Martes
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="mier" checked={this.state.availability.mier} onChange={this.handleCheckBoxChange} />{' '}
                Miércoles
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="jue" checked={this.state.availability.jue} onChange={this.handleCheckBoxChange} />{' '}
                Jueves
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="vier" checked={this.state.availability.vier} onChange={this.handleCheckBoxChange} />{' '}
                Viernes
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="sab" checked={this.state.availability.sab} onChange={this.handleCheckBoxChange} />{' '}
                Sábado
              </Label>
            </AvGroup>
            <AvGroup check>
              <Label check>
                <AvInput type="checkbox" name="dom" checked={this.state.availability.dom} onChange={this.handleCheckBoxChange} />{' '}
                Domingo
              </Label>
            </AvGroup>
            {owner? <Button onClick={() => {this.handleSubmit()} } disabled={this.state.loading}>Guardar</Button> : null}
          </AvForm>
        </div>
      </Container>
     )
  }

}

function mapStateToProps(state){
  return {
    update_announcement: state.update_announcement,
    announcements: state.announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateAnnouncements: updateAnnouncements,
    getAnnouncements: getAnnouncements
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsEdit);
