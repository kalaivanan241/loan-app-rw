import type { FindLoans } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Loans from 'src/components/Loan/Loans'

export const QUERY = gql`
  query FindLoans {
    loans {
      id
      amount
      emi
      months
      bankName
      processedData
      emiDate
      currency
      interestRate
      outstandingInstallmentAmount
      outstandingInstallments
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No loans yet. '}
      <Link to={routes.newLoan()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ loans }: CellSuccessProps<FindLoans>) => {
  return <Loans loans={loans} />
}
