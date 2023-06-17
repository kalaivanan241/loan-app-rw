import type { FindLoanById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Loan from 'src/components/Loan/Loan'

export const QUERY = gql`
  query FindLoanById($id: Int!) {
    loan: loan(id: $id) {
      id
      amount
      emi
      months
      bankName
      processedData
      emiDate
      currency
      outstandingInstallments
      outstandingInstallmentAmount
      interestRate
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Loan not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ loan }: CellSuccessProps<FindLoanById>) => {
  return <Loan loan={loan} />
}
