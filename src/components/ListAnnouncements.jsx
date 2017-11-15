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
import './css/pagination.css';
import { updateSearchParams } from '../actions/search'
import Pagination from "react-js-pagination";

class ListAnnouncements extends Component {

  componentDidMount(){
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      if(nextProps.announcements != this.props.announcements && false){
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
        if(nextProps.announcements.result !== this.props.announcements.result){
          console.log(nextProps.announcements.result)
          this.setState({
            announcements: nextProps.announcements.result
          })
        }
        if(nextProps.announcements.pagination !== this.props.announcements.pagination){
          this.setState({
            pagination: nextProps.announcements.pagination
          })
        }
      }
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      announcements:[],
      loading: true,
      error: false,
      success: false,
      pagination:{},
      params:{search:this.props.search}
    };
  }

  handlePageChange(pageNumber){
    //this.setState({params})
    this.props.updateSearchParams({page:pageNumber});
  };

  render() {
    console.log(this.props)
    if(this.props.announcements.loading ){
      return <Container><div style={{textAlign:"center"}}> <div>Cargando</div><SearchAnnouncements/></div></Container>;
    }
    if(this.props.announcements.error ){
      return <Container><div style={{textAlign:"center"}}> <div>¡Error! {this.state.error_type}</div><SearchAnnouncements/></div></Container>;
    }
    if(this.props.announcements.result.length === 0 ){
      return <Container><div style={{textAlign:"center"}}> <div>No se encontraron resultados </div><SearchAnnouncements/></div></Container>;
    }
    return (
      <Container>
        <h1>Búsqueda de avisos</h1>
        <p>Busca avisos por nombre, categorias y profesionales.</p>
        <SearchAnnouncements/>

        <ListAnnouncementsDummy
          image_class="center-cropped search-thumbnail"
          announcements_array={this.props.announcements.result.filter(announcement => announcement.visible)}
        />
        <Pagination
          activePage={this.props.announcements.pagination.current}
          itemsCountPerPage={this.props.announcements.pagination.countItemsOnPage}
          totalItemsCount={this.props.announcements.pagination.totalElements}
          hideDisabled={true}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </Container>
    );
  }
}

function mapStateToProps(state){
  return {
    announcements: state.announcements,
    search: state.search
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncements: getAnnouncements,
    updateSearchParams:updateSearchParams
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAnnouncements));
