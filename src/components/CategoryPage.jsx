import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SubJobCategories from './SubJobCategories';
import ReactTable from 'react-table';
import {
  Link,
} from 'react-router-dom';
import { Container, Col } from 'reactstrap';


class CategoryPage extends Component {


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return (
      <Container>
        <SubJobCategories job={this.props.category}/>
      </Container>
     )
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
