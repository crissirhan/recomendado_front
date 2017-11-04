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


class SubCategoryPage extends Component {

  componentDidMount(){
    this.props.getJobByName(this.props.sub_category);
    this.props.getAnnouncementsByJob(this.props.sub_category,null)
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
      if(nextProps.announcements_by_job !== this.props.announcements_by_job){
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

  render(){
    console.log(this.state)
    if(this.state.loading){
      return <Container>Cargando</Container>
    }
    if(this.state.error){
      return <Container>Ha ocurrido un error</Container>
    }
    if(!this.state.job){
      return <Container>Ha ocurrido un error</Container>
    }

    return (
      <Container>
        <div style={{textAlign:"center"}}>
          <h5><b>{this.state.job.job_sub_type}</b></h5>
          <p>{this.state.job ? this.state.job.description : ""}</p>
        </div>
        <ListAnnouncementsDummy image_class="center-cropped subcategory-announcement-thumbnail" announcements_array={this.state.announcements_by_job}/>
      </Container>
     )
  }
}


function mapStateToProps(state){
  return {
    job_by_name:state.job_by_name,
    announcements_by_job: state.announcements_by_job
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getJobByName:getJobByName,
    getAnnouncementsByJob:getAnnouncementsByJob
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryPage);
