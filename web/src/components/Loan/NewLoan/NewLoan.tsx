import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LoanForm from 'src/components/Loan/LoanForm'

import type { CreateLoanInput } from 'types/graphql'

const CREATE_LOAN_MUTATION = gql`
  mutation CreateLoanMutation($input: CreateLoanInput!) {
    createLoan(input: $input) {
      id
    }
  }
`

const NewLoan = () => {
  const [createLoan, { loading, error }] = useMutation(CREATE_LOAN_MUTATION, {
    onCompleted: () => {
      toast.success('Loan created')
      navigate(routes.loans())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateLoanInput) => {
    createLoan({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Loan</h2>
      </header>
      <div className="rw-segment-main">
        <LoanForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewLoan
