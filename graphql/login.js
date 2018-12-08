import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation user_login($email: String!, $password: String!) {
    login: user_login(email: $email, password: $password) {
      token
      success
    }
  }
`;

export default LOGIN_MUTATION;
