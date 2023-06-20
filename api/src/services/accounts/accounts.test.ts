import type { account } from '@prisma/client'

import {
  accounts,
  account,
  createAccount,
  updateAccount,
  deleteAccount,
} from './accounts'
import type { StandardScenario } from './accounts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('accounts', () => {
  scenario('returns all accounts', async (scenario: StandardScenario) => {
    const result = await accounts()

    expect(result.length).toEqual(Object.keys(scenario.account).length)
  })

  scenario('returns a single account', async (scenario: StandardScenario) => {
    const result = await account({ id: scenario.account.one.id })

    expect(result).toEqual(scenario.account.one)
  })

  scenario('creates a account', async () => {
    const result = await createAccount({
      input: {
        type: 'BANK',
        name: 'String',
        accountNumber: 'String',
        userId: 'String',
      },
    })

    expect(result.type).toEqual('BANK')
    expect(result.name).toEqual('String')
    expect(result.accountNumber).toEqual('String')
    expect(result.userId).toEqual('String')
  })

  scenario('updates a account', async (scenario: StandardScenario) => {
    const original = (await account({ id: scenario.account.one.id })) as account
    const result = await updateAccount({
      id: original.id,
      input: { type: 'INSURANCE' },
    })

    expect(result.type).toEqual('INSURANCE')
  })

  scenario('deletes a account', async (scenario: StandardScenario) => {
    const original = (await deleteAccount({
      id: scenario.account.one.id,
    })) as account
    const result = await account({ id: original.id })

    expect(result).toEqual(null)
  })
})
