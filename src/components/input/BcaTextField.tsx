import { FormHelperText, TextField, TextFieldProps } from '@mui/material'
import { BcaField } from '../../types/fields'
import { Controller } from 'react-hook-form'

type BcaTextFieldProps = BcaField<TextFieldProps>

export default function BcaTextField({
  name,
  defaultValue,
  control,
  disabled,
  ...rest
}: BcaTextFieldProps) {
  console.dir(disabled)
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: { ref: rhfRef, ...fieldRest },
          fieldState: { error },
        }) => (
          <TextField
            {...fieldRest}
            inputRef={rhfRef}
            label={name}
            error={!!error}
            disabled={disabled}
            size='small'
            helperText={
              <FormHelperText
                error={!!error}
                component='span'
                variant='standard'
              >
                {error?.message}
              </FormHelperText>
            }
            sx={{
              width: '100%',
            }}
            {...rest}
          />
        )}
      />
    </>
  )
}
