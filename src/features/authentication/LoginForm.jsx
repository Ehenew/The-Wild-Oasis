import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
import styled from "styled-components";

const P = styled.p`
display: inline-block;
margin-right: 18px;
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password }, {
      onSettled: () => {
        setEmail('');
        setPassword('');
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <P>Don't have an account? <Link to='/signup'>Signup</Link></P>
      <FormRow orientation="vertical">
        <Button size="large">{!isLoading ? 'Login' : <SpinnerMini />}</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
