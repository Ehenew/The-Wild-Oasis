import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Spinner from "./Spinner";

import { useUser } from "../features/authentication/useUser";


const FullPage = styled.div`
height: 100vh;
background-color: var(--color-grey-100);
display: flex;
align-items: center;
justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  // 2. If there is no authenticated user, redirect to /login
  // Note: we cannot use the navigate function on top level of the component, rather we only allowed to call the navigate function inside some other function like in callback or useEffect hook
  useEffect(function () {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isLoading, isAuthenticated, navigate]);

  // 3. While loading, show a spinner
  if (isLoading) <FullPage><Spinner /></FullPage>;

  // 4. If there is a user render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
