import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAnnouncements from '../actions/get_announcements';
import putService from '../actions/put_service';
import { bindActionCreators } from 'redux';
import SearchInput, {createFilter} from 'react-search-input';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { withRouter } from 'react-router-dom';
import {
  Link,
  Redirect
} from 'react-router-dom';
import cookie from 'react-cookies';
import { Button } from 'reactstrap';
import SearchBar from 'material-ui-search-bar'
import { updateSearchParams } from '../actions/search'


class SearchAnnouncements extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.search !== this.props.search && this.state.requestSearch){
      this.props.getAnnouncements(nextProps.search);
      this.setState({
        requestSearch:false
      })
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      requestSearch:false
    };
    this.searchUpdated = this.searchUpdated.bind(this);
    this.requestSearch = this.requestSearch.bind(this);
  }

  toAnnouncements(){
    if(this.props.announcements[0]){
      return this.props.announcements[0].id;
    } else{
      return null;
    }
  }

  dayRenderer(props){
    if(!props.value){
      return '';
    }
    var days=props.value.split(',');
    return (days.map(day => <span key={day.toString()}>{day} </span>));
  }

  render(){

    return (
        <SearchBar
          onChange={this.searchUpdated}
          onRequestSearch={this.requestSearch}
          hintText="Buscar"
          style={{
            margin: '0 auto',
            maxWidth: 800,
            minWidth: 700
          }}
        />
     )
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  requestSearch(){
    this.setState({
      requestSearch:true
    }, () => {
      this.props.updateSearchParams({search:this.state.searchTerm, visible:true})
      this.props.history.push('/buscar/anuncios/')
    })

    //return <Redirect push to={'/buscar/anuncios/'+this.state.searchTerm}/>
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
    putService:putService,
    updateSearchParams:updateSearchParams
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchAnnouncements));
