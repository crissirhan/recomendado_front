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
    let image_url = this.props.image ? this.props.image.full_size : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";
    return (
      <div class="col-md-4 col-sm-6 portfolio-item" key={this.props.category.id}>
        <Link class="portfolio-link" to={url}>
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              {/*<i class="fa fa-plus fa-3x"></i> */}
            </div>
          </div>
          <img class="img-fluid" src={image_url} alt=""/>
        </Link>
        <div class="portfolio-caption">
          <h4>{this.props.name}</h4>
          <p class="text-muted">{this.props.description}</p>
        </div>
      </div>
    );
  }
}


export default JobCategory;
