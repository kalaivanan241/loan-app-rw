import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Debt/DebtsCell'
import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

import type { DeleteDebtMutationVariables, FindDebts } from 'types/graphql'

const DELETE_DEBT_MUTATION = gql`
  mutation DeleteDebtMutation($id: Int!) {
    deleteDebt(id: $id) {
      id
    }
  }
`

const DebtsList = ({ debts }: FindDebts) => {
  const [deleteDebt] = useMutation(DELETE_DEBT_MUTATION, {
    onCompleted: () => {
      toast.success('Debt deleted')
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

  const onDeleteClick = (id: DeleteDebtMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete debt ' + id + '?')) {
      deleteDebt({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Amount</th>
            <th>To</th>
            <th>Currency</th>
            <th>Date</th>
            <th>Interest rate</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt) => (
            <tr key={debt.id}>
              <td>{truncate(debt.id)}</td>
              <td>{truncate(debt.amount)}</td>
              <td>{truncate(debt.to)}</td>
              <td>{formatEnum(debt.currency)}</td>
              <td>{timeTag(debt.date)}</td>
              <td>{truncate(debt.interestRate)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.debt({ id: debt.id })}
                    title={'Show debt ' + debt.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDebt({ id: debt.id })}
                    title={'Edit debt ' + debt.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete debt ' + debt.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(debt.id)}
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

export default DebtsList
