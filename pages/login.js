import React, { Component, useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { signIn, signOut, useSession } from 'next-auth/client';
import styled from 'styled-components';
import Router from 'next/router';

import media from '../utils/media';

import Page from '../components/Page';
import PageContainer from '../components/PageContainer';
import FormWrapper from '../components/FormWrapper';
import Label from '../components/Label';

export const FormTitle = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  color: #232323;

  ${media.phone`
    font-size: 18px;
  `}
`;

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [session, loading] = useSession();

  if (typeof window !== 'undefined' && loading) return null;

  if (session) {
    Router.push('/');
  }

  return (
    <Page title="login">
      <PageContainer centered>
        <FormWrapper>
          <FormTitle>Login</FormTitle>
          <button onClick={signIn}>Sign in</button>

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

Login.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default Login;
