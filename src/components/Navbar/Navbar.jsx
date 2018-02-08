import React, { Component } from 'react';
import {
  Link,withRouter
} from 'react-router-dom';
import { getUserUrl } from '../../actions/user_actions'
import MustLogIn from '../MustLogIn'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class NavBar extends Component {

  componentWillMount(){
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }


  render() {
    console.log(this.props.user.url)
    return (
      <nav class="navbar navbar-expand-lg">
        <div class="container"><Link to="/" class="navbar-brand"><img src={require('../../custom/img/logo.png')} alt="..."/></Link>
          <button type="button" data-toggle="collapse" data-target="#navbarcollapse" aria-controls="navbarcollapse" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span>Menu</span><i class="fa fa-bars"></i></button>
          <div id="navbarcollapse" class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item"><Link to="/" class="nav-link ">Inicio</Link>
              </li>
              <li class="nav-item"><Link to ="/buscar/avisos/" class="nav-link">Buscar avisos</Link>
              </li>
              <li class="nav-item"><Link to={this.props.user.url} class="nav-link">Perfil</Link>
              </li>
            </ul><Link to="/crear/aviso/" class="btn navbar-btn btn-outline-primary mt-3 mt-lg-0 ml-lg-3">Publica un aviso</Link>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return {
    user:state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserUrl:getUserUrl
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
