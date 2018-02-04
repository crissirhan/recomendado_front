import React, { Component } from 'react';
import {
  Link,withRouter
} from 'react-router-dom';

class TopBar extends Component {


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  render() {

    return (
      <nav class="navbar navbar-expand-lg">
        <div class="container"><Link to="/" class="navbar-brand"><img src={require('../../custom/img/logo.png')} alt="..."/></Link>
          <button type="button" data-toggle="collapse" data-target="#navbarcollapse" aria-controls="navbarcollapse" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span>Menu</span><i class="fa fa-bars"></i></button>
          <div id="navbarcollapse" class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item"><Link to="/" class="nav-link active">Inicio</Link>
              </li>
              <li class="nav-item"><Link to ="/buscar/avisos/" class="nav-link">Buscar avisos</Link>
              </li>
            </ul><Link to="/crear/aviso/" class="btn navbar-btn btn-outline-primary mt-3 mt-lg-0 ml-lg-3">Publica un aviso</Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default TopBar;
