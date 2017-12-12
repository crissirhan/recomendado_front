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



const KEYS_TO_FILTERS = ['professional.id', 'job.job_type'];

class SearchAnnouncements extends Component {


  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
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

  handleService(announcement){
    if(cookie.load('user').user){
      let data = {
        client_id:cookie.load('user').id,
        announcement_id:announcement.id
      }
      console.log(data);
      this.props.putService(data);
    }else{
      console.log("Error putService");
    }
  }

  actionRenderer(props){
    if(cookie.load('isClient') == "true"){
      return <Button key={props.value.id} onClick={() => this.handleService(props.value)}>Contratar</Button>
    }
    return '';
  }

  render(){

    return (
        <SearchBar
          onChange={this.searchUpdated}
          onRequestSearch={this.requestSearch}
          style={{
            margin: '0 auto',
            maxWidth: 800
          }}
        />
     )
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  requestSearch(){
    console.log("Buscar: " + this.state.searchTerm)
    this.props.history.push('/buscar/avisos/'+this.state.searchTerm);
    //return <Redirect push to={'/buscar/avisos/'+this.state.searchTerm}/>
  }

}

function mapStateToProps(state){
  return {
    announcements: state.announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncements: getAnnouncements,
    putService:putService
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchAnnouncements));
