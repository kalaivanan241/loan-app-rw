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
import LabelAndText from 'src/components/ui/LabelAndText'
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
        <LabelAndText
          label="Number of Debts"
          text={debtStatistic.numberOfDebts}
        />
        <LabelAndText
          label="Total Amount"
          text={`${debtStatistic.totalAmount}(${debtStatistic.baseCurrency})`}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Link to={routes.debts()}>View All</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
