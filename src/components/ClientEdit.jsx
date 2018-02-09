import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import updateClient from '../actions/update_client';
import getClient from '../actions/get_client';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import cookie from 'react-cookies';
import { RegionesYcomunas } from '../Globals';


class ClientEdit extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.client !== this.props.client){
      this.setState({
        email:nextProps.client.user.email,
        first_name: nextProps.client.user.first_name,
        last_name: nextProps.client.user.last_name,
        client_id:nextProps.client.id
      })
    }
    if(nextProps.update_client !== this.props.update_client){

      if(this.props.update_client.success !== nextProps.update_client.success){
        this.setState({
          success:nextProps.update_client.success
        })
      }
      if(this.props.update_client.error !== nextProps.update_client.error){
        this.setState({
          error:nextProps.update_client.error,
          error_types:nextProps.update_client.error_types
        })
      }
      if(this.props.update_client.loading !== nextProps.update_client.loading){
        this.setState({
          loading:nextProps.update_client.loading
        })
      }
    }
  }

  componentDidMount() {
    this.props.getClient(this.props.client_id)
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name:'',
      last_name:'',
      profile_picture:null,
      success:false,
      error:false,
      loading:false,
      client_id:null,
      error_types:[]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(){
    let user_data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    }
    let request = {
      user: user_data,
      profile_picture: this.state.profile_picture,
    }
    if(this.state.profile_picture){
      request.profile_picture = this.state.profile_picture
    }
    this.props.updateClient(this.props.client_id,request);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleImageChange(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        profile_picture: reader.result
      })
    }
    reader.readAsDataURL(file);

  }

  render(){
    let owner = this.props.user.type === 'client' && this.props.user.id === this.state.client_id;
    if(!owner){
      return <div>No deberías estar acá</div>
    }
    return (
      <Container>
        <div style={{ opacity: this.state.loading ? 0.5 : 1 }}>
          <AvForm disabled={this.state.loading} onValidSubmit={this.handleSubmit}>
          <AvGroup>
            <Label for="profile_picture">Foto de perfil</Label>
            <AvInput type="file" accept="image/*" name="profile_picture" id="profile_picture"
             onChange={this.handleImageChange.bind(this)} />
          </AvGroup>
          <FormGroup>
            <Button>Guardar</Button>
          </FormGroup>
        </AvForm>
        </div>
      </Container>
     )
  }

}

function mapStateToProps(state){
  return {
    update_client: state.update_client,
    client: state.client,
    user:state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateClient: updateClient,
    getClient: getClient
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientEdit);
