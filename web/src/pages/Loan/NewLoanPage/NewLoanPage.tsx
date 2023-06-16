import { useAuth } from 'src/auth'
import NewLoan from 'src/components/Loan/NewLoan'

const NewLoanPage = () => {
  const { currentUser } = useAuth()
  console.log({ currentUser })
  return <NewLoan userId={currentUser?.id as string} />
}

export default NewLoanPage
