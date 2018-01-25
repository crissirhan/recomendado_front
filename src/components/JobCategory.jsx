import React, { Component } from 'react';
import { Card, CardImg, CardBlock, CardTitle, Col} from 'reactstrap';
import {
  Route,
  Link
} from 'react-router-dom';
import CategoryPage from './CategoryPage';
import './css/images.css';
import './css/box.css';

class JobCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let url = this.props.url;
    console.log(this.props)
    let image_url = this.props.image
    return (
      <div class="item listing-item" key={this.props.category.id}>
        <Link class="portfolio-link" to={url}>
          <div class="item-inner">
            <div class="image"><img src={image_url} alt="..." class="img-fluid"/></div>
            <div class="info d-flex align-items-end justify-content-between">
              <div class="content">
                  <h3>{this.props.name}</h3>
                  <p class="address">{this.props.description}</p></div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}


export default JobCategory;
