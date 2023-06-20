import type { EditAccountById, UpdateAccountInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  RadioField,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import { useAuth } from 'src/auth'

type FormAccount = NonNullable<EditAccountById['account']>

interface AccountFormProps {
  account?: EditAccountById['account']
  onSave: (data: UpdateAccountInput, id?: FormAccount['id']) => void
  error: RWGqlError
  loading: boolean
}

const AccountForm = (props: AccountFormProps) => {
  const { currentUser } = useAuth()
  const onSubmit = (data: FormAccount) => {
    props.onSave(
      { ...data, userId: currentUser?.id as string },
      props?.account?.id
    )
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormAccount> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="currency"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Currency
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="account-currency-0"
            name="currency"
            defaultValue="HKD"
            defaultChecked={props.account?.currency?.includes('HKD')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Hkd</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="account-currency-1"
            name="currency"
            defaultValue="INR"
            defaultChecked={props.account?.currency?.includes('INR')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Inr</div>
        </div>

        <FieldError name="currency" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="account-type-0"
            name="type"
            defaultValue="BANK"
            defaultChecked={props.account?.type?.includes('BANK')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Bank</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="account-type-1"
            name="type"
            defaultValue="BROKERAGE"
            defaultChecked={props.account?.type?.includes('BROKERAGE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Brokerage</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="account-type-2"
            name="type"
            defaultValue="INSURANCE"
            defaultChecked={props.account?.type?.includes('INSURANCE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Insurance</div>
        </div>

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.account?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="accountNumber"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Account number
        </Label>

        <TextField
          name="accountNumber"
          defaultValue={props.account?.accountNumber}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="accountNumber" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AccountForm
