import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAnnouncements from '../actions/get_announcements';
import { bindActionCreators } from 'redux';
import SearchInput, {createFilter} from 'react-search-input';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


const KEYS_TO_FILTERS = ['professional.id', 'job.job_type']

class SearchAnnouncements extends Component {

  componentDidMount() {
    this.props.getAnnouncements();
  }

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.searchUpdated = this.searchUpdated.bind(this)
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
    const filteredAnnouncements = this.props.announcements.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    console.log(filteredAnnouncements);
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
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <ReactTable
          data={filteredAnnouncements}
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

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

}

function mapStateToProps(state){
  return {
    announcements: state.announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncements: getAnnouncements
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchAnnouncements);
