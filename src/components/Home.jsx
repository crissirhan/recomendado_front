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
    let bgimg = require('../custom/img/hero-bg.jpg')
    let sbg = require('../custom/img/separator-bg.jpg')
    return (
      <div>
        <section style={{background: "url("+bgimg+")"}} class="hero d-flex align-items-center">
          <div class="container">
            <p class="small-text-hero"><i class="icon-localizer text-primary mr-1"></i>¿Buscas alguien que te pueda hacer un trabajo?</p>
            <h1>Busca un <span class="text-primary">Recomendado</span></h1>
            <SearchAnnouncements/>
          </div>
        </section>

        <section class="latest-listings bg-gray">
          <div class="container">
            <header>
              <h2 class="has-lines">CATEGORÍAS</h2>
              <p class="lead">Explora las distintas categorías y servicios disponibles para tí</p>
            </header>
            <JobCategories/>
          </div>
        </section>

        <section style={{background: 'url('+sbg+')'}} class="divider">
          <div class="container">
            <h2 class="has-lines"><small class="text-primary">¿Quieres trabajar con nosotros? </small> Publica tu aviso</h2>
            <p class="lead">Explora las distintas categorias y opciones para publicar tu aviso</p>
            <Link to="/crear/anuncio/" class="btn btn-primary has-shadow has-wide-padding">Publica tu aviso</Link>
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
