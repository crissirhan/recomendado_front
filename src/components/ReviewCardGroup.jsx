import React, { Component } from 'react';
import {  CardGroup, Col } from 'reactstrap';
import ReviewCard from './ReviewCard'
import Pagination from "react-js-pagination";
import './css/images.css';
import './css/box.css';
import './css/pagination.css';

class ReviewCardGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <CardGroup>
          {this.props.reviews.map(review =>
            <Col height="360px" sm="4" key={review.id}><ReviewCard review={review}/></Col>
          )}
        </CardGroup>
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

export default ReviewCardGroup;
