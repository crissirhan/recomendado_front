import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobCategory from './JobCategory';
import getJobCategories from '../actions/get_job_categories';
import { bindActionCreators } from 'redux';
import { CardGroup, Row } from 'reactstrap';
import './css/col.css'

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
        <Row>
          {this.props.job_categories.map(category =>
            <JobCategory image_class="center-cropped job-category" category={category.job_type} key={category.id} category_id={category.id} url={'/categorias/' + category.job_type + '/'} image={category.image}/>
          )}
        </Row>
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
