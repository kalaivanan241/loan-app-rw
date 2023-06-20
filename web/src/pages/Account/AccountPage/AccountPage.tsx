import AccountCell from 'src/components/Account/AccountCell'

type AccountPageProps = {
  id: number
}

const AccountPage = ({ id }: AccountPageProps) => {
  return <AccountCell id={id} />
}

export default AccountPage
