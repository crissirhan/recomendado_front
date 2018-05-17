import React, { Component } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log(error)
    console.log(info)
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      //window.location.assign('/404/')
    }
    return this.props.children;
  }
}

export default ErrorBoundary
