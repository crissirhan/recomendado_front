import React from 'react';
import ReviewForm from './ReviewForm';
import {
  Container,
  Collapse,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Jumbotron, CardGroup,ListGroupItem, ListGroup,
  ModalBody, Modal, ModalHeader, ModalFooter
} from 'reactstrap';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';

class ListGroupService extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      service: this.props.service,
      contact_modal: false
    };
    this.toggleContactModal = this.toggleContactModal.bind(this);
  }

  toggleContactModal(){
    this.setState({
      contact_modal:!this.state.contact_modal
    })
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <ListGroupItem key={this.state.service.id}>
        <Col sm="3">
          <div>{this.state.service.announcement.job_tags.map(tag => {
            return tag.job.job_sub_type
          })}</div>
          <div><Link to={'/profesionales/' + this.state.service.announcement.professional.id}>{this.state.service.announcement.professional.user.first_name} {this.state.service.announcement.professional.user.last_name}</Link></div>
          <div>Publicación: {new Date(this.state.service.announcement.publish_date).toLocaleDateString().replace(new RegExp("-", 'g'),"/")}</div>
          <div>Contratado: {new Date(this.state.service.creation_date).toLocaleDateString().replace(new RegExp("-", 'g'),"/")}</div>
        </Col>
        <Col>
          <div><i>{this.state.service.announcement.description}</i></div>
          <div>
            <tr>
              <td>→Ubicación: {this.state.service.announcement.location}</td>
              <td>→Precio: {this.state.service.cost}</td>
            </tr>
            <tr>
              <td>→Disponibilidad: {this.state.service.announcement.availability_display}</td>
              <td>→Movilidad: {this.state.service.announcement.movility}</td>
            </tr>
          </div>
        </Col>
        <Col>
          <Button onClick={this.toggle}>Evaluar</Button>
          <Collapse isOpen={this.state.collapse}>
            <ReviewForm service_id={this.state.service.id} service={this.state.service} alreadyReviewed={this.props.alreadyReviewed}/>
          </Collapse>
        </Col>
        <Col xs="2">
          <Button onClick={this.toggleContactModal}>Contactar</Button>
          <Modal isOpen={this.state.contact_modal} toggle={this.toggleContactModal}>
            <ModalHeader toggle={this.toggleContactModal}>Datos contacto</ModalHeader>
            <ModalBody>
            <div>Correo electrónico: </div>
              <div>Nombre: {this.state.service.announcement.professional.user.first_name} {this.state.service.announcement.professional.user.last_name}</div>
              <div>Número de teléfono: {this.state.service.announcement.professional.phone_number}</div>
              <div>Correo electrónico: {this.state.service.announcement.professional.user.email}</div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleContactModal}>Cerrar</Button>
            </ModalFooter>
          </Modal>
        </Col>
      </ListGroupItem>
    );
  }
}

export default ListGroupService
