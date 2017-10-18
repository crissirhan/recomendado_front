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
    return (
      <CardGroup>
        {this.props.job_categories.map(category =>
          <JobCategory category={category.job_type} key={category.id} category_id={category.id} url={'/categorias/' + category.id + '/' + category.job_type + '/'}/>
        )}
      </CardGroup>
    );
  }
}
function mapStateToProps(state){
  return {
    job_categories: state.job_categories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getJobCategories: getJobCategories
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCategories);
