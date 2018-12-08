import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation user_signup($email: String!, $password: String!) {
    signup: user_signup(email: $email, password: $password) {
      success
      message
    }
  }
`;

export default SIGNUP_MUTATION;
