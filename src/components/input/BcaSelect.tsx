import { FormHelperText, NativeSelect, SelectProps } from '@mui/material'
import { BcaField } from '../../types/fields'
import { Controller } from 'react-hook-form'

type BcaSelectProps = BcaField<SelectProps>

export default function BcaSelect({
    name,
    control,
    disabled,
    children,
}: BcaSelectProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...fieldRest }, fieldState: { error } }) => (
                <>
                    <NativeSelect
                        variant='filled'
                        disabled={disabled}
                        sx={{ '& .MuiInputBase-input': { px: 2 } }}
                        {...fieldRest}
                        error={!!error}
                    >
                        {children}
                    </NativeSelect>
                    <FormHelperText error={!!error} component='span' variant='standard'>
                        {error?.message}
                    </FormHelperText>
                </>
            )}
        />
    )
}
