import type { EditLoanById, UpdateLoanInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LoanForm from 'src/components/Loan/LoanForm'

export const QUERY = gql`
  query EditLoanById($id: Int!) {
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
const UPDATE_LOAN_MUTATION = gql`
  mutation UpdateLoanMutation($id: Int!, $input: UpdateLoanInput!) {
    updateLoan(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ loan }: CellSuccessProps<EditLoanById>) => {
  const [updateLoan, { loading, error }] = useMutation(UPDATE_LOAN_MUTATION, {
    onCompleted: () => {
      toast.success('Loan updated')
      navigate(routes.loans())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateLoanInput, id: EditLoanById['loan']['id']) => {
    updateLoan({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Loan {loan?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <LoanForm loan={loan} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
