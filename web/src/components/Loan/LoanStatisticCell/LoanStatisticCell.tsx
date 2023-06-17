import React from 'react'

import { FindLoanStatistic } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

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

export const QUERY = gql`
  query FindLoanStatistic {
    loanStatistic {
      numberOfLoans
      totalLoanAmount
      currency
      totalMonthlyEmi
      totalOutstandingAmount
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  loanStatistic,
}: CellSuccessProps<FindLoanStatistic>) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loans</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        <LabelAndText
          label="Number of loans"
          text={loanStatistic.numberOfLoans}
        />
        <LabelAndText
          label="Total Loan Amount"
          text={`${loanStatistic.totalLoanAmount}(${loanStatistic.currency})`}
        />
        <LabelAndText
          label="Outstanding Amount"
          text={`${loanStatistic.totalOutstandingAmount}(${loanStatistic.currency})`}
        />
        <LabelAndText
          label="Total Monthly Emi"
          text={`${loanStatistic.totalMonthlyEmi}(${loanStatistic.currency})`}
        />
      </CardContent>
      <CardFooter>
        <Link to={routes.loans()}>
          <Button className="w-full">View All</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
