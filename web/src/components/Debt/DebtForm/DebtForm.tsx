import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

import type { EditDebtById, UpdateDebtInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormDebt = NonNullable<EditDebtById['debt']>

interface DebtFormProps {
  debt?: EditDebtById['debt']
  onSave: (data: UpdateDebtInput, id?: FormDebt['id']) => void
  error: RWGqlError
  loading: boolean
}

const DebtForm = (props: DebtFormProps) => {
  const onSubmit = (data: FormDebt) => {
    props.onSave(data, props?.debt?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormDebt> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Amount
        </Label>

        <TextField
          name="amount"
          defaultValue={props.debt?.amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="amount" className="rw-field-error" />

        <Label
          name="to"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          To
        </Label>

        <TextField
          name="to"
          defaultValue={props.debt?.to}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="to" className="rw-field-error" />

        <Label
          name="currency"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Currency
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="debt-currency-0"
            name="currency"
            defaultValue="HKD"
            defaultChecked={props.debt?.currency?.includes('HKD')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Hkd</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="debt-currency-1"
            name="currency"
            defaultValue="INR"
            defaultChecked={props.debt?.currency?.includes('INR')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Inr</div>
        </div>

        <FieldError name="currency" className="rw-field-error" />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DatetimeLocalField
          name="date"
          defaultValue={formatDatetime(props.debt?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="interestRate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Interest rate
        </Label>

        <TextField
          name="interestRate"
          defaultValue={props.debt?.interestRate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="interestRate" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default DebtForm
