import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation user_signup($email: String!, $password: String!) {
    user_signup(email: $email, password: $email) {
      success
    }
  }
`;

export default SIGNUP_MUTATION;
