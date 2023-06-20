import type { FindDebts } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'

import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

const DebtsList = ({ debts }: FindDebts) => {
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
          </tr>
        </thead>
        <tbody>
          {debts.map((debt) => (
            <tr
              key={debt.id}
              onClick={() => navigate(routes.debt({ id: debt.id }))}
              className="hover:cursor-pointer"
            >
              <td>{truncate(debt.id)}</td>
              <td>{truncate(debt.amount)}</td>
              <td>{truncate(debt.to)}</td>
              <td>{formatEnum(debt.currency)}</td>
              <td>{timeTag(debt.date)}</td>
              <td>{truncate(debt.interestRate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DebtsList
