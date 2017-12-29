import React, { Component } from 'react';
import './css/heroic-features.css'

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <footer class="py-5 bg-dark footer">
        <div class="container">
          <p class="m-0 text-center text-white">Recomendado 2017</p>
          <p class="m-0 text-center text-white">+56993226789</p>
          <p class="m-0 text-center text-white">contacto@recomendado.cl</p>
        </div>
      </footer>
    )
  }
}

export default Footer
