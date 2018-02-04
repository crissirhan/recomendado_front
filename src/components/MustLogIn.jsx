import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

class MustLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <section style={{background: "url("+require('../custom/img/404.jpg')+")"}} class="error404 d-flex align-items-center">
        <div class="container">
          <h1 class="mb-5">{cookie.load('user') ? 'Está página es para otro tipo de usuario' : <div>Tienes que estar <Link class="btn-link" to='/login'>logeado</Link> para estar acá</div>}</h1>
          <p class="text-hero mb-5">
            {cookie.load('user') ? <div>Tienes que iniciar sesión como {cookie.load('isClient') ? 'Profesional' : 'Cliente'} para estar aca</div> :
          <div>Tienes que hacer <Link class="btn-link" to='/login'>login</Link> para estar acá</div>}
          </p>
          <p><Link to={'/'} class="btn btn-outline-white"> <i class="fa fa-home mr-2"></i>Volver al inicio</Link></p>
        </div>
      </section>
    )
  }
}

export default MustLogIn
