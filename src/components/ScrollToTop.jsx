import React, { Component } from 'react';
    import {withRouter} from 'react-router';
    import $ from 'jquery'

    class ScrollToTop extends Component {

      componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
         $('html,body').animate({scrollTop:0},'slow');
         return false;
        }
      }
      render() {
        return (
                 this.props.children

            )
      }
    }

    export default withRouter(ScrollToTop)
