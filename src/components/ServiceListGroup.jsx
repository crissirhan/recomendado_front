import React, { Component } from 'react';
import {  ListGroup, Button } from 'reactstrap';
import ServiceListElement from './ServiceListElement'
import Pagination from "react-js-pagination";
import './css/images.css';
import './css/box.css';
import './css/pagination.css';
import shortid from 'shortid'

class ServiceListGroup extends Component {

  componentWillReceiveProps(){
    this.setState(this.state)
  }

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
            <ServiceListElement key={shortid.generate()} service={service} />)}
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
