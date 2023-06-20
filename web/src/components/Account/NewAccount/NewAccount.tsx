import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AccountForm from 'src/components/Account/AccountForm'

import type { CreateAccountInput } from 'types/graphql'

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($input: CreateAccountInput!) {
    createAccount(input: $input) {
      id
    }
  }
`

const NewAccount = () => {
  const [createAccount, { loading, error }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Account created')
        navigate(routes.accounts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateAccountInput) => {
    createAccount({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Account</h2>
      </header>
      <div className="rw-segment-main">
        <AccountForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAccount
