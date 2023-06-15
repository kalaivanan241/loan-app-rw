export const schema = gql`
  type Debt {
    id: Int!
    amount: Float!
    to: String!
    currency: Currency!
    date: DateTime!
    interestRate: Float!
  }

  enum Currency {
    HKD
    INR
  }

  type Query {
    debts: [Debt!]! @requireAuth
    debt(id: Int!): Debt @requireAuth
  }

  input CreateDebtInput {
    amount: Float!
    to: String!
    currency: Currency!
    date: DateTime!
    interestRate: Float!
  }

  input UpdateDebtInput {
    amount: Float
    to: String
    currency: Currency
    date: DateTime
    interestRate: Float
  }

  type Mutation {
    createDebt(input: CreateDebtInput!): Debt! @requireAuth
    updateDebt(id: Int!, input: UpdateDebtInput!): Debt! @requireAuth
    deleteDebt(id: Int!): Debt! @requireAuth
  }
`
