import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getClient from '../actions/get_client';
import updateClient from '../actions/update_client';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import getClientServices from '../actions/get_client_services';
import {
  Container,
  Collapse,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col
} from 'reactstrap';
import classnames from 'classnames';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import ServiceList from './ServiceList';

class ClientPage extends Component {

  componentDidMount() {
    this.props.getClient(this.props.client_id);
    this.props.getClientServices(this.props.client_id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps && nextProps.client) {
      //this.syncPropToState(nextProps);
      this.setState({
        first_name:nextProps.client.user.first_name,
        last_name:nextProps.client.user.last_name,
        email:nextProps.client.user.email,
        username:nextProps.client.user.username,
        lazyInitialization: false
      });
    }
    if(nextProps != this.props && nextProps.client_services[0] && !this.state.client_services){
      this.setState({
        client_services:nextProps.client_services
      })
    }
  }

  syncPropToState(nextProps){
    if(this.state.lazyInitialization){
      for(var key in nextProps.client) {
         if (nextProps.client.hasOwnProperty(key)) {
            this.setState({
              [key]: nextProps.client[key]
            });
         }
      }
      this.setState({
        first_name:nextProps.client.user.first_name,
        last_name:nextProps.client.user.last_name,
        email:nextProps.client.user.email,
        username:nextProps.client.user.username,
        lazyInitialization: false
      });
      console.log(this.state);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      lazyInitialization: true,
      editMode:false,
      username:'',
      id: '',
      first_name: '',
      last_name: '',
      user:{},
      activeTab: '1',
      client_services:null
    };
     this.handleInputChange = this.handleInputChange.bind(this);
     this.toggle = this.toggle.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  editMode(){
    this.setState({
      editMode: !this.state.editMode
    });
  }

  handleSave(){
    let user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name
    }
    let data = {
      user:user
    }
    console.log(this.state);
    console.log(this.props);
    console.log(data);
    this.props.updateClient(this.props.client_id, data);
    this.editMode();
  }

  handleCancel(){
    this.props.getClient(this.props.client_id);
    this.editMode();
  }
  render() {
    console.log(this.state.client_services);
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Datos de usuario
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Servicios contratados
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Container>
              <Form >
                <FormGroup >
                  <Label for="first_name">Nombre</Label><Input readOnly={!this.state.editMode} name="first_name" id="first_name"
                  value={this.state.first_name} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup >
                  <Label for="last_name">Apellido</Label><Input readOnly={!this.state.editMode} name="last_name" id="last_name"
                  value={this.state.last_name} onChange={this.handleInputChange}/>
                </FormGroup>
                <Button onClick={() => {this.editMode()}} hidden={this.state.editMode}>Editar</Button><Button hidden={!this.state.editMode} onClick={() => {this.handleSave()} }>Guardar</Button><Button hidden={!this.state.editMode} onClick={() => {this.handleCancel()} }>Cancelar</Button>
              </Form>
            </Container>
          </TabPane>
          <TabPane tabId="2">
              <ServiceList services={this.state.client_services}/>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    client: state.client,
    update_client: state.update_client,
    client_services:state.client_services
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getClient: getClient,
    updateClient: updateClient,
    getClientServices:getClientServices
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
