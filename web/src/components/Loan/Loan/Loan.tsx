import type { DeleteLoanMutationVariables, FindLoanById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { Button } from 'src/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card'
import LabelAndText from 'src/components/ui/LabelAndText'
// import { formatEnum, timeTag } from 'src/lib/formatters'

const DELETE_LOAN_MUTATION = gql`
  mutation DeleteLoanMutation($id: Int!) {
    deleteLoan(id: $id) {
      id
    }
  }
`

interface Props {
  loan: NonNullable<FindLoanById['loan']>
  onUpdateOutstanding: (id: DeleteLoanMutationVariables['id']) => void
}

const Loan = ({ loan, onUpdateOutstanding }: Props) => {
  const [deleteLoan] = useMutation(DELETE_LOAN_MUTATION, {
    onCompleted: () => {
      toast.success('Loan deleted')
      navigate(routes.loans())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteLoanMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete loan ' + id + '?')) {
      deleteLoan({ variables: { id } })
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Loan {loan.id} Detail</CardTitle>
          <CardDescription>{loan.bankName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <LabelAndText
              label="Amount"
              text={`${loan.amount}(${loan.currency})`}
            />
            <LabelAndText
              label="Outstanding Amount"
              text={loan.outstandingInstallmentAmount}
            />
            <LabelAndText label="Emi" text={loan.emi} />
            <LabelAndText
              label="Interest Rate"
              text={loan.interestRate + '%'}
            />
            <LabelAndText label="Installments" text={loan.months} />
            <LabelAndText
              label="Outstanding Installments"
              text={loan.outstandingInstallments}
            />
            <LabelAndText label="Processed Date" text={loan.processedData} />
            <LabelAndText label="Emi Date" text={loan.emiDate} />
          </div>
        </CardContent>
        <CardFooter>
          <Link to={routes.editLoan({ id: loan.id })} className="mr-3">
            <Button>Edit</Button>
          </Link>
          <Button
            variant="destructive"
            className="mr-3"
            onClick={() => onDeleteClick(loan.id)}
          >
            Delete
          </Button>
          <Button
            variant="outline"
            className="mr-3"
            onClick={() => onUpdateOutstanding(loan.id)}
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default Loan
