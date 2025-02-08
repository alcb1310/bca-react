import { FormHelperText, NativeSelect, SelectProps } from '@mui/material'
import { Controller } from 'react-hook-form'

import { BcaField } from '~types/fields'

type BcaSelectProps = BcaField<SelectProps>

export default function BcaSelect({
    name,
    control,
    disabled,
    datatestid: dataTestId,
    children,
}: BcaSelectProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...fieldRest }, fieldState: { error } }) => (
                <>
                    <NativeSelect
                        data-testid={dataTestId}
                        variant='filled'
                        disabled={disabled}
                        sx={{ '& .MuiInputBase-input': { px: 2 } }}
                        {...fieldRest}
                        error={!!error}
                    >
                        {children}
                    </NativeSelect>
                    <FormHelperText
                        className={name}
                        error={!!error}
                        component='span'
                        variant='standard'
                    >
                        {error?.message}
                    </FormHelperText>
                </>
            )}
        />
    )
}
