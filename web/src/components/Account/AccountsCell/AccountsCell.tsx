import type { FindAccounts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Accounts from 'src/components/Account/Accounts'

export const QUERY = gql`
  query FindAccounts {
    accounts {
      id
      currency
      type
      name
      accountNumber
      userId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No accounts yet. '}
      <Link to={routes.newAccount()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ accounts }: CellSuccessProps<FindAccounts>) => {
  return <Accounts accounts={accounts} />
}
