import React, { Component } from 'react';
import { Table, ListGroup, ListGroupItem, Input, Label } from 'reactstrap';
import CategoryPage from './CategoryPage';
import getAnnouncements from '../actions/get_announcements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Link,
  withRouter
} from 'react-router-dom';
import SearchAnnouncements from './SearchAnnouncements';

class ListAnnouncements extends Component {

  componentDidMount(){
    this.props.getAnnouncements(this.props.search);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        announcements:nextProps.announcements
      });
      if(this.props.search !== nextProps.search){
        this.props.getAnnouncements(nextProps.search);
      }
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      announcements:[]
    };
  }

  render() {
      if(this.state.announcements.length === 0 ){
        return <div style={{textAlign:"center"}}> <div>No se encontraron resultados </div><SearchAnnouncements/></div>;
      }
      let table_body = this.state.announcements.map(announcement => {
      let days = {
        'lun':false,
        'mar':false,
        'mier':false,
        'jue':false,
        'vier':false,
        'sab':false,
        'dom':false
      }
      for (var property in days) {
        if (days.hasOwnProperty(property)) {
          if(announcement.availability.indexOf(property) > -1){
            days[property] = !days.property;
          }
        }
      }
      let result =<tr key={announcement.id}>
                    <td>{announcement.title}</td>
                    <td>{announcement.description}</td>
                    <td>
                      <Link to={'/profesionales/'+announcement.professional.id}>{announcement.professional.user.first_name} {announcement.professional.user.last_name}</Link>
                    </td>
                    <td>
                      <Link to={'/categorias/'+announcement.job.id+'/'+announcement.job.job_type}>{announcement.job.job_type}</Link>
                    </td>
                    <td>
                      {announcement.job_subtype ? announcement.job_subtype.job_sub_type : ""}
                    </td>
                    <td>{new Date(announcement.expire_date).toLocaleDateString()}</td>
                    <td>{announcement.location}</td>
                    <td>
                      <ListGroup>
                        <Label check>
                          <Input readOnly type="checkbox"  checked={days.lun}/>
                          Lunes
                        </Label>
                        <Label check>
                          <Input readOnly type="checkbox"  checked={days.mar}/>
                          Martes
                        </Label>
                        <Label check>
                          <Input readOnly type="checkbox"  checked={days.mier}/>
                          Miércoles
                        </Label>
                        <Label check>
                          <Input readOnly type="checkbox"  checked={days.jue}/>
                          Jueves
                        </Label>
                        <Label check>
                          <Input readOnly type="checkbox"  checked={days.vier}/>
                          Viernes
                        </Label>
                        <Label check>
                          <Input readOnly type="checkbox"  checked={days.sab}/>
                          Sábado
                        </Label>
                        <Label check>
                          <Input readOnly type="checkbox"  checked={days.dom}/>
                          Domingo
                        </Label>
                      </ListGroup>
                    </td>
                  </tr>;
      return result;

    });
    return (
      <div>
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.Quisque rutrum. Aenean imperdiet.</p>
        <SearchAnnouncements/>

        <Table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Profesional</th>
              <th>Categoría</th>
              <th>Subcategoría</th>
              <th>Fecha expiración</th>
              <th>Ubicación</th>
              <th>Disponibilidad</th>
            </tr>
          </thead>
          <tbody>
            {table_body}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    announcements: state.announcements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAnnouncements: getAnnouncements
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAnnouncements));
