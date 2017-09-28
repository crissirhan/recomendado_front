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
import SearchAnnouncements from './components/SearchAnnouncements';
import JobCategories from './components/JobCategories';
import ProfessionalThumb from './components/ProfessionalThumb';
import ProjectNavbar from './components/Navbar/ProjectNavbar';

class App extends Component {
  componentDidMount() {
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <ProjectNavbar/>
        <Container>
          <Jumbotron>

            <Container>
              <SearchAnnouncements/>
            </Container>
            
          </Jumbotron>

          <JobCategories/>

          <ProfessionalThumb professional_id={1} />

        </Container>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

//export default App;
