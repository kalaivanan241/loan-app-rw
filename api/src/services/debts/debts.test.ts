import type { debt } from '@prisma/client'

import { debts, debt, createDebt, updateDebt, deleteDebt } from './debts'
import type { StandardScenario } from './debts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('debts', () => {
  scenario('returns all debts', async (scenario: StandardScenario) => {
    const result = await debts()

    expect(result.length).toEqual(Object.keys(scenario.debt).length)
  })

  scenario('returns a single debt', async (scenario: StandardScenario) => {
    const result = await debt({ id: scenario.debt.one.id })

    expect(result).toEqual(scenario.debt.one)
  })

  scenario('creates a debt', async () => {
    const result = await createDebt({
      input: {
        amount: 6729265.573597896,
        to: 'String',
        date: '2023-06-15T15:28:24.922Z',
        interestRate: 4125370.636265813,
      },
    })

    expect(result.amount).toEqual(6729265.573597896)
    expect(result.to).toEqual('String')
    expect(result.date).toEqual(new Date('2023-06-15T15:28:24.922Z'))
    expect(result.interestRate).toEqual(4125370.636265813)
  })

  scenario('updates a debt', async (scenario: StandardScenario) => {
    const original = (await debt({ id: scenario.debt.one.id })) as debt
    const result = await updateDebt({
      id: original.id,
      input: { amount: 6391622.863708472 },
    })

    expect(result.amount).toEqual(6391622.863708472)
  })

  scenario('deletes a debt', async (scenario: StandardScenario) => {
    const original = (await deleteDebt({ id: scenario.debt.one.id })) as debt
    const result = await debt({ id: original.id })

    expect(result).toEqual(null)
  })
})
