import gql from 'graphql-tag';

const DETAIL_TYPES_QUERY = gql`
  query DetailTypesQuery {
    report_detail_types(language: TR) {
      _id
      name
      icon
    }
  }
`

export default DETAIL_TYPES_QUERY;