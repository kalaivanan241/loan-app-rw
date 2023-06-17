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
      </CardHeader>
      <CardContent className="grid grid-cols-2">
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
        <Link to={routes.debts()}>
          <Button className="w-full">View All</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
