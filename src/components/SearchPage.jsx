import React, { Component } from 'react';
import { Table, ListGroup, ListGroupItem, Input, Label, Container, Button, Collapse } from 'reactstrap';
import CategoryPage from './CategoryPage';
import getAnnouncements from '../actions/get_announcements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Link,
  withRouter
} from 'react-router-dom';
import SearchAnnouncements from './SearchAnnouncements';
import './css/images.css';
import './css/col.css';
import './css/box.css';
import './css/pagination.css';
import { updateSearchParams } from '../actions/search'
import Pagination from "react-js-pagination";
import AdvancedFilter from './AdvancedFilter'
import AnnouncementCardGroup from './AnnouncementCardGroup'
import AnnouncementListGroup from './AnnouncementListGroup'
import './css/loading.css'

class SearchPage extends Component {

  componentDidMount(){
    if(!this.props.announcements.loading && this.props.announcements.result.length === 0){
      this.props.getAnnouncements(this.props.search.searchParams)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      console.log('hola')
    }
    if(this.props != nextProps) {
      if(nextProps.announcements != this.props.announcements && false){
        if(this.props.announcements.success !== nextProps.announcements.success){
          this.setState({
            success:nextProps.announcements.success
          })
        }
        if(this.props.announcements.error !== nextProps.announcements.error){
          this.setState({
            error:nextProps.announcements.error,
            error_types:nextProps.announcements.error_types
          })
        }
        if(this.props.announcements.loading !== nextProps.announcements.loading){
          this.setState({
            loading:nextProps.announcements.loading
          })
        }
        if(nextProps.announcements.result !== this.props.announcements.result){
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
      collapse: false,
      error_types:[]
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }


  handlePageChange(pageNumber){
    let new_query = Object.assign({}, this.props.announcements.params, {page:pageNumber})
    this.props.getAnnouncements(new_query)
  }

  handleOrderingChange(new_order){
    let new_query = Object.assign({}, this.props.announcements.params, {ordering:new_order.value})
    this.props.getAnnouncements(new_query)
  }

  render() {
    return (
      <div class="" style={{padding:30}}>

        <div class="row">

          <div class="col-lg-2">
            <div class="container-fluid">
              <AdvancedFilter/>
            </div>
          </div>

          <div class="col-lg-10">

            {this.props.announcements.loading ?  <div class="container-fluid"><div class="loader"></div></div> : this.props.announcements.success && this.props.announcements.result.length > 0 ?
                <AnnouncementListGroup
                  announcements={this.props.announcements.result}
                  pagination={this.props.announcements.pagination}
                  handlePageChange={this.handlePageChange.bind(this)}
                  showExpireDate={false}
                /> :
              <div>Nada que mostrar. Prueba buscando con otros parámetros.</div>}

          </div>

        </div>

      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
