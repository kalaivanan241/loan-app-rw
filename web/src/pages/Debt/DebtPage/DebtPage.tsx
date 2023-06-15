import DebtCell from 'src/components/Debt/DebtCell'

type DebtPageProps = {
  id: number
}

const DebtPage = ({ id }: DebtPageProps) => {
  return <DebtCell id={id} />
}

export default DebtPage
