import React, { Component } from 'react';

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log("asd");
    return (
      <div>
        {this.props.category}
        {this.props.category_id}
      </div>
    );
  }
}


export default CategoryPage;
