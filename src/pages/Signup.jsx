import styled from "styled-components";

import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import SignupForm from "../features/authentication/SignupForm";

const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 58rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Signup() {
  return (
    <SignupLayout>
      <Logo />
      <Heading as='h4'>Create your account</Heading>
      <SignupForm />
    </SignupLayout>
  );
}

export default Signup;
