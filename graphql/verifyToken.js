import gql from 'graphql-tag';

const VERIFY_TOKEN_MUTATION = gql`
  mutation user_verify_token($token: String!) {
    verify_token: user_verify_token(token: $token) {
      success
      message
    }
  }
`;

export default VERIFY_TOKEN_MUTATION;
