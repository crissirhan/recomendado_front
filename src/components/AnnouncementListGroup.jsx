import React, { Component } from 'react';
import {  ListGroup, Button } from 'reactstrap';
import AnnouncementListElement from './AnnouncementListElement'
import Pagination from "react-js-pagination";
import './css/images.css';
import './css/box.css';
import './css/pagination.css';

class AnnouncementCardGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div>
          {this.props.announcements.map(announcement =>
            <AnnouncementListElement announcement={announcement} extend_button={this.props.extend_button} visible_button={this.props.visible_button} />)}
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


export default AnnouncementCardGroup;
