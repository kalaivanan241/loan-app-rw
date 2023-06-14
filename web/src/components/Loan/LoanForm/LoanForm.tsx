import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

import type { EditLoanById, UpdateLoanInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormLoan = NonNullable<EditLoanById['loan']>

interface LoanFormProps {
  loan?: EditLoanById['loan']
  onSave: (data: UpdateLoanInput, id?: FormLoan['id']) => void
  error: RWGqlError
  loading: boolean
}

const LoanForm = (props: LoanFormProps) => {
  const onSubmit = (data: FormLoan) => {
    props.onSave(data, props?.loan?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormLoan> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.loan?.amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="amount" className="rw-field-error" />

        <Label
          name="emi"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Emi
        </Label>

        <TextField
          name="emi"
          defaultValue={props.loan?.emi}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="emi" className="rw-field-error" />

        <Label
          name="months"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Months
        </Label>

        <NumberField
          name="months"
          defaultValue={props.loan?.months}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="months" className="rw-field-error" />

        <Label
          name="bankName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Bank name
        </Label>

        <TextField
          name="bankName"
          defaultValue={props.loan?.bankName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="bankName" className="rw-field-error" />

        <Label
          name="processedData"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Processed data
        </Label>

        <DatetimeLocalField
          name="processedData"
          defaultValue={formatDatetime(props.loan?.processedData)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="processedData" className="rw-field-error" />

        <Label
          name="emiDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Emi date
        </Label>

        <NumberField
          name="emiDate"
          defaultValue={props.loan?.emiDate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="emiDate" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default LoanForm