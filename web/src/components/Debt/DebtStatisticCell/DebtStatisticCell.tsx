import React from 'react'

import { FindDebtsStatistic } from 'types/graphql'

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
  query FindDebtsStatistic {
    debtStatistic {
      totalAmount
      numberOfDebts
      baseCurrency
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  debtStatistic,
}: CellSuccessProps<FindDebtsStatistic>) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Debts</CardTitle>
        <CardDescription>Statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-3 pb-3 ">
          <div className="mb-0 pb-0">
            <p className="text-sm font-medium leading-none">Number of Debts</p>
            <p className="text-sm text-muted-foreground">
              {debtStatistic.numberOfDebts}
            </p>
          </div>
        </div>
        <div className="mb-3 pb-3">
          <div className="mb-0  pb-0">
            <p className="text-sm font-medium leading-none">Total Amount</p>
            <p className="text-sm text-muted-foreground">
              {debtStatistic.totalAmount}({debtStatistic.baseCurrency})
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Link to={routes.debts()}>View All</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
