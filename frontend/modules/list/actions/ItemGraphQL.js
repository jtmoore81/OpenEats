
class ItemGraphQL {

  query() {
    let query = `query {
      groceryList(id: 1) {
        items {
          edges {
            node {
              id,
              title
            }
          }
        }
      }
    }`;

    return query
  }
}

const queries = new ItemGraphQL();

export default queries;
