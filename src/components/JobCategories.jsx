import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobCategory from './JobCategory';
import getJobCategories from '../actions/get_job_categories';
import { bindActionCreators } from 'redux';
import { CardGroup, Row } from 'reactstrap';
import './css/col.css'

class JobCategories extends Component {

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.setState({
        job_categories:nextProps.job_categories.job_categories
      })
    }
  }

  componentDidMount() {
    this.props.getJobCategories();
  }

  constructor(props) {
    super(props);
    this.state = {
      job_categories:[]
    };
  }

  render() {
    return (
      <div class="row">
        {this.state.job_categories.map(category =>
          <JobCategory image_class="center-cropped job-category shadow-box round-border" name={category.job_type} description={category.description} category={category} key={category.id} category_id={category.id} url={'/categorias/' + category.job_type + '/'} image={category.image}/>
        )}
      </div>
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
