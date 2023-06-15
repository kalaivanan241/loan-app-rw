import type { EditDebtById, UpdateDebtInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DebtForm from 'src/components/Debt/DebtForm'

export const QUERY = gql`
  query EditDebtById($id: Int!) {
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
const UPDATE_DEBT_MUTATION = gql`
  mutation UpdateDebtMutation($id: Int!, $input: UpdateDebtInput!) {
    updateDebt(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ debt }: CellSuccessProps<EditDebtById>) => {
  const [updateDebt, { loading, error }] = useMutation(UPDATE_DEBT_MUTATION, {
    onCompleted: () => {
      toast.success('Debt updated')
      navigate(routes.debts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateDebtInput, id: EditDebtById['debt']['id']) => {
    updateDebt({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Debt {debt?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DebtForm debt={debt} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
