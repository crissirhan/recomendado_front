import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getAnnouncementsByJob from '../actions/get_announcements_by_job';
import ReactTable from 'react-table';

class CategoryPage extends Component {

  componentDidMount() {
    this.props.getAnnouncementsByJob(this.props.category_id);
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  dayRenderer(props){
    if(!props.value){
      return '';
    }
    var days=props.value.split(',');
    return (days.map(day => <span key={day.toString()}>{day} </span>));
  }
  render(){
    const columns = [{
      Header: 'Professional',
      accessor: 'professional.id' // String-based value accessors!
    },{
      Header: 'Job',
      accessor: 'job.job_type' // String-based value accessors!
    },{
      Header: 'Publish date',
      accessor: 'publish_date' // String-based value accessors!
    },{
      Header: 'Expire date',
      accessor: 'expire_date' // String-based value accessors!
    },{
      Header: 'Availability',
      accessor: 'availability', // String-based value accessors!
      Cell: props => this.dayRenderer(props)
    },{
      Header: 'Movility',
      accessor: 'movility' // String-based value accessors!
    }];

    return (
      <div>
        <ReactTable
          data={this.props.announcements_by_job}
          columns={columns}
          showPagination={false}
          showPaginationTop={false}
          showPaginationBottom={true}
          showPageSizeOptions={true}
          minRows={0}
        />
      </div>
     )
  }
}


function mapStateToProps(state){
  return {
    announcements_by_job: state.announcements_by_job
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncementsByJob: getAnnouncementsByJob
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
