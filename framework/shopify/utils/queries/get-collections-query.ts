const getCollectionQuery = /* GraphQL */ `
  query getCollectionQuery($id: String!) {
    collection(id: $id) {
      products(first: 3) {
        edges {
          node {
            title
            productType
          }
        }
      }
    }
  }
`
export default getCollectionQuery
