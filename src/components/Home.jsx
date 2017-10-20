import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchAnnouncements from './SearchAnnouncements';
import JobCategories from './JobCategories';
import ProfessionalThumbs from './ProfessionalThumbs';
import {
  Container,
  Jumbotron
} from 'reactstrap';
import './css/text.css';

class Home extends Component {

  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <div  style={{textAlign:"center"}}>
          <h5 className="title"><b>Busca un Recomendado para tu hogar</b></h5>
        </div>
        <SearchAnnouncements/>
        <div className="sub-title" style={{marginTop:"100px", textAlign:"center"}}><i><b>Explora las distintas categorías y servicios disponibles para tí</b></i></div>
        <JobCategories/>

        <div  className="sub-title" style={{marginTop:"100px", textAlign:"center"}}><b>Recomendados Recientes</b></div>
        <div  className="sub-sub-title" style={{textAlign:"center"}}><i>Qué están diciendo los clientes de sus trabajadores</i></div>

        <ProfessionalThumbs/>

      </Container>
    );
  }
}
function mapStateToProps(state){
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
