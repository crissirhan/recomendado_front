import React, { Component } from 'react';
import { connect } from 'react-redux';
import getUserAnnouncements from '../../actions/get_user_announcements';
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  Link
} from 'react-router-dom';

class AnnouncementsEdit extends Component {

  componentDidMount() {
    this.props.getUserAnnouncements(this.props.professional_id);
  }

  constructor(props) {
    super(props);
    this.state = {
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
    console.log(props);
    if(!props.value){
      return '';
    }
    var url = '/profesional/'+props.value.professional.id+'/announcement/'+props.value.id+'/';
    console.log(url);
    return <Link to={url}>Editar</Link>;
  }
  render(){
    const columns = [{
      Header: 'Professional',
      accessor: 'professional.id' // String-based value accessors!
    },{
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
      accessor: 'availability', // String-based value accessors!
      Cell: props => this.dayRenderer(props)
    },{
      Header: 'Movilidad',
      accessor: 'movility' // String-based value accessors!
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

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsEdit);
