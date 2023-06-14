import type { Prisma, loan } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.loanCreateArgs>({
  loan: {
    one: {
      data: {
        amount: 6013566.801981729,
        emi: 2444839.190802699,
        months: 4060046,
        bankName: 'String',
        processedData: '2023-06-14T14:50:18.095Z',
        emiDate: 413532,
      },
    },
    two: {
      data: {
        amount: 4148627.219078547,
        emi: 4760814.315357456,
        months: 448059,
        bankName: 'String',
        processedData: '2023-06-14T14:50:18.095Z',
        emiDate: 5794460,
      },
    },
  },
})

export type StandardScenario = ScenarioData<loan, 'loan'>
