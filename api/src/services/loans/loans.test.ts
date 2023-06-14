import type { loan } from '@prisma/client'

import { loans, loan, createLoan, updateLoan, deleteLoan } from './loans'
import type { StandardScenario } from './loans.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('loans', () => {
  scenario('returns all loans', async (scenario: StandardScenario) => {
    const result = await loans()

    expect(result.length).toEqual(Object.keys(scenario.loan).length)
  })

  scenario('returns a single loan', async (scenario: StandardScenario) => {
    const result = await loan({ id: scenario.loan.one.id })

    expect(result).toEqual(scenario.loan.one)
  })

  scenario('creates a loan', async () => {
    const result = await createLoan({
      input: {
        amount: 1373965.4668663137,
        emi: 2349300.484394099,
        months: 9352646,
        bankName: 'String',
        processedData: '2023-06-14T14:50:18.076Z',
        emiDate: 1554173,
      },
    })

    expect(result.amount).toEqual(1373965.4668663137)
    expect(result.emi).toEqual(2349300.484394099)
    expect(result.months).toEqual(9352646)
    expect(result.bankName).toEqual('String')
    expect(result.processedData).toEqual(new Date('2023-06-14T14:50:18.076Z'))
    expect(result.emiDate).toEqual(1554173)
  })

  scenario('updates a loan', async (scenario: StandardScenario) => {
    const original = (await loan({ id: scenario.loan.one.id })) as loan
    const result = await updateLoan({
      id: original.id,
      input: { amount: 9967527.219574157 },
    })

    expect(result.amount).toEqual(9967527.219574157)
  })

  scenario('deletes a loan', async (scenario: StandardScenario) => {
    const original = (await deleteLoan({ id: scenario.loan.one.id })) as loan
    const result = await loan({ id: original.id })

    expect(result).toEqual(null)
  })
})
