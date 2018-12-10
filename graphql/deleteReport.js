import gql from 'graphql-tag';

const DELETE_REPORT_MUTATION = gql`
  mutation DeleteReportMutation($_id: ID!) {
    deleteReport: report_delete(_id: $_id) {
      success
      message
    }
  }
`
export default DELETE_REPORT_MUTATION;
