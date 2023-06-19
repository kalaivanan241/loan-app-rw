import { navigate, routes } from '@redwoodjs/router'
import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

import type { FindLoans } from 'types/graphql'

const DELETE_LOAN_MUTATION = gql`
  mutation DeleteLoanMutation($id: Int!) {
    deleteLoan(id: $id) {
      id
    }
  }
`

const LoansList = ({ loans }: FindLoans) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Emi</th>
            <th>Months</th>
            <th>Bank name</th>
            <th>Processed data</th>
            <th>Emi date</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id} onClick={() => navigate(routes.loan({ id: loan.id }))} className='cursor-pointer'>
              <td>{truncate(loan.id)}</td>
              <td>{truncate(loan.amount)}</td>
              <td>{formatEnum(loan.currency)}</td>
              <td>{truncate(loan.emi)}</td>
              <td>{truncate(loan.months)}</td>
              <td>{truncate(loan.bankName)}</td>
              <td>{timeTag(loan.processedData)}</td>
              <td>{truncate(loan.emiDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LoansList
