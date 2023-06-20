import type {
  DeleteAccountMutationVariables,
  FindAccountById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { Button } from 'src/components/ui/button'
import { formatEnum, timeTag } from 'src/lib/formatters'

const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccountMutation($id: Int!) {
    deleteAccount(id: $id) {
      id
    }
  }
`

interface Props {
  account: NonNullable<FindAccountById['account']>
}

const Account = ({ account }: Props) => {
  const [deleteAccount] = useMutation(DELETE_ACCOUNT_MUTATION, {
    onCompleted: () => {
      toast.success('Account deleted')
      navigate(routes.accounts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteAccountMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete account ' + id + '?')) {
      deleteAccount({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Account {account.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{account.id}</td>
            </tr>
            <tr>
              <th>Currency</th>
              <td>{formatEnum(account.currency)}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{formatEnum(account.type)}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{account.name}</td>
            </tr>
            <tr>
              <th>Account number</th>
              <td>{account.accountNumber}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(account.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(account.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editAccount({ id: account.id })} className="mr-3">
          <Button>Edit</Button>
        </Link>
        <Button
          type="button"
          variant="destructive"
          onClick={() => onDeleteClick(account.id)}
        >
          Delete
        </Button>
      </nav>
    </>
  )
}

export default Account
