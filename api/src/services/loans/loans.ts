import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const loans: QueryResolvers['loans'] = () => {
  return db.loan.findMany()
}

export const loan: QueryResolvers['loan'] = ({ id }) => {
  return db.loan.findUnique({
    where: { id },
  })
}

export const createLoan: MutationResolvers['createLoan'] = ({ input }) => {
  return db.loan.create({
    data: input,
  })
}

export const updateLoan: MutationResolvers['updateLoan'] = ({ id, input }) => {
  return db.loan.update({
    data: input,
    where: { id },
  })
}

export const deleteLoan: MutationResolvers['deleteLoan'] = ({ id }) => {
  return db.loan.delete({
    where: { id },
  })
}
