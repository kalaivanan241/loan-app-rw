// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import GeneralLayout from './layouts/GeneralLayout/GeneralLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={GeneralLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Set wrap={ScaffoldLayout} title="Loans" titleTo="loans" buttonLabel="New Loan" buttonTo="newLoan">
          <Route path="/loans/new" page={LoanNewLoanPage} name="newLoan" />
          <Route path="/loans/{id:Int}/edit" page={LoanEditLoanPage} name="editLoan" />
          <Route path="/loans/{id:Int}" page={LoanLoanPage} name="loan" />
          <Route path="/loans" page={LoanLoansPage} name="loans" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Debts" titleTo="debts" buttonLabel="New Debt" buttonTo="newDebt">
          <Route path="/debts/new" page={DebtNewDebtPage} name="newDebt" />
          <Route path="/debts/{id:Int}/edit" page={DebtEditDebtPage} name="editDebt" />
          <Route path="/debts/{id:Int}" page={DebtDebtPage} name="debt" />
          <Route path="/debts" page={DebtDebtsPage} name="debts" />
        </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
