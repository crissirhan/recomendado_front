import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getClient from '../actions/get_client';
import updateClient from '../actions/update_client';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
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

class ClientPage extends Component {

  componentDidMount() {
    this.props.getClient(this.props.client_id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.syncPropToState(nextProps);
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
      activeTab: '1'
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
    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name
    }
    console.log(this.state);
    console.log(this.props);
    console.log(data);
    this.props.updateClient(this.props.client_id, data);
    this.editMode();
  }

  handleCancel(){
    this.props.getProfessional(this.props.professional_id);
    this.editMode();
  }
  render() {
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
              <div/>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    client: state.client,
    update_client: state.update_client
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getClient: getClient,
    updateClient: updateClient
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
