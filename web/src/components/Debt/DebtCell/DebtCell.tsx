import type { FindDebtById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Debt from 'src/components/Debt/Debt'

export const QUERY = gql`
  query FindDebtById($id: Int!) {
    debt: debt(id: $id) {
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

export const Empty = () => <div>Debt not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ debt }: CellSuccessProps<FindDebtById>) => {
  return <Debt debt={debt} />
}
