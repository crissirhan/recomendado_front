import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobCategory from './JobCategory';
import getSubJobCategories from '../actions/get_job_sub_categories';
import { bindActionCreators } from 'redux';
import { CardGroup } from 'reactstrap';

class SubJobCategories extends Component {

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.setState({
        job_sub_categories:nextProps.job_sub_categories
      })
    }
  }

  componentDidMount() {
    this.props.getSubJobCategories();
  }

  constructor(props) {
    super(props);
    this.state = {
      job_sub_categories:[]
    };
  }

  render() {
    return (
      <CardGroup>
        {this.state.job_sub_categories.filter((sub_category)=>sub_category.job_category.job_type === this.props.job).map(category =>
          <JobCategory category={category.job_sub_type} key={category.id} category_id={category.id} url={'/x'}/>
        )}
      </CardGroup>
    );
  }
}
function mapStateToProps(state){
  return {
    job_sub_categories: state.job_sub_categories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSubJobCategories: getSubJobCategories
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubJobCategories);
