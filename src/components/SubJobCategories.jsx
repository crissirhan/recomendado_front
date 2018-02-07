import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobCategory from './JobCategory';
import getSubJobCategories from '../actions/get_job_sub_categories';
import { bindActionCreators } from 'redux';
import { CardGroup, Col, Row, Container } from 'reactstrap';
import {
  Link,
  withRouter
} from 'react-router-dom';
import './css/col.css';

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
    let sub_categories = this.state.job_sub_categories.filter((sub_category)=>sub_category.job_category.job_type === this.props.job);
    return (

      <div class="container-fluid">
        <div style={{textAlign:"center"}}>
          <h1>{this.props.job}</h1>
          <p class="small-text-hero">{sub_categories[0] ? sub_categories[0].job_category.description : ""}</p>
        </div>
          <div >
            <CardGroup>
              <div class="row">
                {sub_categories.map(category =>
                  <JobCategory image_class="center-cropped job-category shadow-box round-border" category={category.job_sub_type} name={category.job_sub_type} description={category.description} key={category.id} category_id={category.id} url={this.props.location.pathname+category.job_sub_type} image={category.image}/>
                )}
              </div>
            </CardGroup>
          </div>
      </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubJobCategories));
