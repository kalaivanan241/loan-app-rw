import { MetaTags } from '@redwoodjs/web'

import DebtStatisticCell from 'src/components/Debt/DebtStatisticCell'
import LoanStatisticCell from 'src/components/Loan/LoanStatisticCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <LoanStatisticCell />
        </div>
        <div>
          <DebtStatisticCell />
        </div>
      </div>
    </>
  )
}

export default HomePage
