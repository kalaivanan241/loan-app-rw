import EditLoanCell from 'src/components/Loan/EditLoanCell'

type LoanPageProps = {
  id: number
}

const EditLoanPage = ({ id }: LoanPageProps) => {
  return <EditLoanCell id={id} />
}

export default EditLoanPage
