import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SubJobCategories from './SubJobCategories';
import ReactTable from 'react-table';
import {
  Link,
} from 'react-router-dom';
import { Container, Col } from 'reactstrap';
import getAnnouncementsByJob from '../actions/get_announcements_by_job';
import ListAnnouncementsDummy from './ListAnnouncementsDummy';


class SubCategoryPage extends Component {

  componentDidMount(){
    this.props.getAnnouncementsByJob(this.props.sub_category,null);
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.setState({
        announcements_by_job:nextProps.announcements_by_job
      })
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      announcements_by_job:[]
    };
  }

  render(){
    console.log(this.state.announcements_by_job)
    return (
      <Container>
        <ListAnnouncementsDummy announcements_array={this.state.announcements_by_job}/>
      </Container>
     )
  }
}


function mapStateToProps(state){
  return {
    announcements_by_job:state.announcements_by_job
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncementsByJob:getAnnouncementsByJob
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryPage);
