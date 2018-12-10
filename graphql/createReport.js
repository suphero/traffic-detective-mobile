import gql from 'graphql-tag';

const CREATE_REPORT_MUTATION = gql`
  mutation CreateReportMutation($plate: String!, $details: [ReportDetailEnum]!) {
    createReport: report_create(entity: {plate: $plate, details: $details}) {
      success
      message
    }
  }
`
export default CREATE_REPORT_MUTATION;
