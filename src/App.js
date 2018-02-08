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
import TopBar from './components/Navbar/TopBar';
import Navbar from './components/Navbar/Navbar';
import SignUpForm from './components/Navbar/SignUpForm';
import login from './actions/login_user';
import LoginForm from './components/Navbar/LoginForm';
import AnnouncementsList from './components/AnnouncementEdition/AnnouncementsList';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import SubCategoryPage from './components/SubCategoryPage';
import ProfessionalPage from './components/ProfessionalPage';
import ClientPage from './components/ClientPage';
import AnnouncementForm from './components/AnnouncementForm';
import ListAnnouncements from './components/ListAnnouncements';
import SearchPage from './components/SearchPage';
import AnnouncementPage from './components/AnnouncementPage';
import ServicePage from './components/ServicePage'
import {
  Route,
  Link,
  withRouter,
  Switch,
  Redirect
} from 'react-router-dom';
import AnnouncementsEdit from './components/AnnouncementEdition/AnnouncementsEdit';
import ProfessionalEdit from './components/ProfessionalEdit';
import ClientEdit from './components/ClientEdit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import cookie from 'react-cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ErrorBoundary from './components/ErrorBoundary'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import MustLogIn from './components/MustLogIn'
import { loadUserFromCookies } from './actions/user_actions'

class App extends Component {

  componentWillMount(){
    if(!this.state.cookieLoaded){
      this.props.loadUserFromCookies()
    }
    this.setState({cookieLoaded:true})
  }

  loadCustomScript(scriptName, path){
    this.state.scripts[scriptName] = document.createElement(scriptName)
    this.state.scripts[scriptName].src = path
    this.state.scripts[scriptName].async = true
    document.body.appendChild(this.state.scripts[scriptName])
    console.log(this.state.scripts[scriptName].src)
    console.log(this.state.scripts)
  }

  constructor(props) {
    super(props);
    this.state = {
      scripts:{},
      cookieLoaded:false
    };
  }

  requireClient(nextState, replace) {
      if(cookie.load('isClient') !== "true") {
        replace({
          pathname: '/login'
        })
      }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <ErrorBoundary>
            <TopBar/>
          </ErrorBoundary>
          <ErrorBoundary>
            <Navbar/>
          </ErrorBoundary>
          <ErrorBoundary >
            <div class="body" >
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path="/categorias/:categoria/" render={({ match }) => (
                  <CategoryPage category={match.params.categoria}/>
                )} />
                <Route path="/categorias/:categoria/:sub_categoria" render={({ match }) => (
                  <SubCategoryPage sub_category={match.params.sub_categoria}/>
                )} />
                <Route path="/profesionales/:id/" render={({ match }) => (
                  <ProfessionalPage professional_id={match.params.id}/>
                )} />
                <Route path="/avisos/:id/" render={({ match }) => (
                  <AnnouncementPage announcement_id={match.params.id}/>
                )} />
                <Route path="/contratar/aviso/:id/" render={({ match }) => (
                  cookie.load('isClient') === "true" ? <ServicePage announcement_id={match.params.id}/> :
                  <Redirect to="/login/"/>
                )}/>
                <Route path="/clientes/:id/" render={({ match }) => (
                  <ClientPage client_id={match.params.id}/>
                )} />
                <Route path="/registro/" render={({ match }) => (
                  <Container><SignUpForm /></Container>
                )} />
                <Route path="/login/" render={({ match }) => (
                  <Container><LoginForm /></Container>
                )} />
                <Route exact path="/buscar/avisos/" render={({ match }) => (
                  <SearchPage/>
                )} />
                <Route path="/crear/aviso/" render={({ match }) => (
                  <AnnouncementForm/>
                )} />
                <Route path="/editar/aviso/:id/" render={({ match }) => (
                  <AnnouncementsEdit announcement_id={match.params.id}/>
                )} />
                <Route path="/editar/profesional/:id/" render={({ match }) => (
                  <ProfessionalEdit professional_id={match.params.id}/>
                )} />
                <Route path="/editar/cliente/:id/" render={({ match }) => (
                  <ClientEdit client_id={match.params.id}/>
                )} />
                <Route path='/denegado' component={MustLogIn}/>
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </ErrorBoundary>
          <ErrorBoundary>
            <Footer/>
          </ErrorBoundary>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state){
  return {
    token:state.token,
    user:state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login:login,
    loadUserFromCookies:loadUserFromCookies
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

//export default App;
