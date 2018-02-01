import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if(false){
      return null;
    }
    return(
      <footer class="main-footer">
        <div class="container">
          <div class="row">
            <div class="about col-md-4">
              <div class="logo"><img src={require('../custom/img/logo-footer.png')} alt="..."/></div>
              <p>Recomendado 2018</p>
            </div>
            <div class="site-links col-md-4">
              <h3>Links útiles</h3>
              <div class="menus d-flex">
                <ul class="list-unstyled">
                  <li> <Link to={'/'}>inicio</Link></li>
                  <li> <Link to={'/buscar/avisos'}>Buscar aviso</Link></li>
                  <li> <Link to={'/crear/anuncio'}>Crear aviso</Link></li>
                </ul>
                <ul class="list-unstyled">
                  <li> <Link to={'/contactar'}>Contactar</Link></li>
                  <li> <Link to={'/precios'}>Precios </Link><span class="badge badge-secondary text-uppercase ml-1">Pronto</span></li>
                </ul>
              </div>
            </div>
            <div class="contact col-md-4">
              <h3>Contáctanos</h3>
              <div class="info">
                <p>Teléfono: +56 9 93226789</p>
                <p>Email: <a href="mailto:contacto@recomendado.cl">contacto@recomendado.cl</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="copyrights text-center">
          <p>&copy; 2018 <span class="text-primary">Recomendado.</span> </p>
        </div>
      </footer>
    )
  }
}

export default Footer
