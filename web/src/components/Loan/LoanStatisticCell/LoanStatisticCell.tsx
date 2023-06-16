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
import { cn } from 'src/lib/utils'

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
        <div className="mb-3 pb-3 ">
          <div className="mb-0 pb-0">
            <p className="text-sm font-medium leading-none">Number of loans</p>
            <p className="text-sm text-muted-foreground">
              {loanStatistic.numberOfLoans}
            </p>
          </div>
        </div>
        <div className="mb-3 pb-3 ">
          <div className="mb-0 pb-0">
            <p className="text-sm font-medium leading-none">
              Total Loan Amount
            </p>
            <p className="text-sm text-muted-foreground">
              {loanStatistic.totalLoanAmount}({loanStatistic.currency})
            </p>
          </div>
        </div>
        <div className="mb-3 pb-3 ">
          <div className="mb-0 pb-0">
            <p className="text-sm font-medium leading-none">
              Total Monthly Emi
            </p>
            <p className="text-sm text-muted-foreground">
              {loanStatistic.totalMonthlyEmi}({loanStatistic.currency})
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Link to={routes.loans()}>View All</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
