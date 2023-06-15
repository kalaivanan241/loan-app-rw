import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DebtForm from 'src/components/Debt/DebtForm'

import type { CreateDebtInput } from 'types/graphql'

const CREATE_DEBT_MUTATION = gql`
  mutation CreateDebtMutation($input: CreateDebtInput!) {
    createDebt(input: $input) {
      id
    }
  }
`

const NewDebt = () => {
  const [createDebt, { loading, error }] = useMutation(CREATE_DEBT_MUTATION, {
    onCompleted: () => {
      toast.success('Debt created')
      navigate(routes.debts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateDebtInput) => {
    createDebt({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Debt</h2>
      </header>
      <div className="rw-segment-main">
        <DebtForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDebt
