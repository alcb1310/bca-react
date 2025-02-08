import { DatePicker } from '@mui/x-date-pickers'
import { TextFieldProps } from '@mui/material'
import { Controller } from 'react-hook-form'
import dayjs from 'dayjs'

import { BcaField } from '~types/fields'

type BcaDateTextFieldProps = BcaField<TextFieldProps>

export default function BcaDateTextField({
    control,
    datatestid: dataTestId,
    label,
    name,
}: BcaDateTextFieldProps) {
    return (
        <div data-testid={dataTestId}>
            <Controller
                control={control}
                data-testid='date.contol'
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <DatePicker
                        label={label}
                        data-testid={dataTestId}
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
        </div>
    )
}
