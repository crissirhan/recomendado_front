import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Button } from 'reactstrap';
import getClient from '../../actions/get_client';



let SignUpForm = props => {
  const { handleSubmit } = (values) => {
      this.props.signUp(values.email, values.password1, values.password2, values.email);
    };

  const renderInput = ({ input, meta, ...rest }) => <Input {...input} {...rest}/>;

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="email">Correo electrónico</label>
        <Field name="email" component={renderInput} type="email" />
      </div>
      <div>
        <label htmlFor="password1">Contraseña</label>
        <Field name="password1" component={renderInput} type="password" />
      </div>
      <div>
        <label htmlFor="password2">Repita contraseña</label>
        <Field name="password2" component={renderInput} type="password" />

      </div>
      <Button type="submit">Enviar</Button>
    </form>
  )
}

SignUpForm = reduxForm({
  // a unique name for the form
  form: 'signup'
})(SignUpForm);

function mapStateToProps(state){
  return {
    sign_up: state.sign_up
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signUp: signUp
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
