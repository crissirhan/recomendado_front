import React, { Component } from 'react';
import {
  Link,withRouter
} from 'react-router-dom';
import { getUserUrl } from '../../actions/user_actions'
import MustLogIn from '../MustLogIn'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import SearchAnnouncements from '../SearchAnnouncements';
import '../css/navbar/navbar.css'

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
    return (
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid"><Link to="/" class="navbar-brand"><img src={require('../../custom/img/Logo R.png')} alt="..."/></Link>
          <div class="show-large half-size">
            {this.props.location.pathname !== '/' && <SearchAnnouncements/>}
          </div>
          <div class="row">
            <button type="button" data-toggle="collapse" data-target="#navbarcollapse" aria-controls="navbarcollapse" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span>Menu</span><i class="fa fa-bars"></i></button>
            <div id="navbarcollapse" class="collapse navbar-collapse">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item"><Link to="/" class="nav-link ">Inicio</Link>
                </li>
                {this.props.user.loggedIn ? <li class="nav-item"><Link to={this.props.user.url} class="nav-link">Perfil</Link>
                </li> : <li class="nav-item"><Link to={'/login/'} class="nav-link">Login</Link>
                </li>}
              </ul><Link to="/crear/aviso/" class="btn navbar-btn btn-outline-primary mt-3 mt-lg-0 ml-lg-3">Publica un aviso</Link>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
