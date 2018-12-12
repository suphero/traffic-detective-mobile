import gql from 'graphql-tag';

const REPORTS_QUERY = gql`
  query ReportsQuery {
    report_user {
      _id
      plate
      details
    }
  }
`

export default REPORTS_QUERY;