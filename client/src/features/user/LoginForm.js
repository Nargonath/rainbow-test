import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import rainbowSDK from 'rainbow-web-sdk';

import './LoginForm.scss';

const initialValues = {
  email: '',
  password: '',
};

const schema = Yup.object({
  email: Yup.string().required('Obligatoire'),
  password: Yup.string().required('Obligatoire'),
});

function LoginForm({ onLogin }) {
  const onSubmit = (values) =>
    rainbowSDK.connection
      .signin(values.email, values.password)
      .then((userData) => onLogin(userData))
      .catch(console.error);

  return (
    <div className="login-form">
      <h2 className="login-form__header">Connexion</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form__form">
            <Field className="login-form__input" type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <Field
              className="login-form__input"
              type="password"
              name="password"
            />
            <ErrorMessage name="password" component="div" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="login-form__button"
            >
              Se connecter
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
