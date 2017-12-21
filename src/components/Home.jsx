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
import { Link,} from 'react-router-dom';

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
      <div>
        <header class="masthead">
          <div class="container">
            <div class="intro-text">
              <div class="intro-lead-in">¿Buscas alguien que te pueda hacer un trabajo?</div>
              <div class="intro-heading text-uppercase">Busca un Recomendado</div>
              <SearchAnnouncements/>
            </div>
          </div>
        </header>

        <section class="" id="portfolio">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center">
                <h2 class="section-heading text-uppercase">Categorías</h2>
                <h3 class="section-subheading text-muted">Explora las distintas categorías y servicios disponibles para tí</h3>
              </div>
            </div>
            <JobCategories/>
          </div>
        </section>

        <section class="bg-light" id="recomendados">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center">
                <h2 class="section-heading text-uppercase">Recomendados Recientes</h2>
                <h3 class="section-subheading text-muted">Lo que dicen los clientes de sus trabajadores</h3>
              </div>
            </div>
            <ProfessionalThumbs/>
            <div class="row">
              <div class="col-lg-8 mx-auto text-center">
                <p class="large text-muted">¿Quieres unirte? <Link to={'/registro/'}>Registrate</Link> y publica tus trabajos con nosotros</p>
              </div>
            </div>
          </div>
        </section>



      </div>
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
