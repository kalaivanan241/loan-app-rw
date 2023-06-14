import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Loan/LoansCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteLoanMutationVariables, FindLoans } from 'types/graphql'

const DELETE_LOAN_MUTATION = gql`
  mutation DeleteLoanMutation($id: Int!) {
    deleteLoan(id: $id) {
      id
    }
  }
`

const LoansList = ({ loans }: FindLoans) => {
  const [deleteLoan] = useMutation(DELETE_LOAN_MUTATION, {
    onCompleted: () => {
      toast.success('Loan deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteLoanMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete loan ' + id + '?')) {
      deleteLoan({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Amount</th>
            <th>Emi</th>
            <th>Months</th>
            <th>Bank name</th>
            <th>Processed data</th>
            <th>Emi date</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{truncate(loan.id)}</td>
              <td>{truncate(loan.amount)}</td>
              <td>{truncate(loan.emi)}</td>
              <td>{truncate(loan.months)}</td>
              <td>{truncate(loan.bankName)}</td>
              <td>{timeTag(loan.processedData)}</td>
              <td>{truncate(loan.emiDate)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.loan({ id: loan.id })}
                    title={'Show loan ' + loan.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editLoan({ id: loan.id })}
                    title={'Edit loan ' + loan.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete loan ' + loan.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(loan.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LoansList
