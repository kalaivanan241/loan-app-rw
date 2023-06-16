import { useAuth } from 'src/auth'
import NewDebt from 'src/components/Debt/NewDebt'

const NewDebtPage = () => {
  const { currentUser } = useAuth()
  return <NewDebt userId={currentUser.id as string} />
}

export default NewDebtPage
