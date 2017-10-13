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

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps){
      this.setState({
        professionals:nextProps.professionals,
        random_professionals: nextProps.professionals.sort(() => .5 - Math.random()).slice(0,3)
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      professionals:[],
      random_professionals:[]
    };
  }

  render() {
    let professionals_cards = this.state.random_professionals.map(professional =>
      <ProfessionalThumb professional={professional} professional_id={professional.id} key={professional.id.toString()}/>
    );
    console.log(professionals_cards);
    return (
      <CardGroup>
        {this.state.random_professionals.map(professional =>
          <ProfessionalThumb professional={professional} professional_id={professional.id} key={professional.id.toString()}/>
        )}
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
