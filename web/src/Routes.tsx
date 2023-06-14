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

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Loans" titleTo="loans" buttonLabel="New Loan" buttonTo="newLoan">
        <Route path="/loans/new" page={LoanNewLoanPage} name="newLoan" />
        <Route path="/loans/{id:Int}/edit" page={LoanEditLoanPage} name="editLoan" />
        <Route path="/loans/{id:Int}" page={LoanLoanPage} name="loan" />
        <Route path="/loans" page={LoanLoansPage} name="loans" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
