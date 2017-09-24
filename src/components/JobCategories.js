import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobCategory from './JobCategory';
import getJobCategories from '../actions/get_job_categories';
import { bindActionCreators } from 'redux';

class JobCategories extends Component {

  componentDidMount() {
    this.props.getJobCategories();
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props.announcement_categories);
    return (
      <div>
        {this.props.announcement_categories.map(category =>
          <JobCategory category={category} key={category}/>
        )}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    announcement_categories: state.announcement_categories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getJobCategories: getJobCategories
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCategories);
