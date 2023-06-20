import type { FindAccounts } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'

import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

const AccountsList = ({ accounts }: FindAccounts) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Currency</th>
            <th>Type</th>
            <th>Name</th>
            <th>Account number</th>
            <th>Created at</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr
              key={account.id}
              onClick={() => navigate(routes.account({ id: account.id }))}
              className="cursor-pointer"
            >
              <td>{truncate(account.id)}</td>
              <td>{formatEnum(account.currency)}</td>
              <td>{formatEnum(account.type)}</td>
              <td>{truncate(account.name)}</td>
              <td>{truncate(account.accountNumber)}</td>
              <td>{timeTag(account.createdAt)}</td>
              <td>{timeTag(account.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AccountsList
