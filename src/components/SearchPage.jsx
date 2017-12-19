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
import ListAnnouncementsDummy from './ListAnnouncementsDummy';
import './css/images.css';
import './css/col.css';
import './css/box.css';
import './css/pagination.css';
import { updateSearchParams } from '../actions/search'
import Pagination from "react-js-pagination";
import AdvancedFilter from './AdvancedFilter'
import AnnouncementCardGroup from './AnnouncementCardGroup'
import './css/loading.css'

class SearchPage extends Component {

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
    if(this.props.announcements.error ){
      return <Container className="container"><div style={{textAlign:"center"}}> <div>¡Error! {this.state.error_types.join(' ')}</div><SearchAnnouncements/></div></Container>;
    }
    if(this.props.announcements.result.length === 0 && this.props.announcements.success){
      return <Container><div style={{textAlign:"center"}}> <div>No se encontraron resultados </div><SearchAnnouncements/></div><Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Búsqueda avanzada</Button>
      <Collapse isOpen={this.state.collapse}>
        <AdvancedFilter/>
      </Collapse></Container>;
    }

    return (
      <div class="container">

        <div class="row">

          <div class="col-lg-3">

            <AdvancedFilter/>

          </div>

          <div class="col-lg-9">

            {this.props.announcements.success && this.props.announcements.result.length > 0 ?
                <AnnouncementCardGroup
                  announcements={this.props.announcements.result}
                  pagination={this.props.announcements.pagination}
                  handlePageChange={this.handlePageChange.bind(this)}
                /> :
              <div>No se encontraron resultados</div>}

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
