import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchAnnouncements from './SearchAnnouncements';
import JobCategories from './JobCategories';
import ProfessionalThumbs from './ProfessionalThumbs';
import ProfileNameEdit from './ProfileNameEdit'
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
            <p class="small-text-hero"><i class="icon-localizer text-primary mr-1"></i>¿Buscas a alguien con buenas recomendaciones para que te haga un trabajo?</p>
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
            <Link to="/crear/aviso/" class="btn btn-primary has-shadow has-wide-padding">Publica tu aviso</Link>
          </div>
        </section>

        <section class="blog">
          <div class="container">
            <header>
              <h2 class="has-lines"><small>Que dicen clientes</small> Sobre nuestros <span class="text-primary">Recomendados</span> recientes</h2>
              <p class="lead">Últimos comentarios</p>
            </header>
            <ProfessionalThumbs/>
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
