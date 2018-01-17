import React, { Component } from 'react';
import {  ListGroup, Button, Container } from 'reactstrap';
import ServiceAnnouncementListElement from './ServiceAnnouncementListElement'
import Pagination from "react-js-pagination";
import './css/images.css';
import './css/box.css';
import './css/pagination.css';
import './css/loading.css'

class AnnouncementCardGroup extends Component {

  componentWillReceiveProps(){
    this.setState(this.state)
  }

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    if(this.props.loading){
      return <Container class="loader"></Container>
    }
    return (
      <div>
        <ListGroup>
          {this.props.services.map(service =>
            <ServiceAnnouncementListElement service={service}/>)}
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


export default AnnouncementCardGroup;
