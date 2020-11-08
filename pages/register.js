import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

import styled from 'styled-components';
import media from 'utils/media';

import Page from 'components/Page';
import PageContainer from 'components/PageContainer';
import FormWrapper from 'components/FormWrapper';
import Label from 'components/Label';

export const FormTitle = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  color: #232323;

  ${media.phone`
    font-size: 18px;
  `}
`;

const Register = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <Page title="Register | GoldMovies">
      <PageContainer centered>
        <FormWrapper>
          <FormTitle>Register</FormTitle>
          <Form autoComplete="on" onSubmit={null}>
            <Form.Field>
              <Label htmlFor="email">email</Label>
              <input
                id="email"
                type="email"
                required
                value={email || ''}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                style={{ fontSize: false ? '16px' : null }}
              />
            </Form.Field>
            <Form.Field>
              <Label htmlFor="password">pasword</Label>
              <input
                required
                id="password"
                type="password"
                value={password || ''}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                style={{ fontSize: false ? '16px' : null }}
              />
            </Form.Field>

            <Button loading={false} primary type="submit">
              login
            </Button>
            <a href="/" style={{ marginLeft: '5px' }}>
              forgot
            </a>
          </Form>
        </FormWrapper>
      </PageContainer>
    </Page>
  );
};

Register.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default Register;
