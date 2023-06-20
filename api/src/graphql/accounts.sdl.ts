export const schema = gql`
  type Account {
    id: Int!
    currency: Currency!
    type: AccountType!
    name: String!
    accountNumber: String!
    userId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum Currency {
    HKD
    INR
  }

  enum AccountType {
    BANK
    BROKERAGE
    INSURANCE
  }

  type Query {
    accounts: [Account!]! @requireAuth
    account(id: Int!): Account @requireAuth
  }

  input CreateAccountInput {
    currency: Currency!
    type: AccountType!
    name: String!
    accountNumber: String!
    userId: String!
  }

  input UpdateAccountInput {
    currency: Currency
    type: AccountType
    name: String
    accountNumber: String
    userId: String
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): Account! @requireAuth
    updateAccount(id: Int!, input: UpdateAccountInput!): Account! @requireAuth
    deleteAccount(id: Int!): Account! @requireAuth
  }
`
