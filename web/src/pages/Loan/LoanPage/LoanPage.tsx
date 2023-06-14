import LoanCell from 'src/components/Loan/LoanCell'

type LoanPageProps = {
  id: number
}

const LoanPage = ({ id }: LoanPageProps) => {
  return <LoanCell id={id} />
}

export default LoanPage
