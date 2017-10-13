import React, { Component } from 'react';
import { connect } from 'react-redux';
import getUserAnnouncements from '../actions/get_user_announcements';
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  Link
} from 'react-router-dom';
import ReviewForm from './ReviewForm';
import { Collapse,Button } from 'reactstrap';
class ServiceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse:false
    };
    this.toggle = this.toggle.bind(this);
  }

  toAnnouncements(){
    if(this.props.announcements[0]){
      return this.props.announcements[0].id;
    } else{
      return null;
    }
  }

  dayRenderer(props){
    if(!props.value){
      return '';
    }
    var days=props.value.split(',');
    return (days.map(day => <span key={day.toString()}>{day} </span>));
  }

  editRenderer(props){
    return  <div><Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Review</Button><Collapse isOpen={this.state.collapse}><ReviewForm service_id={props.value}/></Collapse></div>;
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render(){
    if(!this.props.services){
      return null;
    }
    const columns = [{
      Header: 'ID del servicio',
      accessor: 'id' // String-based value accessors!
    },{
      Header: 'Nombre del profesional',
      accessor: 'announcement.professional.user.first_name' // String-based value accessors!
    },{
      Header: 'Review',
      accessor: 'id',
      Cell: props => this.editRenderer(props)
    }];
    return (
      <ReactTable
        data={this.props.services}
        columns={columns}
        showPagination={false}
        showPaginationTop={false}
        showPaginationBottom={true}
        showPageSizeOptions={true}
        minRows={0}
      />
     )
  }

}

function mapStateToProps(state){
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);
