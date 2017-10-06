import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getProfessional from '../actions/get_professional';
import { Input, Form, FormGroup, Label,Button } from 'reactstrap';
import {
  Container,
} from 'reactstrap';

class ProfessionalPage extends Component {

  componentDidMount() {
    this.props.getProfessional(this.props.professional_id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        username: nextProps.professional.username
      });
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      editMode:false,
      username:'',
      professional:props.professional
    };
     this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });

  }

  editMode(){
    this.setState({
      editMode: !this.state.editMode
    });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <Container>
        <Button onClick={() => {this.editMode()} }>Editar</Button>
        <Form >
          <FormGroup >
            <Label for="exampleEmail">ASD</Label>
            <Input readOnly={!this.state.editMode} name="username" id="exampleEmail"
            value={this.state.username} onChange={this.handleInputChange}/>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
function mapStateToProps(state){
  return {
    professional: state.professional
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProfessional: getProfessional
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalPage);
