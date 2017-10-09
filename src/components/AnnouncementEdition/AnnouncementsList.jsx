import React, { Component } from 'react';
import { connect } from 'react-redux';
import getUserAnnouncements from '../../actions/get_user_announcements';
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  Link
} from 'react-router-dom';
import AnnouncementsEdit from './AnnouncementsEdit'

class AnnouncementsList extends Component {

  componentDidMount() {
    this.props.getUserAnnouncements(this.props.professional_id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.syncPropToState(nextProps);
    }
  }

  syncPropToState(nextProps){
    if(this.state.lazyInitialization){
      for(var key in nextProps.professional) {
         if (nextProps.professional.hasOwnProperty(key)) {
            this.setState({
              [key]: nextProps.professional[key]
            });
         }
      }
      this.setState({
        lazyInitialization: false
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      announcements:{}
    };
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
    if(!props.value){
      return '';
    }
    return <AnnouncementsEdit announcement_id={props.value.id} availability={props.value.availability} movility={props.value.movility} />;
  }
  render(){
    const columns = [{
      Header: 'Trabajo',
      accessor: 'job.job_type' // String-based value accessors!
    },{
      Header: 'Fecha publicación',
      accessor: 'publish_date' // String-based value accessors!
    },{
      Header: 'Fecha expiración',
      accessor: 'expire_date' // String-based value accessors!
    },{
      Header: 'Días disponibles',
      accessor: 'availability_display', // String-based value accessors!
      Cell: props => this.dayRenderer(props)
    },{
      Header: 'Movilidad',
      accessor: 'movility' // String-based value accessors!
    },{
      id: 'id',
      Header: 'Editar',
      accessor: d => d,
      Cell: props => this.editRenderer(props)
    }];

    return (
      <ReactTable
        data={this.props.user_announcements}
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
    user_announcements: state.user_announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserAnnouncements: getUserAnnouncements
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsList);
