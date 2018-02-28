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
import getJobCategories from '../actions/get_job_categories';
import getJobSubCategories from '../actions/get_job_sub_categories';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import $ from 'jquery'
import SelectCategories from './SelectCategories'

class SearchAnnouncements extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.search !== this.props.search && this.state.requestSearch){
      this.props.getAnnouncements(nextProps.search);
      this.setState({
        requestSearch:false},
        () => {this.props.history.push('/buscar/avisos/')}
      )
    }

    if(nextProps.job_categories !== this.props.job_categories){
      this.setState({job_categories:nextProps.job_categories})
    }
    if(nextProps.job_sub_categories !== this.props.job_sub_categories){
      this.setState({job_sub_categories:nextProps.job_sub_categories})
    }
  }

  componentDidMount(){
    this.props.getJobCategories();
    this.props.getJobSubCategories();
  }
  componentDidUpdate(){
  }
  componentWillMount(){

  }

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      job_tag:'',
      requestSearch:false,
      job_sub_categories:null,
      job_categories:null
    };
    this.searchUpdated = this.searchUpdated.bind(this);
    this.requestSearch = this.requestSearch.bind(this);
  }





  render(){
    return (
        <div class="search-bar">
            <form onSubmit={this.requestSearch}>
              <div class="row">
                <div class="form-group col-lg-7">
                  <input type="search" name="search" value={this.props.search.searchParams.search} placeholder="¿Qué estás buscando?" onChange={this.searchUpdated}/>
                </div>
                <div class="form-group col-lg-3">
                  <SelectCategories
                    job_categories={this.state.job_categories}
                    job_sub_categories={this.state.job_sub_categories}
                    tagChange={this.tagChange.bind(this)}
                  />
                </div>
                <div class="form-group col-lg-2">
                  <input onClick={this.requestSearch.bind(this)} value="&#xf002;" style={{fontFamily:"FontAwesome", textAlign:"center"}} class="submit"/>
                </div>
              </div>
            </form>
          </div>
     )
  }

  searchUpdated (term) {
    this.setState({searchTerm: term.target.value},
    () => this.props.updateSearchParams({search:this.state.searchTerm, job:this.state.job_tag, visible:true, page_size:6}))

  }

  tagChange(tag){
    this.setState({job_tag:tag.target.value},
    () => this.props.updateSearchParams({search:this.state.searchTerm, job:this.state.job_tag, visible:true, page_size:6}))
  }
  requestSearch(){
    this.props.getAnnouncements(this.props.search.searchParams)
    if(this.props.location.pathname !== '/buscar/avisos/'){
      this.props.history.push('/buscar/avisos/')
    }
    //return <Redirect push to={'/buscar/avisos/'+this.state.searchTerm}/>
  }

}

function mapStateToProps(state){
  return {
    announcements: state.announcements,
    job_categories: state.job_categories,
    job_sub_categories:state.job_sub_categories,
    search: state.search
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncements: getAnnouncements,
    putService:putService,
    updateSearchParams:updateSearchParams,
    getJobCategories:getJobCategories,
    getJobSubCategories:getJobSubCategories
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchAnnouncements));
