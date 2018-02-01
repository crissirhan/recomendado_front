import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("asd")
    return(
      <section style={{background: "url("+require('../custom/img/404.jpg')+")"}} class="error404 d-flex align-items-center">
        <div class="container">
          <h1 class="mb-5">Ups, la página no está acá.</h1>
          <p class="text-hero mb-5">
            No se ha encontrado la página que buscas.
          </p>
          <p><Link to={'/'} class="btn btn-outline-white"> <i class="fa fa-home mr-2"></i>Volver al inicio</Link></p>
        </div>
      </section>
    )
  }
}

export default NotFound
