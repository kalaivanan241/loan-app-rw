import { MetaTags } from '@redwoodjs/web'

import DebtsCell from 'src/components/Debt/DebtsCell'
import LoansCell from 'src/components/Loan/LoansCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div>
        <h1>Loans</h1>
        <LoansCell />
      </div>
      <div>
        <h1>Debts</h1>
        <DebtsCell />
      </div>
    </>
  )
}

export default HomePage
