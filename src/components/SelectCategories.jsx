import React, { Component } from 'react';
import {withRouter} from 'react-router';
import $ from 'jquery'

class SelectCategories extends Component {

  componentdidReceiveProps(nextProps){
  }
  componentDidUpdate(prevProps) {
    $('.selectpicker').selectpicker('refresh');
  }

  render() {
    return (
            <select title="Categorías" class="selectpicker listing-categories" onChange={this.props.tagChange} show-menu-arrow>
              {(this.props.job_categories && this.props.job_categories.job_categories && this.props.job_sub_categories) ? this.props.job_categories.job_categories.map((category, index) => {
                let options = this.props.job_sub_categories.filter(sub_job => sub_job.job_category.job_type === category.job_type).map((sub_job, sub_index) => {
                  return <option key={sub_job.id} value={sub_job.job_sub_type}>{sub_job.job_sub_type}</option>
                })
                return <optgroup label={category.job_type} key={index}>{options}</optgroup>
              }) : <option value={''}>{'Cargando...'}</option>}
            </select>
        )
  }
}

export default withRouter(SelectCategories)
