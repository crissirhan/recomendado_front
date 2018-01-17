import React, { Component } from 'react';
import {  CardGroup, Col } from 'reactstrap';
import AnnouncementCard from './AnnouncementCard'
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
        <div class="row">
          {this.props.announcements.map(announcement =>
            <AnnouncementCard announcement={announcement} key={announcement.id}/>
          )}
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
