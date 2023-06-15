import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

import type { DeleteDebtMutationVariables, FindDebtById } from 'types/graphql'

const DELETE_DEBT_MUTATION = gql`
  mutation DeleteDebtMutation($id: Int!) {
    deleteDebt(id: $id) {
      id
    }
  }
`

interface Props {
  debt: NonNullable<FindDebtById['debt']>
}

const Debt = ({ debt }: Props) => {
  const [deleteDebt] = useMutation(DELETE_DEBT_MUTATION, {
    onCompleted: () => {
      toast.success('Debt deleted')
      navigate(routes.debts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteDebtMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete debt ' + id + '?')) {
      deleteDebt({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Debt {debt.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{debt.id}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{debt.amount}</td>
            </tr>
            <tr>
              <th>To</th>
              <td>{debt.to}</td>
            </tr>
            <tr>
              <th>Currency</th>
              <td>{formatEnum(debt.currency)}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(debt.date)}</td>
            </tr>
            <tr>
              <th>Interest rate</th>
              <td>{debt.interestRate}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDebt({ id: debt.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(debt.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Debt
