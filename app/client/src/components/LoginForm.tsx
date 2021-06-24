//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import { Label } from '@rebass/forms';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { Flex } from 'rebass';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import FormTitle from './common/form/FormTitle';
import FormSubtitle from './common/form/FormSubTitle';
import TextInput from './common/form/TextInput';
import { StyledFormButton } from './common/form/Button';
import validator from '../utils/validator';
import { login } from '../actions';

interface LoginProps {
  login: any;
}

const LoginForm: React.FC<LoginProps> = (props) => {
  const history = useHistory();

  const handleLogin = (formData: any) => {
    history.push('/');
    props
      .login(formData)
      .then((data: any) => {
        history.push('/details');
        console.error(data);
        // return api.getProjects();
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  return (
    <Form onSubmit={handleLogin}>
      {(formProps) => (
        <form onSubmit={formProps.handleSubmit}>
          <FormTitle>Log In</FormTitle>
          <FormSubtitle>Please enter your username and password.</FormSubtitle>
          <Flex flexDirection="column">
            <Label htmlFor="email">Email</Label>
            <Field<string>
              name="email"
              component={TextInput}
              placeholder="Email"
              validate={validator.mustBeValidEmail}
            />
          </Flex>
          <Flex flexDirection="column">
            <Label htmlFor="password">Password</Label>
            <Field name="password" component={TextInput} placeholder="" />
          </Flex>
          <StyledFormButton type="submit">Login</StyledFormButton>
        </form>
      )}
    </Form>
  );
};

export default connect(null, { login })(LoginForm);
