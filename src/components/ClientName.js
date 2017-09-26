import React, { Component } from 'react';
import { connect } from 'react-redux';
import getClient from '../actions/get_client';
import { bindActionCreators } from 'redux';

class ClientName extends Component {

  componentDidMount() {
    this.props.getClient(this.props.client_id);
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props.client);
    return (
      <p>
        {this.props.client.first_name} {this.props.client.last_name}
      </p>
    );
  }
}
function mapStateToProps(state){
  return {
    client: state.client
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getClient: getClient
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientName);
