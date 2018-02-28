import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SubJobCategories from './SubJobCategories';
import ReactTable from 'react-table';
import {
  Link,
} from 'react-router-dom';
import { Container, Col } from 'reactstrap';
import getJobByName from '../actions/get_job_sub_category_by_name';
import ListAnnouncementsDummy from './ListAnnouncementsDummy';
import getAnnouncementsByJob from '../actions/get_announcements_by_job';
import getAnnouncements from '../actions/get_announcements';
import AnnouncementListGroup from './AnnouncementListGroup'
import './css/loading.css'

class SubCategoryPage extends Component {

  componentDidMount(){
    this.props.getJobByName(this.props.sub_category);
    this.props.getAnnouncements({job:this.props.sub_category,visible:true})
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      if(nextProps.job_by_name !== this.props.job_by_name){
        if(this.props.job_by_name.success !== nextProps.job_by_name.success){
          this.setState({
            success:nextProps.job_by_name.success
          })
        }
        if(this.props.job_by_name.error !== nextProps.job_by_name.error){
          this.setState({
            error:nextProps.job_by_name.error
          })
        }
        if(this.props.job_by_name.loading !== nextProps.job_by_name.loading){
          this.setState({
            loading:nextProps.job_by_name.loading
          })
        }
        if(nextProps.job_by_name.result){
          this.setState({
            job: nextProps.job_by_name.result
          })
        }
      }
      if(nextProps.announcements !== this.props.announcements){
        this.setState({
          announcements_by_job:nextProps.announcements_by_job
        })
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      job: null,
      loading: false,
      success: false,
      error: false,
      announcements_by_job:[]
    };
  }

  handlePageChange(pageNumber){
    let new_query = Object.assign({}, this.props.announcements.params, {page:pageNumber})
    this.props.getAnnouncements(new_query)
  };

  render(){
    if(this.state.loading){
      return <Container><div class="loader"></div></Container>
    }
    if(this.state.error){
      return <Container>Ha ocurrido un error</Container>
    }
    if(!this.state.job){
      return <Container>Ha ocurrido un error</Container>
    }

    return (
      <div class="container-fluid">
        <header>
          <h2 class="has-lines">{this.state.job.job_sub_type}</h2>
          <p class="lead">{this.state.job ? this.state.job.description : ""}</p>
        </header>
        <AnnouncementListGroup
          announcements={this.props.announcements.result}
          pagination={this.props.announcements.pagination}
          handlePageChange={this.handlePageChange.bind(this)}
        />

      </div>
     )
  }
}


function mapStateToProps(state){
  return {
    job_by_name:state.job_by_name,
    announcements_by_job: state.announcements_by_job,
    announcements:state.announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getJobByName:getJobByName,
    getAnnouncementsByJob:getAnnouncementsByJob,
    getAnnouncements:getAnnouncements
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryPage);
