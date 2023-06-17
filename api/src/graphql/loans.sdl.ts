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
    userId: String!
    outstandingInstallments: Int!
    outstandingInstallmentAmount: Float!
    interestRate: Float!
    createdAt: DateTime
    updatedAt: DateTime
  }

  enum Currency {
    HKD
    INR
  }

  type LoanStatistic {
    numberOfLoans: Int!
    totalLoanAmount: Float!
    currency: String!
    totalMonthlyEmi: Float!
    totalOutstandingAmount: Float!
  }

  type Query {
    loans: [Loan!]! @requireAuth
    loan(id: Int!): Loan @requireAuth
    loanStatistic: LoanStatistic @requireAuth
  }

  input CreateLoanInput {
    amount: Float!
    emi: Float!
    months: Int!
    bankName: String!
    processedData: DateTime!
    emiDate: Int!
    currency: Currency!
    userId: String!
    outstandingInstallments: Int!
    outstandingInstallmentAmount: Float!
    interestRate: Float!
  }

  input UpdateLoanInput {
    amount: Float
    emi: Float
    months: Int
    bankName: String
    processedData: DateTime
    emiDate: Int
    currency: Currency!
    outstandingInstallments: Int!
    outstandingInstallmentAmount: Float!
    interestRate: Float!
  }

  type Mutation {
    createLoan(input: CreateLoanInput!): Loan! @requireAuth
    updateLoan(id: Int!, input: UpdateLoanInput!): Loan! @requireAuth
    deleteLoan(id: Int!): Loan! @requireAuth
  }
`
