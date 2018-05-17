import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfileNameEdit from './ProfileNameEdit'

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <ProfileNameEdit/>
    )
  }
}

export default ProfileEdit
