import React, { Component } from 'react';
import {  ListGroup, Button, Container } from 'reactstrap';
import ServiceListElement from './ServiceListElement'
import Pagination from "react-js-pagination";
import './css/images.css';
import './css/box.css';
import './css/pagination.css';
import './css/loading.css'
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
    let services = this.props.services.lastPage ? this.props.services.results : this.props.services
    if(this.props.loading){
      return <Container><div class="loader"></div></Container>
    }
    return (
      <div>
        <div>
          {services.map(service =>
            <ServiceListElement key={service.id} service={service} />)}
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


export default ServiceListGroup;
