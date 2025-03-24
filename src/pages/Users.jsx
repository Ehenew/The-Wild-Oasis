import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";

function NewUsers() {
  return <>
    <Heading as="h1">Register New User</Heading>
    <SignupForm />
  </>;
}

export default NewUsers;
