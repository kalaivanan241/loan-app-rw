export const schema = gql`
  type Loan {
    id: Int!
    amount: Float!
    emi: Float!
    months: Int!
    bankName: String!
    processedData: DateTime!
    emiDate: Int!
    currency: Currency!
  }

  enum Currency {
    HKD
    INR
  }

  type Query {
    loans: [Loan!]! @requireAuth
    loan(id: Int!): Loan @requireAuth
  }

  input CreateLoanInput {
    amount: Float!
    emi: Float!
    months: Int!
    bankName: String!
    processedData: DateTime!
    emiDate: Int!
    currency: Currency!
  }

  input UpdateLoanInput {
    amount: Float
    emi: Float
    months: Int
    bankName: String
    processedData: DateTime
    emiDate: Int
    currency: Currency!
  }

  type Mutation {
    createLoan(input: CreateLoanInput!): Loan! @requireAuth
    updateLoan(id: Int!, input: UpdateLoanInput!): Loan! @requireAuth
    deleteLoan(id: Int!): Loan! @requireAuth
  }
`
