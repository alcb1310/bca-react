import { FormHelperText, TextField, TextFieldProps } from '@mui/material'
import { BcaField } from '../../types/fields'
import { Controller } from 'react-hook-form'

type BcaTextFieldProps = BcaField<TextFieldProps>

export default function BcaTextField({
    name,
    defaultValue,
    control,
    datatestid: dataTestId,
    disabled,
    ...rest
}: BcaTextFieldProps) {
    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { ref, ...fieldRest }, fieldState: { error } }) => (
                    <TextField
                        {...fieldRest}
                        inputRef={ref}
                        data-testid={dataTestId}
                        label={name}
                        error={!!error}
                        disabled={disabled}
                        size='small'
                        helperText={
                            <FormHelperText
                                error={!!error}
                                data-testid={`${dataTestId}.error`}
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
