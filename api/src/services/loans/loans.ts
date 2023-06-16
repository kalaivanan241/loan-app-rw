import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const loans: QueryResolvers['loans'] = () => {
  return db.loan.findMany({
    where: {
      userId: context.currentUser.id,
    },
  })
}

export const loan: QueryResolvers['loan'] = ({ id }) => {
  return db.loan.findFirst({
    where: { id, userId: context.currentUser.id },
  })
}

export const loanStatistic: QueryResolvers['loanStatistic'] = async () => {
  const loans = await db.loan.findMany({
    where: {
      userId: context.currentUser.id,
    },
  })
  const numberOfLoans = loans.length
  let totalLoanAmount = 0
  let totalMonthlyEmi = 0
  loans.forEach((l) => {
    totalLoanAmount += l.amount
    totalMonthlyEmi += l.emi
  })
  return {
    numberOfLoans,
    totalLoanAmount,
    totalMonthlyEmi,
    currency: 'HKD',
  }
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
