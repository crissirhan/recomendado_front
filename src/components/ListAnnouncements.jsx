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
      if(nextProps.announcements != this.props.announcements){
        if(this.props.announcements.success !== nextProps.announcements.success){
          this.setState({
            success:nextProps.announcements.success
          })
        }
        if(this.props.announcements.error !== nextProps.announcements.error){
          this.setState({
            error:nextProps.announcements.error
          })
        }
        if(this.props.announcements.loading !== nextProps.announcements.loading){
          this.setState({
            loading:nextProps.announcements.loading
          })
        }
        if(nextProps.announcements.result){
          this.setState({
            announcements: nextProps.announcements.result
          })
        }
      }

      if(this.props.search !== nextProps.search){
        this.props.getAnnouncements(null,nextProps.search);
      }
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      announcements:[],
      loading: true,
      error: false,
      success: false
    };
  }

  render() {
    console.log(this.state)
    if(this.state.loading){
      return <Container><div style={{textAlign:"center"}}> <div>Cargando</div><SearchAnnouncements/></div></Container>;
    }
    if(this.state.announcements.length === 0 ){
      return <Container><div style={{textAlign:"center"}}> <div>No se encontraron resultados </div><SearchAnnouncements/></div></Container>;
    }
    return (
      <Container>
        <h1>Búsqueda de avisos</h1>
        <p>Busca avisos por nombre, categorias y profesionales.</p>
        <SearchAnnouncements/>

        <ListAnnouncementsDummy image_class="center-cropped search-thumbnail" announcements_array={this.state.announcements.filter(announcement => announcement.visible)}/>
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
