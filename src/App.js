import React, { Component } from 'react';
import {
  Collapse,
  Container,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { signUp } from './services/UserServices';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import ProjectNavbar from './components/Navbar/ProjectNavbar';
import login from './actions/login_user';
import AnnouncementsList from './components/AnnouncementEdition/AnnouncementsList';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import ProfessionalPage from './components/ProfessionalPage';
import {
  Route,
  Link,
  withRouter,
  Switch
} from 'react-router-dom';
import AnnouncementsEdit from './components/AnnouncementEdition/AnnouncementsEdit';

class App extends Component {
  componentDidMount() {
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(process.env);
    return (
      <div>
        <ProjectNavbar/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/categorias/:id/:categoria" render={({ match }) => (
            <CategoryPage category={match.params.categoria} category_id={match.params.id}/>
          )} />
          <Route path="/profesionales/:id/" render={({ match }) => (
            <ProfessionalPage professional_id={match.params.id}/>
          )} />
          <Route path="/anuncios/:id/" render={({ match }) => (
            <AnnouncementsEdit professional_id={match.params.id}/>
          )} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    token:state.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login:login
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

//export default App;
