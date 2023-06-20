import type { FindLoanById, UpdateLoanMutationVariables } from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

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

const UPDATE_OUTSTANDING_LOAN_MUTATION = gql`
  mutation UpdateOutstandingLoanMutation($id: Int!) {
    updateOutstandingAmount(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Loan not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ loan }: CellSuccessProps<FindLoanById>) => {
  const [updateOutstanding] = useMutation(UPDATE_OUTSTANDING_LOAN_MUTATION, {
    onCompleted: () => {
      toast.success('Loan outstanding amount updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: loan.id } }],
    awaitRefetchQueries: true,
  })

  const onUpdateOutstanding = (id: UpdateLoanMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to update outstanding loan ' + id + '?')
    ) {
      updateOutstanding({ variables: { id } })
    }
  }
  return (
    <Loan loan={loan} onUpdateOutstanding={(id) => onUpdateOutstanding(id)} />
  )
}
