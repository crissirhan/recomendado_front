import React, { Component } from 'react';
import { connect } from 'react-redux'
import getAnnouncements from '../actions/get_announcements';
import { bindActionCreators } from 'redux';
import SearchInput, {createFilter} from 'react-search-input';

const KEYS_TO_FILTERS = ['professional', 'job']

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

  render(){
    const filteredAnnouncements = this.props.announcements.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        {filteredAnnouncements.map(announcement => {
          return (
            <div className="announcement" key={announcement.id}>
              <div className="professional">{announcement.professional}</div>
              <div className="job">{announcement.job}</div>
            </div>
          )
        })}
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
