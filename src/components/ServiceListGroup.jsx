import React, { Component } from 'react';
import {  ListGroup, Button } from 'reactstrap';
import ServiceListElement from './ServiceListElement'
import Pagination from "react-js-pagination";
import './css/images.css';
import './css/box.css';
import './css/pagination.css';

class ServiceListGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.props.services.map(service =>
            <ServiceListElement service={service}/>)}
        </ListGroup>
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


export default ServiceListGroup;
