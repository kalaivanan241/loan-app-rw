import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const accounts: QueryResolvers['accounts'] = () => {
  return db.account.findMany({
    where: { userId: context.currentUser.id },
  })
}

export const account: QueryResolvers['account'] = ({ id }) => {
  return db.account.findFirst({
    where: { id, userId: context.currentUser.id },
  })
}

export const createAccount: MutationResolvers['createAccount'] = ({
  input,
}) => {
  return db.account.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

export const updateAccount: MutationResolvers['updateAccount'] = ({
  id,
  input,
}) => {
  return db.account.update({
    data: { ...input, userId: context.currentUser.id },
    where: { id },
  })
}

export const deleteAccount: MutationResolvers['deleteAccount'] = ({ id }) => {
  return db.account.delete({
    where: { id },
  })
}
