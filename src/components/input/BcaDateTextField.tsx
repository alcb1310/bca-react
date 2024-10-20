import { DatePicker } from '@mui/x-date-pickers'
import { BcaField } from '../../types/fields'
import { TextFieldProps } from '@mui/material'
import { Controller } from 'react-hook-form'
import dayjs from 'dayjs'

type BcaDateTextFieldProps = BcaField<TextFieldProps>

export default function BcaDateTextField({
  control,
  name,
}: BcaDateTextFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          label='Select date'
          value={dayjs(field.value)}
          onChange={(date) => field.onChange(date)}
          slotProps={{
            textField: {
              size: 'small',
              error: !!error,
              helperText: error?.message,
            },
          }}
        />
      )}
    />
  )
}
