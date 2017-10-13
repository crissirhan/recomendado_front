import React, { Component } from 'react';
import { connect } from 'react-redux';
import getClient from '../actions/get_client';
import { bindActionCreators } from 'redux';

class ClientName extends Component {

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps){
      if(!this.state.client){
        this.setState({
          client:nextProps.client
        });
      }
    }
  }

  componentDidMount() {
    this.props.getClient(this.props.client_id);
  }
  constructor(props) {
    super(props);
    this.state = {
      client:null
    };
  }

  render() {
    if(! this.state.client){
      return null;
    }
    return (
      <div>
        {this.state.client.user.first_name} {this.state.client.user.last_name}
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
