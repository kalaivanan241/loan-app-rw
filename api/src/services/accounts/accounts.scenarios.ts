import type { Prisma, account } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.accountCreateArgs>({
  account: {
    one: {
      data: {
        type: 'BANK',
        name: 'String',
        accountNumber: 'String',
        userId: 'String',
      },
    },
    two: {
      data: {
        type: 'BANK',
        name: 'String',
        accountNumber: 'String',
        userId: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<account, 'account'>
