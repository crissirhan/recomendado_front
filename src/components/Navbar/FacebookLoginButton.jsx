import React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';

class FacebookLoginButton extends React.Component{

  constructor (props, context) {
    super(props, context);
  }

  responseFacebook (response) {
    console.log(response)
  }

  render () {
    return (
      <div>
        <FacebookLogin socialId="1861672140513754"
                       language="en_US"
                       scope="public_profile,email,user_friends"
                       responseHandler={this.responseFacebook}
                       xfbml={true}
                       fields="id,email,name"
                       version="v2.5"
                       className="facebook-login"
                       buttonText="Login con Facebook"/>
      </div>
    );
  }

}

export default FacebookLoginButton;
