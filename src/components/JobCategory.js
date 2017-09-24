import React, { Component } from 'react';

class JobCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        {this.props.category}
      </div>
    );
  }
}
export default JobCategory;
