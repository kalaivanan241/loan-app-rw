import type { Prisma, debt } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.debtCreateArgs>({
  debt: {
    one: {
      data: {
        amount: 6487407.31036689,
        to: 'String',
        date: '2023-06-15T15:28:24.942Z',
        interestRate: 7671971.475247461,
      },
    },
    two: {
      data: {
        amount: 5327871.062520466,
        to: 'String',
        date: '2023-06-15T15:28:24.942Z',
        interestRate: 8555187.419685783,
      },
    },
  },
})

export type StandardScenario = ScenarioData<debt, 'debt'>
