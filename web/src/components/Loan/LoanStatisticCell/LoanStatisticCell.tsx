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
        <CardDescription>Statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <LabelAndText
          label="Number of loans"
          text={loanStatistic.numberOfLoans}
        />
        <LabelAndText
          label="Total Loan Amount"
          text={`${loanStatistic.totalLoanAmount}(${loanStatistic.currency})`}
        />
        <LabelAndText
          label="Total Monthly Emi"
          text={`${loanStatistic.totalMonthlyEmi}(${loanStatistic.currency})`}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Link to={routes.loans()}>View All</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
