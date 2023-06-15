import type { FindDebts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Debts from 'src/components/Debt/Debts'

export const QUERY = gql`
  query FindDebts {
    debts {
      id
      amount
      to
      currency
      date
      interestRate
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No debts yet. '}
      <Link to={routes.newDebt()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ debts }: CellSuccessProps<FindDebts>) => {
  return <Debts debts={debts} />
}
