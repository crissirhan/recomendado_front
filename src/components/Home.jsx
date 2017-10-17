import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchAnnouncements from './SearchAnnouncements';
import JobCategories from './JobCategories';
import ProfessionalThumbs from './ProfessionalThumbs';
import {
  Container,
  Jumbotron
} from 'reactstrap';

class Home extends Component {

  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Quisque rutrum. Aenean imperdiet.</p>
        <SearchAnnouncements/>

        <JobCategories/>

        <ProfessionalThumbs/>

      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
