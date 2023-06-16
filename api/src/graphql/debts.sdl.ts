export const schema = gql`
  type Debt {
    id: Int!
    amount: Float!
    to: String!
    currency: Currency!
    date: DateTime!
    interestRate: Float!
    userId: String!
  }

  enum Currency {
    HKD
    INR
  }

  type DebtStatistic {
    totalAmount: Float!
    numberOfDebts: Int!
    baseCurrency: String!
  }

  type Query {
    debts: [Debt!]! @requireAuth
    debt(id: Int!): Debt @requireAuth
    debtStatistic: DebtStatistic @requireAuth
  }

  input CreateDebtInput {
    amount: Float!
    to: String!
    currency: Currency!
    date: DateTime!
    interestRate: Float!
    userId: String!
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
