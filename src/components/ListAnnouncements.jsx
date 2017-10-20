import React, { Component } from 'react';
import { Table, ListGroup, ListGroupItem, Input, Label, Container } from 'reactstrap';
import CategoryPage from './CategoryPage';
import getAnnouncements from '../actions/get_announcements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Link,
  withRouter
} from 'react-router-dom';
import SearchAnnouncements from './SearchAnnouncements';
import ListAnnouncementsDummy from './ListAnnouncementsDummy';
import './css/images.css';
import './css/col.css';
import './css/box.css';

class ListAnnouncements extends Component {

  componentDidMount(){
    this.props.getAnnouncements(null,this.props.search);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        announcements:nextProps.announcements
      });
      if(this.props.search !== nextProps.search){
        this.props.getAnnouncements(null,nextProps.search);
      }
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      announcements:[]
    };
  }

  render() {
      if(this.state.announcements.length === 0 ){
        return <Container><div style={{textAlign:"center"}}> <div>No se encontraron resultados </div><SearchAnnouncements/></div></Container>;
      }
    return (
      <Container>
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Quisque rutrum. Aenean imperdiet.</p>
        <SearchAnnouncements/>

        <ListAnnouncementsDummy image_class="center-cropped search-thumbnail" announcements_array={this.state.announcements}/>
      </Container>
    );
  }
}

function mapStateToProps(state){
  return {
    announcements: state.announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncements: getAnnouncements
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAnnouncements));
