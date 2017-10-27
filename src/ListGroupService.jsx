import React from 'react';
import ReviewForm from './ReviewForm';
import {
  Container,
  Collapse,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Jumbotron, CardGroup,ListGroupItem, ListGroup,
  ModalBody, Modal, ModalHeader
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
      service: this.props.service
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <ListGroupItem key={this.state.service.id}>
        <Col sm="3">
          <div>{this.state.service.announcement.job_subtype.job_sub_type}</div>
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
      </ListGroupItem>
    );
  }
}

export default ListGroupService
