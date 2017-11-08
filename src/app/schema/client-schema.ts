export const clientSchema = `
schema {
  query: Query
  mutation: Mutation
}

type Query {
  isSelected(id: ID): Boolean
}

type LocalMessage {
  id: ID
  selected: Boolean
}

type Mutation {
  selectMessage(messageId: Int!): LocalMessage
}
`;