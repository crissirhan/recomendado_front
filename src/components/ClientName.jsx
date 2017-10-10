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
    console.log(this.props.client.user);
    if(!this.props.client.user){
      return null;
    }
    return (
      <div>
        {this.props.client.user.first_name} {this.props.client.user.last_name}
      </div>
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
