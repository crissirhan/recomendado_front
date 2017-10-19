import React, { Component } from 'react';
import { Card, CardImg, CardBlock, CardTitle, Col} from 'reactstrap';
import {
  Route,
  Link
} from 'react-router-dom';
import CategoryPage from './CategoryPage';

class JobCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let url = this.props.url;
    let image_url = this.props.image ? this.props.image : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";
    return (
      <Col sm="3">
        <Link to={url}>
          <Card>
            <CardBlock>
              <CardTitle>{this.props.category}</CardTitle>
            </CardBlock>
            <CardImg top width="100%" src={image_url} alt="Card image cap" />
          </Card>
        </Link>
      </Col>
    );
  }
}


export default JobCategory;
