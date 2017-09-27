import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Button } from 'reactstrap';



let SignUpForm = props => {
  const { handleSubmit } = props;

  const renderInput = ({ input, meta, ...rest }) => <Input {...input} {...rest}/>;

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="username">Nombre de usuario</label>
        <Field name="username" component={renderInput} type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
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

export default SignUpForm;
