import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobCategory from './JobCategory';
import getJobCategories from '../actions/get_job_categories';
import { bindActionCreators } from 'redux';
import { CardGroup } from 'reactstrap';

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
      <CardGroup>
        {this.props.announcement_categories.map(category =>
          <JobCategory category={category} key={category}/>
        )}
      </CardGroup>
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
