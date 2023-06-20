import type { QueryResolvers, MutationResolvers, Loan } from 'types/graphql'

import { UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { getDifferenceInMonths } from 'src/lib/utils'

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
  let totalOutstandingAmount = 0
  loans.forEach((l) => {
    totalLoanAmount += l.amount
    totalMonthlyEmi += l.emi
    totalOutstandingAmount += l.outstandingInstallmentAmount
  })
  return {
    numberOfLoans,
    totalLoanAmount,
    totalMonthlyEmi,
    currency: 'HKD',
    totalOutstandingAmount,
  }
}

export const createLoan: MutationResolvers['createLoan'] = ({ input }) => {
  return db.loan.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

export const updateLoan: MutationResolvers['updateLoan'] = async ({
  id,
  input,
}) => {
  const loan = await db.loan.findFirst({
    where: { id, userId: context.currentUser.id },
  })
  if (!loan) {
    throw new UserInputError('Not found')
  }
  return db.loan.update({
    data: input,
    where: { id },
  })
}

export const deleteLoan: MutationResolvers['deleteLoan'] = async ({ id }) => {
  const loans = await db.loan.deleteMany({
    where: { id, userId: context.currentUser.id },
  })
  return loans?.[0]
}

export const updateOutstandingAmount: MutationResolvers['updateOutstandingAmount'] =
  async ({ id }) => {
    let loans: Loan[] = []
    const updatedLoans: Loan[] = []
    if (id) {
      const loan = await db.loan.findFirst({
        where: { id, userId: context.currentUser.id },
      })
      loans.push(loan)
    } else {
      loans = await db.loan.findMany({
        where: {
          userId: context.currentUser.id,
        },
      })
    }
    for (const loan of loans) {
      if (loan) {
        try {
          const months = getDifferenceInMonths(loan.processedData.toString())
          const outstandingInstallments = loan.months - months
          const outstandingInstallmentAmount = loan.amount - loan.emi * months
          const updatedLoan = await db.loan.update({
            data: {
              outstandingInstallments,
              outstandingInstallmentAmount,
            },
            where: { id: loan.id },
          })
          updatedLoans.push(updatedLoan)
        } catch (e) {
          console.log(e)
        }
      }
    }

    return updatedLoans
  }
