import React, { Component } from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if(true){
      return null;
    }
    return(
      <footer class="py-5 bg-dark footer" style={{paddingTop:150}}>
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
