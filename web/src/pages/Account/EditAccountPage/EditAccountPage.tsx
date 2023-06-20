import EditAccountCell from 'src/components/Account/EditAccountCell'

type AccountPageProps = {
  id: number
}

const EditAccountPage = ({ id }: AccountPageProps) => {
  return <EditAccountCell id={id} />
}

export default EditAccountPage
