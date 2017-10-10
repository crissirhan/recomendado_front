import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfessionalThumb from './ProfessionalThumb';
import {
  CardGroup,
} from 'reactstrap';
import getProfessionals from '../actions/get_professionals';

class ProfessionalThumbs extends Component {

  componentDidMount() {
    this.props.getProfessionals();
  }

  constructor(props) {
    super(props);
    this.state = {
      professionals:[]
    };
  }

  render() {
    let random_professionals = this.props.professionals.sort(() => .5 - Math.random()).slice(0,3);
    console.log(random_professionals);
    let professionals_cards = random_professionals.map(professional =>
      <ProfessionalThumb professional={professional} professional_id={professional.id} key={professional.id.toString()}/>
    );
    console.log(professionals_cards);
    return (
      <CardGroup>
        {professionals_cards}
      </CardGroup>
    );
  }
}
function mapStateToProps(state){
  return {
    professionals:state.professionals
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProfessionals:getProfessionals
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalThumbs);
