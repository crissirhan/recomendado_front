import React, { Component } from 'react';
import {  CardGroup, Col } from 'reactstrap';
import ReviewListItem from './ReviewListItem'
import Pagination from "react-js-pagination";
import './css/images.css';
import './css/box.css';
import './css/pagination.css';

class ReviewList extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div class="card card-outline-secondary my-4">
          <div class="card-header">
            Evaluaciones
          </div>
          <div class="card-body">
            {this.props.reviews.map((review,index) =>
              <div><ReviewListItem review={review}/>{index + 1 < this.props.reviews.length ? <hr/> : null}</div>
            )}
          </div>
        </div>
        <Pagination
          activePage={this.props.pagination.current}
          itemsCountPerPage={this.props.pagination.page_size}
          totalItemsCount={this.props.pagination.totalElements}
          hideDisabled={true}
          pageRangeDisplayed={5}
          onChange={this.props.handlePageChange}
        />
      </div>
    );
  }
}

export default ReviewList;
