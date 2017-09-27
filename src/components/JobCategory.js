import React, { Component } from 'react';
import { Card, CardImg, CardBlock, CardTitle, Col} from 'reactstrap';

class JobCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Col sm="3">
        <Card>
          <CardBlock>
            <CardTitle>{this.props.category}</CardTitle>
          </CardBlock>
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        </Card>
      </Col>
    );
  }
}
export default JobCategory;
