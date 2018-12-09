import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation user_signup($email: String!, $password: String!) {
    signup: user_signup(email: $email, password: $password) {
      token
      success
    }
  }
`;

export default SIGNUP_MUTATION;
