import { Link, routes } from '@redwoodjs/router'

type GeneralLayoutProps = {
  children?: React.ReactNode
};

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <>
      <header>
        <h1>Redwood Blog</h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.loans()}>Loans</Link>
            </li>
            <li>
              <Link to={routes.debts()}>Debts</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
       {children}
      </main>
    </>
  )
}

export default GeneralLayout
