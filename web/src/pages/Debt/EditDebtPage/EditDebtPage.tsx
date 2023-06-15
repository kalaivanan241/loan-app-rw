import EditDebtCell from 'src/components/Debt/EditDebtCell'

type DebtPageProps = {
  id: number
}

const EditDebtPage = ({ id }: DebtPageProps) => {
  return <EditDebtCell id={id} />
}

export default EditDebtPage
