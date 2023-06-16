import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const debts: QueryResolvers['debts'] = () => {
  return db.debt.findMany({
    where: {
      userId: context.currentUser.id,
    },
  })
}

export const debt: QueryResolvers['debt'] = ({ id }) => {
  return db.debt.findUnique({
    where: { id },
  })
}

export const debtStatistic: QueryResolvers['debtStatistic'] = async () => {
  const debts = await db.debt.findMany({
    where: {
      userId: context.currentUser.id,
    },
  })

  const totalAmount = debts.reduce((a, d) => {
    return a + d.amount
  }, 0)
  return {
    baseCurrency: 'INR',
    totalAmount,
    numberOfDebts: debts.length,
  }
}

export const createDebt: MutationResolvers['createDebt'] = ({ input }) => {
  return db.debt.create({
    data: input,
  })
}

export const updateDebt: MutationResolvers['updateDebt'] = ({ id, input }) => {
  return db.debt.update({
    data: input,
    where: { id },
  })
}

export const deleteDebt: MutationResolvers['deleteDebt'] = ({ id }) => {
  return db.debt.delete({
    where: { id },
  })
}
