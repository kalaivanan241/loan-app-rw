import type { DeleteLoanMutationVariables, FindLoanById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

const DELETE_LOAN_MUTATION = gql`
  mutation DeleteLoanMutation($id: Int!) {
    deleteLoan(id: $id) {
      id
    }
  }
`

interface Props {
  loan: NonNullable<FindLoanById['loan']>
}

const Loan = ({ loan }: Props) => {
  const [deleteLoan] = useMutation(DELETE_LOAN_MUTATION, {
    onCompleted: () => {
      toast.success('Loan deleted')
      navigate(routes.loans())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteLoanMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete loan ' + id + '?')) {
      deleteLoan({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Loan {loan.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{loan.id}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{loan.amount}</td>
            </tr>
            <tr>
              <th>Emi</th>
              <td>{loan.emi}</td>
            </tr>
            <tr>
              <th>Months</th>
              <td>{loan.months}</td>
            </tr>
            <tr>
              <th>Currency</th>
              <td>{formatEnum(loan.currency)}</td>
            </tr>
            <tr>
              <th>Bank name</th>
              <td>{loan.bankName}</td>
            </tr>
            <tr>
              <th>Processed data</th>
              <td>{timeTag(loan.processedData)}</td>
            </tr>
            <tr>
              <th>Emi date</th>
              <td>{loan.emiDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editLoan({ id: loan.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(loan.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Loan
