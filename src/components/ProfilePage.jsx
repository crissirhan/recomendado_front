import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProfessionalPage from './ProfessionalPage'
import ClientPage from './ClientPage'
import getProfile from '../actions/get_profile'

class ProfilePage extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.profile !== this.props.profile){
      console.log(nextProps)
      this.setState({profile:nextProps.profile})
    }
  }
  componentDidMount(){
    this.props.getProfile(this.state.id)
  }

  constructor(props) {
    super(props);
    this.state = {
      id:this.props.profile_id,
      profile:null
    };
  }

  render(){
    let user = this.state.profile
    if(!user){
      return <div>Ocurrió un error</div>
    }
    return (
      <div>
      {user.profile.is_professional ? <ProfessionalPage professional_id={this.state.id}/> : <ClientPage client_id={this.state.id}/>}
      </div>
     )
  }

}

function mapStateToProps(state){
  return {
    profile:state.profile
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProfile:getProfile
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
